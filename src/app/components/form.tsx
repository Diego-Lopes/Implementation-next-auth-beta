'use client'

import { authenticate } from "@/lib/action"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"

export function Form() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)
  return (
    <form action={formAction} className="flex flex-col gap-4 w-1/2 ">
      <input type="text" name="email" className="text-slate-700" />
      <input type="password" name="password" className="text-slate-700" />
      <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button className="mt-4 w-full" aria-disabled={isPending}>
          Log in 
        </button>
      <button type="submit" >enviar</button>
      <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
    </form>
  )
}