import { signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import { verifySession } from "../lib/dal"

export default async function Home() {
  const session = await verifySession()

  const userRole = session?.user?.role // Assuming 'role' is part of the session object

  if (!session) return redirect('/login')

    if (userRole === 'admin') {
      return (
        <>
        <p>home</p>    
        <p>authenticado</p>    
      
  
        <form action={async () => {
          'use server'
          await signOut({redirectTo: '/login'})
        }}>
          <button>sign out</button>
        </form>
        {/* <AdminDashboard /> */}
      </>
      
    )
    } else if (userRole === 'user') {
      return (
        <>
        <p>home</p>    
        <p>authenticado</p>    
      
  
        <form action={async () => {
          'use server'
          await signOut({redirectTo: '/login'})
        }}>
          <button>sign out</button>
        </form>
        {/* <UserDashboard /> */}
      </>
      
    )
    } else {
      redirect('/login')
    }
  return (
    
  )
}
