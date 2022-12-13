import Head from "next/head";

import { Layout } from "@/components/Layout";
import { NewTrainingForm } from "@/components/forms/NewTrainingForm";

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
