import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

// Função que faz a chamada para sua API externa
// async function authenticate(email: string, password: string) {
//   const response = await fetch('https://sua-api.com/auth', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password })
//   });

//   if (!response.ok) {
//     return null;
//   }

//   // Supondo que a API retorna { token: string, expiresAt: number }
//   return response.json();
// }

async function getUser({ email, password }: { email: string, password: string }) {
  if (email === 'diego@teste.com' && password === '123456') return { token: '121321312', expires_at: 1 }
}

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const auth = await getUser({ email, password });

        if (!auth) return null;

        // Retorna o usuário com o token JWT
        return {
          id: '1',
          email,
          name: email.split('@')[0],
          accessToken: auth.token,
          expiresAt: auth.expires_at
        };
      },
    }),
  ],
  callbacks: {
    // Armazena o token JWT no token da sessão
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.expiresAt = user.expiresAt;
      }

      return token;
    },
    // Disponibiliza o token JWT na sessão do cliente
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    // Protege as rotas que precisam de autenticação
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    }
  },
  pages: {
    signIn: '/login'
  }
} satisfies NextAuthConfig;