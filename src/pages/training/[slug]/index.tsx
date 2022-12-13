import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";

import clsx from "clsx";

import { trpc } from "@/utils/trpc";
import { formatDate } from "@/utils/dateFormatter";
import { formatCurrency } from "@/utils/currencyFormatter";

import { Layout } from "@/components/Layout";
import { Training } from "@prisma/client";
import { NewDateForm } from "@/components/forms/NewDateForm";

type TrainingDetailProps = { training: Training | null | undefined };

const TrainingDetail = ({ training }: TrainingDetailProps) => {
  if (training === null || training === undefined) {
    return <>Training not found</>;
  }

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

type UpcomingDatesProps = {
  trainingId: string | undefined;
  slug: string | undefined;
};

const UpcomingDates = ({ trainingId, slug }: UpcomingDatesProps) => {
  if (trainingId === undefined || slug === undefined) {
    return <></>;
  }

  const dates = trpc.trainingDate.getDatesForTraining.useQuery({
    trainingId: trainingId,
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
                        href={"/training/" + slug + "/date/" + date.id}
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

type Data = {
  slug: string;
};

export const getServerSideProps = async (ctx: any) => {
  const data: Data = { slug: ctx.params.slug };

  return {
    props: data,
  };
};

const TrainingPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  if (typeof props.slug !== "string") {
    throw new Error(`Invalid type of 'slug' (` + typeof props.slug + `)`);
  }

  const training = trpc.training.getBySlug.useQuery({ slug: props.slug });

  return (
    <>
      <Head>
        <title>{training.data?.name} training | Training Hub</title>
      </Head>
      <Layout>
        <main className="lg:col-span-6">
          <TrainingDetail training={training.data} />
          <UpcomingDates trainingId={training.data?.id} slug={props.slug} />
        </main>
        <aside className="lg:col-span-3">
          <NewDateForm trainingId={training.data?.id} />
        </aside>
      </Layout>
    </>
  );
};

export default TrainingPage;
