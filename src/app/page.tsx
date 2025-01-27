import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Body } from "./components/body";

export default async function Home() {
  const session = await auth()

  if (!session) redirect('/login')
  
  return (
    <>
        <p>/</p>
        <Body />
    </>
  )
}
