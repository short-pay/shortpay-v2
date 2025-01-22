import { AlertCircle, Check } from 'lucide-react'

import { getCurrentSubscription } from '@/auth/auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { UpgradeButton } from './upgrade-button'

export default async function UpgradePage() {
  const subscription = await getCurrentSubscription()

  const isFree = subscription === 'FREE'
  const isBasic = subscription === 'BASIC'
  const isPro = subscription === 'PRO'

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-10 text-center text-3xl font-bold">
        Escolha seu plano
      </h1>

      {isFree && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Seu plano atual é Gratuito</AlertTitle>
          <AlertDescription>
            Atualize para ter acesso a mais recursos e funcionalidades.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Básico</CardTitle>
            <CardDescription>Para pequenos negócios</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Apenas 1 organização
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Até 200 clientes
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Indicadores básicos no dashboard
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Gráficos limitados
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Cadastro de até 10 produtos
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Vendas
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-2xl font-bold">R$30,00/mês</div>
            <div className="text-lg">R$234,00/ano (35% OFF)</div>
            <UpgradeButton
              isDisabled={isBasic || isPro}
              planName="Básico"
              isCurrentPlan={isBasic}
            />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>Para negócios em crescimento</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Até 3 organizações
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Clientes ilimitados
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Indicadores completos
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Gráficos completos
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Cadastro ilimitado de produtos
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Vendas
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Fluxo de caixa
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Relatórios
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-2xl font-bold">R$50,00/mês</div>
            <div className="text-lg">R$360,00/ano (40% OFF)</div>
            <UpgradeButton
              isDisabled={isPro}
              planName="Pro"
              isCurrentPlan={isPro}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
