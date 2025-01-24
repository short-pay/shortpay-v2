'use client'

import { type FormEvent, useCallback, useState, useTransition } from 'react'
import { useFormStatus } from 'react-dom'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (prevState: FormState, data: FormData) => Promise<FormState>,
  initialState: FormState = { success: false, message: null, errors: null },
  onSuccess?: () => Promise<void> | void,
) {
  const [state, formAction] = useState(initialState)
  const [isPending, startTransition] = useTransition()
  const { pending } = useFormStatus()

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.currentTarget
      const formData = new FormData(form)

      startTransition(async () => {
        const newState = await action(state, formData)

        if (newState.success) {
          startTransition(() => {
            form.reset()
          })

          if (onSuccess) {
            await onSuccess()
          }
        }

        formAction(newState)
      })
    },
    [action, onSuccess, state],
  )

  return { state, handleSubmit, isPending: isPending || pending }
}
