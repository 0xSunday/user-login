import { verifyPassword } from "@/lib/authPassword";
import { connectToDB } from "@/lib/db";
import NextAuth from "next-auth";
// import Providers from `next-auth/providers`
// import { SessionProvider } from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    jwt: true,
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials, res) {
        const client = await connectToDB();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("user dosen't exist !!");
        }

        const verifyPas = await verifyPassword(
          credentials.password,
          user.password
        );
        if (user && !verifyPas) {
          client.close();
          throw new Error("wrong passowrd");
        }
        if (!verifyPas) {
          client.close();
          throw new Error("could not log you in !!");
        }

        return { email: user.email };
        client.close();
      },
    }),
  ],
};

export default NextAuth(authOptions);
