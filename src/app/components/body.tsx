import { auth } from "@/auth"

export async function Body() {
const session = await auth()

  return (
    <code>{JSON.stringify(session?.user?.name, null, 2)}</code>
  )
}