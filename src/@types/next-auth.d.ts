import "next-auth";

declare module "next-auth" {
  interface User {
    accessToken?: string;
    expiresAt?: number;
  }

  interface Session {
    accessToken?: string;
  }

  interface JWT {
    accessToken?: string;
    expiresAt?: number;
  }
} 