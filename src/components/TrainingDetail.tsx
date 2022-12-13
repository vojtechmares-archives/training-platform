import Link from "next/link";

import { type Training } from "@prisma/client";
import { formatCurrency } from "@/utils/currencyFormatter";

type TrainingDetailProps = { training: Training };

export const TrainingDetail = ({ training }: TrainingDetailProps) => {
  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            {training.name} training
          </h1>
        </div>
      </div>
      <div className="mt-8 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{training.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Price Open</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatCurrency(training.priceOpen)}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="mt-1 truncate text-sm text-gray-700 underline hover:text-gray-900">
                <Link href={training.website} target="_blank">
                  {training.website}
                </Link>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Price Company
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatCurrency(training.priceCompany)}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Repository</dt>
              <dd className="mt-1 truncate text-sm text-gray-700 underline hover:text-gray-900">
                <Link href={training.repository} target="_blank">
                  {training.repository}
                </Link>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500"># days</dt>
              <dd className="mt-1 text-sm text-gray-900">{training.days}</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};
