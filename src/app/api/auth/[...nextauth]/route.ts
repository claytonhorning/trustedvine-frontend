import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret:
        process.env.FACEBOOK_CLIENT_SECRET ?? "",
      authorization: {
        url: "https://www.facebook.com/v11.0/dialog/oauth",
        params: {
          client_id: process.env.FACEBOOK_CLIENT_ID,
          scope: "openid",
          response_type: "code",
        },
      },
      token: {
        url: "https://graph.facebook.com/oauth/access_token",
        async request(context) {
          const url =
            `https://graph.facebook.com/oauth/access_token` +
            `?code=${context.params.code}` +
            `&client_id=${context.provider.clientId}` +
            `&redirect_uri=${context.provider.callbackUrl}` +
            `&client_secret=${context.provider.clientSecret}`;
          const response = await fetch(url);
          const tokens = await response.json();
          return { tokens };
        },
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ account, user }) {
      if (account?.provider === "facebook") {
        const response = await fetch(
          `${process.env.TRUSTEDVINE_API_URL}/users`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              image: user.image,
              facebookId: account.providerAccountId,
            }),
          }
        );
        if (response.ok) {
          return true;
        } else {
          const data = await response.json();
          if (data.message === "User already exists") {
            // Log the user in if they already exist
            return true;
          }
          console.error("Sign in failed:", data.message);
          return false;
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
