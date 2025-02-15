import { FormEvent, useState, useTransition } from 'react'
// import { requestFormReset } from 'react-dom'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? { success: false, message: null, errors: null },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success) {
          //passei a requisição de resetar o form para algo mais simples e manual com form.reset(), evitando erros de versoes futuras
          form.reset(); 
          
          if(onSuccess){
            await onSuccess()
          }
        }

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
