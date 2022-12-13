import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
} from "next";
import Head from "next/head";
import { type Training } from "@prisma/client";

import { Layout } from "@/components/Layout";
import { TrainingDetail } from "@/components/TrainingDetail";
import { UpcomingDates } from "@/components/UpcomingDates";
import { NewDateForm } from "@/components/forms/NewDateForm";
import prisma from "@/lib/prisma";

type Data = {
  training: Training | null;
};

export const getServerSideProps: GetServerSideProps<Data> = async (ctx) => {
  const id = ctx.params?.trainingId;
  if (typeof id !== "string") {
    throw new Error(`Invalid type of 'trainingId' (${typeof id})`);
  }

  const training = await prisma.training.findUnique({
    where: { id: id },
  });

  const data: Data = { training: training };

  return {
    props: data,
  };
};

const TrainingPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <>
      <Head>
        <title>
          {props.training !== null
            ? `${props.training.name} training`
            : "Training not found"}{" "}
          | Training Hub
        </title>
      </Head>
      <Layout>
        {props.training !== null ? (
          <>
            <main className="lg:col-span-6">
              <TrainingDetail training={props.training} />
              <UpcomingDates training={props.training} />
            </main>
            <aside className="lg:col-span-3">
              <NewDateForm trainingId={props.training.id} />
            </aside>
          </>
        ) : (
          <main className="lg:col-span-6">
            <h1 className="text-6xl font-bold">Training not found</h1>
          </main>
        )}
      </Layout>
    </>
  );
};

export default TrainingPage;
