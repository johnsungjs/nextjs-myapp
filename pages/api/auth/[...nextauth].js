import moment from "moment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { generateToken } from "@/src/lib/generateToken";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "my-projects",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        let data = {
          error: false,
          data: {
            id: 1,
            email: "example@example.com",
            avatars: "http://domain.com/url-images",
          },
        };

        const token = await generateToken(data?.data, "1d");
        Reflect.set(data, "token", token);

        //call service
        return {
          ...data,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 20,
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    maxAge: 20,
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn({ account, profile, user, credentials }) {
      switch (account?.provider) {
        case "credentials":
          // return true;
          return user?.error === false
        //validasi bisa diatur disini, kalau dia di return false maka akan jadi AccessDenied
        default:
          return false;
      }
    },
    async jwt({ token, user, profile, account }) {
      user && (token.user = user)
      profile && (token.profile = profile)
      account && (token.account = account)
      // user &&
      //   (token.user = {
      //     ...user,
      //     bearer_token: token?.user?.token ?? null,
      //     id: token?.user?.data?.id ?? null,
      //     email: token.user?.data?.email ?? null,
      //   });
      //   user && (
      //     token.accessToken = user?.token
      //   );
      //   profile && (token.profile = profile)
      //   account && (token.account = account)
      return {
        ...token,
        user : {
           bearer_token: token?.user?.token ?? null,
          id: token?.user?.data?.id ?? null,
          email: token.user?.data?.email ?? null,
          
        }
      };
    },
    async session({ session, token, user, profile }) {
      // console.log('session up', session)
      // console.log('condition', Date.now() > moment(session?.expires))
      if (Date.now() > moment(session?.expires)) {
        // console.log('true?')
        return null;
      }
      // console.log('token session', token)
      session.user = token?.user
      session.profile = token?.profile ?? null
      session.account = token?.account ?? null
      session.data = token ?? null
      // console.log('session api', session)
      // Reflect.set(session, "data", token ?? null);
      
      return session;
    },
  },
  debug: true,
});
