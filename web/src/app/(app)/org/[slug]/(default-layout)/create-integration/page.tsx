import { IntegrationForm } from './integration-form'

export default function CreateIntegrationPage() {
  return (
    <div className="space-y-4 py-4">
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Criar organização</h1>

        <IntegrationForm />
      </main>
    </div>
  )
}
