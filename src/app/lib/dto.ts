/**
 * Ao recuperar dados, é recomendado que você retorne apenas os dados necessários que serão usados ​​em seu aplicativo, 
 * e não objetos inteiros. Por exemplo, se você estiver buscando dados de usuário, você pode retornar apenas o ID e o nome do usuário, 
 * em vez do objeto de usuário inteiro que pode conter senhas, números de telefone, etc.
 * 
 * Entretanto, se você não tiver controle sobre a estrutura de dados retornada ou estiver trabalhando em 
 * uma equipe na qual deseja evitar que objetos inteiros sejam passados ​​ao cliente, 
 * você pode usar estratégias como especificar quais campos são seguros para serem expostos ao cliente.
 */

import { User } from 'next-auth'
import 'server-only'

function canSeeUsername(viewer: User) {
  return true
}

function canSeePhoneNumber(viewer: User, team: string) {
  return viewer.isAdmin || team === viewer.team
}

export async function getProfileDTO(slug: string) {
  const data = await db.query.users.findMany({
    where: eq(users.slug, slug),
    // Return specific columns here
  })
  const user = data[0]

  const currentUser = await getUser(user.id)

  // Or return only what's specific to the query here
  return {
    username: canSeeUsername(currentUser) ? user.username : null,
    phonenumber: canSeePhoneNumber(currentUser, user.team)
      ? user.phonenumber
      : null,
  }
}