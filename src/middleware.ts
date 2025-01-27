// import NextAuth from "next-auth";
// import { NextRequest } from "next/server";
// import authConfig from "./auth.config";

// const { auth } = NextAuth(authConfig)
// export default auth(async function middleware(req: NextRequest) {

// })

import NextAuth from 'next-auth';
import authConfig from '../auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};