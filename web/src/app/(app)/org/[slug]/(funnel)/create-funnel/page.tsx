import { FunnelForm } from './funnel-form'

export default async function CreateFunnelPage() {
  return (
    <div className="space-y-4 py-4">
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Criar funil</h1>

        <FunnelForm />
      </main>
    </div>
  )
}
