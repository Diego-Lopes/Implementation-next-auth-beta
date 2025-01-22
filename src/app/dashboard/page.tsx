import { redirect } from "next/navigation"
import { auth, signOut } from "../../../auth"

export default async function Home() {
  const session = await auth()

  if (!session) return redirect('/login')
  return (
    <>
      <p>home</p>    
      <p>authenticado</p>    
      <code>{JSON.stringify(session.user)}</code>
      <code>{JSON.stringify(session.expires)}</code>

      <form action={async () => {
        'use server'
        await signOut({redirectTo: '/login'})
      }}>
        <button>sign out</button>
      </form>
    </>
  )
}
