'use client'

import { Check, HelpCircle } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const plans = [
  {
    name: 'Básico',
    price: 29,
    features: [
      '2,0% + R$ 0,40 por transação',
      'Integração com até 2 gateways',
      'Notificações básicas',
      'Suporte por email',
    ],
    description:
      'Ideal para pequenos negócios começando com pagamentos online.',
  },
  {
    name: 'Crescimento',
    price: 79,
    features: [
      '1,5% + R$ 0,30 por transação',
      'Integração com até 4 gateways',
      'Relatórios avançados',
      'Notificações em tempo real',
      'Suporte prioritário por email',
    ],
    description:
      'Perfeito para negócios em expansão com volume médio de transações.',
  },
  {
    name: 'Empresarial',
    price: 199,
    features: [
      '1,0% + R$ 0,20 por transação',
      'Integração com todos os gateways',
      'Relatórios personalizados',
      'API avançada',
      'Notificações prioritárias',
      'Suporte dedicado',
      'Personalização de marca',
    ],
    description:
      'Solução completa para grandes empresas com alto volume de transações.',
  },
]

export default function Component() {
  const [selectedPlan, setSelectedPlan] = useState('Básico')

  return (
    <div className="container mx-auto py-10">
      <h2 className="mb-10 text-center text-3xl font-bold">
        Escolha seu plano
      </h2>
      <RadioGroup
        value={selectedPlan}
        onValueChange={setSelectedPlan}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${selectedPlan === plan.name ? 'border-primary' : ''}`}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-3xl font-bold">
                R$ {plan.price}
                <span className="text-sm font-normal">/mês</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <RadioGroupItem
                value={plan.name}
                id={plan.name}
                className="sr-only"
              />

              <Label
                htmlFor={plan.name}
                className="flex w-full cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              >
                {selectedPlan === plan.name
                  ? 'Plano Selecionado'
                  : 'Selecionar Plano'}
              </Label>
            </CardFooter>
          </Card>
        ))}
      </RadioGroup>
      <div className="mt-10 text-center">
        <Button
          size="lg"
          onClick={() => console.log(`Plano selecionado: ${selectedPlan}`)}
        >
          Continuar com o plano {selectedPlan}
        </Button>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="link"
              className="mt-4 text-sm text-muted-foreground"
            >
              <HelpCircle className="mr-1 h-4 w-4" />
              Precisa de ajuda para escolher?
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Compare os planos ou entre em contato conosco para ajuda
              personalizada.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
