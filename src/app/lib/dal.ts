/**
 * Recomendamos criar um DAL para centralizar suas solicitações de dados e lógica de autorização.
 * O DAL deve incluir uma função que verifica a sessão do usuário conforme ele interage com seu aplicativo. No mínimo,
 * a função deve verificar se a sessão é válida e, então, redirecionar ou retornar as informações do usuário necessárias para fazer mais solicitações.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { decrypt } from "./session";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/login')
  }

  return { isAuth: true, userId: session.userId }
})

/**
 * Você pode então invocar a verifySession()função em suas solicitações de dados, ações do servidor, manipuladores de rota:
 */

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null

  // Get user ID from session and fetch data
})