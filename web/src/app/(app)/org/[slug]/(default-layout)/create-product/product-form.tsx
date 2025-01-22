'use client'

import StatusAlert from '@/components/alert-status'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'

import {
  createProductAction,
  type ProductSchema,
  updateProductAction,
} from './actions'

interface ProductFormProps {
  isUpdating?: boolean
  initialData?: ProductSchema & { id: string }
}

export function ProductForm({
  isUpdating = false,
  initialData,
}: ProductFormProps) {
  const formAction = isUpdating ? updateProductAction : createProductAction

  const [{ errors, message, success }, handleSubmit, isPending] =
    useFormState(formAction)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StatusAlert
        message={message}
        success={success}
        failTitle="Falha ao salvar produto!"
        successTitle="Salvo!"
      />

      {isUpdating && <input type="hidden" name="id" value={initialData?.id} />}

      <div className="space-y-1">
        <Label htmlFor="name">Nome do produto</Label>
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
          rows={4}
        />
        {errors?.description && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.description[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="price">Preço</Label>
        <Input
          name="price"
          id="price"
          type="number"
          step="0.01"
          defaultValue={initialData?.price}
        />
        {errors?.price && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.price[0]}
          </p>
        )}
      </div>

      <SubmitButton isSubmitting={isPending} isSubmitSuccessful={success}>
        {isUpdating ? 'Atualizar' : 'Criar'} Produto
      </SubmitButton>
    </form>
  )
}
