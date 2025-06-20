import { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      isSocial?: boolean;
      isSoldier?: boolean;
      userId?: number;
      userName?: string;
    } & DefaultSession["user"];
  }

  interface User {
    isSocial?: boolean;
    isSoldier?: boolean;
    userId?: number;
    userName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isSocial?: boolean;
    isSoldier?: boolean;
    userId?: number;
    userName?: string;
  }
}
