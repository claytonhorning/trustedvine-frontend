import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret:
        process.env.FACEBOOK_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "openid email",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
    }: {
      token: any;
      account: any;
    }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken; // Ensure accessToken is set in the JWT token
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: any;
      token: any;
    }) {
      // Add the accessToken to the session object without explicit casting
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
