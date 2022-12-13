import { type InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";

import clsx from 'clsx';

import { trpc } from "@/utils/trpc";
import { formatDate } from "@/utils/dateFormatter";

import { Layout } from "@/components/Layout"
import { Training, TrainingDate } from "@prisma/client";

type TrainingDateDetailProps = { trainingDate: TrainingDate & {training: Training }|null|undefined }

const TrainingDateDetail = ({ trainingDate }: TrainingDateDetailProps) => {
  if (trainingDate === null || trainingDate === undefined) {
    return <>Training date not found</>
  }

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{trainingDate.training.name} training | {formatDate(trainingDate.date)}</h1>
        </div>
      </div>
      <div className="bg-white sm:rounded-lg mt-8 shadow">
        <div className="px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(trainingDate.date)}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900">{trainingDate.location}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Confirmed?</dt>
              <dd className="mt-1 text-sm text-gray-900 font-medium">
                { trainingDate.confirmed ? <>Yes</> : (
                  <>
                    No (
                    <span
                      className={clsx(
                        !trainingDate.confirmed ? 'text-blue-600 hover:text-blue-900' : 'text-gray-500 disabled cursor-default',
                        'cursor-pointer'
                      )}
                    >
                      Confirm
                    </span>
                    )
                  </>
                ) }
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Cancelled?</dt>
              <dd className="mt-1 text-sm text-gray-900 font-medium">
                {/* <Link
                  href="#"
                  className={clsx(
                    !trainingDate.isCancelled ? 'text-red-600 hover:text-red-900' : 'text-gray-500 disabled cursor-default'
                  )}
                >
                  { trainingDate.isCancelled ? 'Cancelled' : 'Cancel'}
                </Link> */}
                { trainingDate.isCancelled ? <span className="font-medium" >Yes</span> : (
                  <>
                    <span className="font-medium" >No</span> (
                    <span
                      className={clsx(
                        !trainingDate.isCancelled ? 'text-red-600 hover:text-red-900' : 'text-gray-500 disabled cursor-default',
                        'cursor-pointer'
                      )}
                    >
                      Cancel
                    </span>
                    )
                  </>
                ) }
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}

type AttendeesProps = {
  trainingDateId: string|undefined
}

const Attendees = ({ trainingDateId }: AttendeesProps) => {
  if (trainingDateId === undefined) {
    return <></>
  }

  const attendees = trpc.trainingDateAttendee
                          .getAttendeesForTrainingDate
                          .useQuery({ trainingDateId: trainingDateId })

  if (attendees.data === undefined) {
    return <>No attendees found</>
  }

  const a = attendees.data

  return (
    <>
      <section aria-labelledby="upcoming-dates" className="mt-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Attendees</h1>
          </div>
        </div>
        <div className="inline-block min-w-full align-middle mt-8">
          <div className="overflow-hidden shadow  ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-white">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Company
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Confirmed?
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {a.map((attendee) => (
                  <tr key={attendee.name}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium sm:pl-6">{attendee.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Link
                        href={ "mailto:" + attendee.email }
                      >
                        {attendee.email}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      { attendee.company !== null ? attendee.company : "-" }
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-6">
                      <Link
                        href="#"
                        className={clsx(
                          attendee.confirmedAt === null ? 'text-blue-600 hover:text-blue-900' : 'text-gray-500 disabled cursor-default'
                        )}
                      >
                        { attendee.confirmedAt === null ? 'Confirmed' : 'Confirm'}
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
  )
}

type Data = {
  id: string
  slug: string
}

export const getServerSideProps = async (ctx: any) => {
  const data: Data = {id: ctx.params.id, slug: ctx.params.slug }

  return {
    props: data,
  }
}


const TrainingDateAttendeesPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const trainingDate = trpc.trainingDate
                              .getById
                              .useQuery({ id: props.id })

  return (
    <>
      <Head>
        <title>{trainingDate.data?.training.name} training | Training Hub</title>
      </Head>
      <Layout>
        <main className="lg:col-span-9">
          <TrainingDateDetail trainingDate={trainingDate.data}/>
          <Attendees trainingDateId={trainingDate.data?.id} />
        </main>
      </Layout>
    </>
  )
}

export default TrainingDateAttendeesPage;
