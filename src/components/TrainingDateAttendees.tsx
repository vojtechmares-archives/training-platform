import Link from "next/link";
import clsx from "clsx";

import { trpc } from "@/utils/trpc";

type TrainingDateAttendeesProps = {
  trainingDateId: string | undefined;
};

export const TrainingDateAttendees = ({
  trainingDateId,
}: TrainingDateAttendeesProps) => {
  if (trainingDateId === undefined) {
    return <></>;
  }

  const attendees =
    trpc.trainingDateAttendee.getAttendeesForTrainingDate.useQuery({
      trainingDateId: trainingDateId,
    });

  if (attendees.data === undefined) {
    return <>No attendees found</>;
  }

  const a = attendees.data;

  return (
    <>
      <section aria-labelledby="upcoming-dates" className="mt-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Attendees</h1>
          </div>
        </div>
        <div className="mt-8 inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow  ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Confirmed?
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {a.map((attendee) => (
                  <tr key={attendee.name}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium sm:pl-6">
                      {attendee.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link href={"mailto:" + attendee.email}>
                        {attendee.email}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {attendee.company !== null ? attendee.company : "-"}
                    </td>
                    <td className="relative space-x-6 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link
                        href="#"
                        className={clsx(
                          attendee.confirmedAt === null
                            ? "text-blue-600 hover:text-blue-900"
                            : "disabled cursor-default text-gray-500"
                        )}
                      >
                        {attendee.confirmedAt === null
                          ? "Confirmed"
                          : "Confirm"}
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
