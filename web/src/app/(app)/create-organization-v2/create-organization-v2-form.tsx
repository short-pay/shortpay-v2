'use client'

import { ArrowRight, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

import StatusAlert from '@/components/alert-status'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import {
  createOrganizationAction,
  type OrganizationSchema,
  updateOrganizationAction,
} from '../create-organization/actions'

interface OrganizationFormV2Props {
  isUpdating?: boolean
  initialData?: OrganizationSchema
}

export function CreateOrganizationV2Form({
  isUpdating = false,
  initialData,
}: OrganizationFormV2Props) {
  const router = useRouter()

  const formAction = isUpdating
    ? updateOrganizationAction
    : createOrganizationAction

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    formAction,
    () => {
      router.push('/')
    },
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StatusAlert
        message={message}
        success={success}
        failTitle="Falha ao Salvar organização!"
        successTitle="Salvo!"
      />

      <div className="mb-6 rounded-lg bg-zinc-100 p-4 shadow-sm dark:bg-zinc-800">
        <Label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-muted-foreground"
        >
          Nome
        </Label>
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
            size={20}
          />
          <Input
            placeholder="Ex: Acme Inc"
            name="name"
            id="name"
            defaultValue={initialData?.name}
            className="border-none bg-transparent py-6 pl-10 text-lg shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>
      </div>

      {/* Campo do domínio */}
      <div className="hidden space-y-1">
        <Label htmlFor="domain">E-mail domain</Label>
        <Input
          name="domain"
          id="domain"
          defaultValue={initialData?.domain ?? undefined}
          type="text"
          inputMode="url"
          placeholder="example.com"
        />
        {errors?.domain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.domain[0]}
          </p>
        )}
      </div>

      {/* Campo para adicionar membros automaticamente */}
      <div className="mt-4 hidden space-y-1">
        <div className="flex items-start space-x-2">
          <Checkbox
            name="shouldAttachUsersByDomain"
            id="shouldAttachUsersByDomain"
            defaultChecked={initialData?.shouldAttachUsersByDomain}
          />
          <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
            <span className="text-sm font-medium leading-none">
              Adicionar novos membros automaticamente
            </span>
            <p className="text-sm text-muted-foreground">
              Isso irá convidar automaticamente todos os membros com o mesmo
              domínio de e-mail para esta organização.
            </p>
          </label>
        </div>
        {errors?.shouldAttachUsersByDomain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.shouldAttachUsersByDomain[0]}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="mt-6 w-full py-6 text-lg"
        disabled={isPending}
      >
        {isPending ? (
          <span className="flex items-center justify-center">
            <span className="mr-2">Criando...</span>
            <span className="animate-spin">⋯</span>
          </span>
        ) : (
          <>
            Continuar
            <ArrowRight className="ml-2" size={20} />
          </>
        )}
      </Button>
    </form>
  )
}
