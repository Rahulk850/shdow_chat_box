import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          const user = await UserModel.findOne({
            $or: [
              { username: credentials.username },
              { email: credentials.email },
            ],
          });
          if (!user) {
            throw new Error("User not found");
          }
          if (!user.isverified) {
            throw new Error("Please verify your account before login");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (err: any) {
          throw new Error(err.message || "Error during login");
        }
      },
    }),
  ],

  session: {
    // jwt: true,
    strategy: "jwt", // Ensure JWT strategy is used for session handling
  },

  jwt: {
    secret: process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET, // Ensure secret fallback
  },

  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
        sameSite: "lax",
        path: "/",
      },
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isverified = user.isverified;
        token.isAcceptingMessage = user.isAcceptingMessage;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isverified = token.isverified;
        session.user.isAcceptingMessage = token.isAcceptingMessage;
        session.user.username = token.username;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in", // Specify the sign-in page
    error: "/auth/error", // Custom error page for better UX in case of issues
  },

  // Error handling and debugging during development
  debug: process.env.NODE_ENV === "development",

  // Secret for next-auth encryption
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
};

export default NextAuth(nextAuthOptions);
