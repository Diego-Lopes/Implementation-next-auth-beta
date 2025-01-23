import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { decrypt } from "./lib/session"


const proctectedRoutes = ['/dashboard', '/']
const publicRoutes = ['/login']

export default async function nextAuth(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isProctectedRoute = proctectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = await cookies()
  const value = cookie.get('session')?.value

  const session = await decrypt(value)
  console.log(session);



  if (isProctectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}