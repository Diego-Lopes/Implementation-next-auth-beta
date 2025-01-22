import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

async function getUser({ email, password }: { email: string, password: string }) {
  if (email === 'diego@teste.com' && password === '123456') return { email, password }
}

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser({ email, password })
          if (!user) return null

          // Retorna o objeto do usuário com os campos necessários
          return {
            id: '1',
            email: user.email,
            name: email.split('@')[0],
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true
    }
  }
} satisfies NextAuthConfig