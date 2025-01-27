import { auth } from "@/auth"

export async function Body() {
const session = await auth()

  return (
    <code>{JSON.stringify(session?.accessToken, null, 2)}</code>
  )
}