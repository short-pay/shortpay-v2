'use client'

import StatusAlert from '@/components/alert-status'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'

import {
  createFunnelAction,
  updateFunnelAction,
  type FunnelSchema,
} from '@/app/(app)/org/[slug]/(editor)/funnels/actions'

interface FunnelFormProps {
  isUpdating?: boolean
  initialData?: FunnelSchema & { id: string }
}

export function FunnelForm({
  isUpdating = false,
  initialData,
}: FunnelFormProps) {
  const formAction = isUpdating ? updateFunnelAction : createFunnelAction

  const [{ errors, message, success }, handleSubmit, isPending] =
    useFormState(formAction)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StatusAlert
        message={message}
        success={success}
        failTitle="Falha ao salvar o funil!"
        successTitle="Funil salvo!"
      />

      {isUpdating ?? <input type="hidden" name='id' id='id' value={initialData?.id}/>}
      <div className="space-y-1">
        <Label htmlFor="name">Nome do funil</Label>
        <Input name="name" id="name" defaultValue={initialData?.name} />
        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          name="description"
          id="description"
          defaultValue={initialData?.description}
          placeholder="Descreva seu funil"
        />
        {errors?.description && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.description[0]}
          </p>
        )}
      </div>

      <SubmitButton isSubmitting={isPending} isSubmitSuccessful={success}>
        Salvar
      </SubmitButton>
    </form>
  )
}