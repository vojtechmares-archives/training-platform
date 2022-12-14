import { type GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { type ClientSafeProvider, type LiteralUnion } from "next-auth/react";
import { type BuiltInProviderType } from "next-auth/providers";

import { getServerAuthSession } from "@/server/common/get-server-auth-session";

type Providers = Promise<Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null>;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const providers = await getProviders();
  const session = await getServerAuthSession(ctx);

  if (session !== null) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: { providers },
  };
};

type SignInProps = {
  providers: Providers;
};

const SignIn = ({ providers }: SignInProps) => {
  return (
    <main className="mt-40 flex justify-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id)}
            className="rounded-full border bg-blue-600 px-8 py-5 text-2xl font-medium text-white transition hover:bg-blue-800"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </main>
  );
};

export default SignIn;
