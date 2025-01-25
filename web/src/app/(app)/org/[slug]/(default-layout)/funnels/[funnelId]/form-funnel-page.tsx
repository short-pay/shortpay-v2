'use client'

import StatusAlert from '@/components/alert-status'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import {
  createFunnelPageAction,
  updateFunnelPageAction,
  FunnelPageSchema,
} from './actions'
import { Textarea } from '@/components/ui/textarea'

interface FunnelPageFormProps {
  isUpdating?: boolean
  initialData?: FunnelPageSchema & { id: string }
}

export function FunnelPageForm({
  isUpdating = false,
  initialData,
}: FunnelPageFormProps) {
  const formAction = isUpdating
    ? updateFunnelPageAction
    : createFunnelPageAction

  const [{ errors, message, success }, handleSubmit, isPending] =
    useFormState(formAction)

  console.log({ initialData }, 'forms')

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StatusAlert
        message={message}
        success={success}
        failTitle="Falha ao salvar a página do funil!"
        successTitle="Página do funil salva!"
      />

      {isUpdating && initialData?.id && (
        <input type="hidden" name="id" id="id" value={initialData.id} />
      )}

      <input type="hidden" name="funnelId" value={initialData?.funnelId} />
      <input type="hidden" name="order" value={initialData?.order || 0} />
      <input type="hidden" name="type" value={initialData?.type || 'GENERIC'} />

      <div className="space-y-1">
        <Label htmlFor="name">Nome da página</Label>
        <Input name="name" id="name" defaultValue={initialData?.name} />
        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="pathName">Path da página</Label>
        <Input
          name="pathName"
          id="pathName"
          defaultValue={initialData?.pathName}
          placeholder="Ex: minha-pagina"
        />
        {errors?.pathName && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.pathName[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea
          name="content"
          id="content"
          defaultValue={JSON.stringify(initialData?.content, null, 2)}
          placeholder="Adicione o conteúdo da página em JSON"
        />
        {errors?.content && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.content[0]}
          </p>
        )}
      </div>

      <SubmitButton isSubmitting={isPending} isSubmitSuccessful={success}>
        Salvar Página
      </SubmitButton>
    </form>
  )
}
