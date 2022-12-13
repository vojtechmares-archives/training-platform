import NextAuth, { type NextAuthOptions } from "next-auth";
import { AppProviders } from 'next-auth/providers';
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google.js";
import CredentialsProvider from 'next-auth/providers/credentials';
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

const useMockProvider = (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development');

const providers: AppProviders = [];

if (useMockProvider) {
  providers.push(CredentialsProvider({
      id: 'google',
      name: 'Mocked Google',
      async authorize(credentials) {
        if (credentials) {
          const user = {
            id: credentials.name,
            name: credentials.name,
            email: credentials.name,
          };
          return user;
        }
        return null;
      },
      credentials: {
        name: { type: 'test' },
      },
    })
  )
} else {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set!")
  }

  providers.push(GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile: GoogleProfile) {
        return {
          id: profile.name,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        } as any;
      },
    })
  )
}

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
