import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";

import { type Training, type TrainingDate } from "@prisma/client";

import { TrainingDateDetail } from "@/components/TrainingDateDetail";
import { TrainingDateAttendees } from "@/components/TrainingDateAttendees";
import { Layout } from "@/components/Layout";
import prisma from "@/lib/prisma";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

type Data = {
  trainingDate: (TrainingDate & { training: Training }) | null;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/sign/in",
      },
    };
  }

  const trainingId = ctx.params?.trainingId;
  const trainingDateId = ctx.params?.trainingDateId;

  if (typeof trainingId !== "string") {
    throw new Error(`Invalid type of 'trainingId' (${typeof trainingId})`);
  }
  if (typeof trainingDateId !== "string") {
    throw new Error(
      `Invalid type of 'trainingDateId' (${typeof trainingDateId})`
    );
  }

  const trainingDate = await prisma.trainingDate.findUnique({
    where: { id: trainingDateId },
    include: { training: true },
  });

  const data: Data = { trainingDate: trainingDate };

  return {
    props: data,
  };
};

const TrainingDateAttendeesPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <>
      <Head>
        <title>
          {props.trainingDate.training.name} training dates | Training Hub
        </title>
      </Head>
      <Layout>
        <main className="lg:col-span-9">
          {props.trainingDate !== null ? (
            <>
              <TrainingDateDetail trainingDate={props.trainingDate} />
              <TrainingDateAttendees trainingDateId={props.trainingDate.id} />
            </>
          ) : (
            <>
              <h1 className="font-bold">Training date not found</h1>
            </>
          )}
        </main>
      </Layout>
    </>
  );
};

export default TrainingDateAttendeesPage;
