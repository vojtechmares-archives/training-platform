import { type GetServerSideProps } from "next";
import Head from "next/head";

import { Layout } from "@/components/Layout";
import { NewTrainingForm } from "@/components/forms/NewTrainingForm";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

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

  return { props: {} };
};

const NewTrainingPage = () => {
  return (
    <>
      <Head>
        <title>New Training | Training Hub</title>
      </Head>
      <Layout>
        <main className="lg:col-span-9 xl:col-span-9">
          <NewTrainingForm />
        </main>
      </Layout>
    </>
  );
};

export default NewTrainingPage;
