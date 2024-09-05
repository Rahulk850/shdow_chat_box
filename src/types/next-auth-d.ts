import "next-auth";
import { DefaultSession } from "next-auth";
import { any } from "zod";

declare module "next-auth" {
  interface User {
    _id?: string;
    isverified?: boolean;
    isAcceptingMessage?: boolean;
    username?: string;
  }
  interface Session {
    user: {
      _id?: string;
      isverified?: boolean;
      isAcceptingMessage?: boolean;
      username?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isverified?: boolean;
    isAcceptingMessage?: boolean;
    username?: string;
  }
}
