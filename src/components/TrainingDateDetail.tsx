import clsx from "clsx";

import { type Training, type TrainingDate } from "@prisma/client";

import { formatDate } from "@/utils/dateFormatter";

type TrainingDateDetailProps = {
  trainingDate: TrainingDate & { training: Training };
};

export const TrainingDateDetail = ({
  trainingDate,
}: TrainingDateDetailProps) => {
  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            {trainingDate.training.name} training |{" "}
            {formatDate(trainingDate.date)}
          </h1>
        </div>
      </div>
      <div className="mt-8 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(trainingDate.date)}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {trainingDate.location}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Confirmed?</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">
                {trainingDate.confirmed ? (
                  <>Yes</>
                ) : (
                  <>
                    No (
                    <span
                      className={clsx(
                        !trainingDate.confirmed
                          ? "text-blue-600 hover:text-blue-900"
                          : "disabled cursor-default text-gray-500",
                        "cursor-pointer"
                      )}
                    >
                      Confirm
                    </span>
                    )
                  </>
                )}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Cancelled?</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">
                {/* <Link
                  href="#"
                  className={clsx(
                    !trainingDate.isCancelled ? 'text-red-600 hover:text-red-900' : 'text-gray-500 disabled cursor-default'
                  )}
                >
                  { trainingDate.isCancelled ? 'Cancelled' : 'Cancel'}
                </Link> */}
                {trainingDate.isCancelled ? (
                  <span className="font-medium">Yes</span>
                ) : (
                  <>
                    <span className="font-medium">No</span> (
                    <span
                      className={clsx(
                        !trainingDate.isCancelled
                          ? "text-red-600 hover:text-red-900"
                          : "disabled cursor-default text-gray-500",
                        "cursor-pointer"
                      )}
                    >
                      Cancel
                    </span>
                    )
                  </>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};
