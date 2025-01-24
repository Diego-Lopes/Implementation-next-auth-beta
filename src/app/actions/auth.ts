'use server'

import { FormState, SignupFormSchema } from "@/app/lib/definations";
import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";


async function getUser({ email, password }: { email: string, password: string }) {
  const session = await verifySession()
  if (!session) return null

  if (email === 'diego@teste.com' && password === '123456') return { id: '1' }
}

export async function signup(state: FormState, formData: FormData) {
  // validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Call the provider or db to create a user...
  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data
  // e.g. Hash the user's password before storing it
  // const hashedPassword = await bcrypt.hash(password, 10)

  // 3. Insert the user into the database or call an Auth Library's API
  const data = await getUser({ email, password })

  const user = data

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }

  // TODO:
  // 4. Create user session
  await createSession(user.id)
  // 5. Redirect user
  redirect('/dashboard')

}

export async function logout() {
  deleteSession()
  redirect('/login')
}