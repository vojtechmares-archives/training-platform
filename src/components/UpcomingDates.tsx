import Link from "next/link";

import clsx from "clsx";

import { type Training } from "@prisma/client";
import { formatDate } from "@/utils/dateFormatter";
import { trpc } from "@/utils/trpc";

type UpcomingDatesProps = {
  training: Training;
};

export const UpcomingDates = ({ training }: UpcomingDatesProps) => {
  const dates = trpc.trainingDate.getDatesForTraining.useQuery({
    trainingId: training.id,
  });

  if (dates.data === undefined) {
    return <>No dates found</>;
  }

  const d = dates.data;

  return (
    <>
      <section aria-labelledby="upcoming-dates" className="mt-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Upcoming dates
            </h1>
          </div>
        </div>
        <div className="mt-8 inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Capacity
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {d.map((date) => (
                  <tr key={date.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium sm:pl-6">
                      <Link
                        href={"/training/" + training.id + "/date/" + date.id}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        {formatDate(date.date)}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {date.location}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {date.attendees.length} / {date.capacity}
                    </td>
                    <td className="relative space-x-6 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link
                        href="#"
                        className={clsx(
                          !date.confirmed
                            ? "text-blue-600 hover:text-blue-900"
                            : "disabled cursor-default text-gray-500"
                        )}
                      >
                        {date.confirmed ? "Confirmed" : "Confirm"}
                      </Link>
                      <Link
                        href="#"
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};
