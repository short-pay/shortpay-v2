'use client'

import StatusAlert from '@/components/alert-status'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useConnectParams } from '@/hooks/use-connect-params'
import { useFormState } from '@/hooks/use-form-state'

import { createGatewayAction } from './actions'

export function IntegrationForm() {
  const [{ errors, message, success }, handleSubmit, isPending] =
    useFormState(createGatewayAction)

  const { provider } = useConnectParams()

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StatusAlert
        message={message}
        success={success}
        failTitle="Failed to save integration keys!"
        successTitle="Keys saved successfully!"
      />

      <input
        type="hidden"
        name="provider"
        id="provider"
        value={provider ?? ''}
      />

      <input type="hidden" name="webhookSecret" id="webhookSecret" value={''} />

      <div className="space-y-1">
        <Label htmlFor="secretKey">Secret Key</Label>
        <Input
          name="secretKey"
          id="secretKey"
          type="password"
          placeholder="Enter your secret key"
        />

        {errors?.secretKey && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.secretKey[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="publicKey">Public Key</Label>
        <Input
          name="publicKey"
          id="publicKey"
          type="text"
          placeholder="Enter your public key"
        />

        {errors?.publicKey && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.publicKey[0]}
          </p>
        )}
      </div>

      <SubmitButton isSubmitting={isPending} isSubmitSuccessful={success}>
        Save Keys
      </SubmitButton>
    </form>
  )
}
