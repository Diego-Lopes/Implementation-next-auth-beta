import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) return redirect('/login')
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Autenticado como: {session?.user?.email}</p>

      <form action={async () => {
        'use server'
        await signOut({redirectTo: '/login'})
      }}>
        <button>sair</button>
      </form>
    </div>
  )
}
