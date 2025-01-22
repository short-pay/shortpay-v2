'use client'

import { Button } from '@/components/ui/button'

interface UpgradeButtonProps {
  isDisabled: boolean
  planName: string
  isCurrentPlan: boolean
}

export function UpgradeButton({
  isDisabled,
  planName,
  isCurrentPlan,
}: UpgradeButtonProps) {
  const handleUpgrade = () => {
    console.log(`Upgrade to ${planName}`)
    // Implement your upgrade logic here
  }

  return (
    <Button
      className="mt-4 w-full"
      disabled={isDisabled}
      onClick={handleUpgrade}
    >
      {isCurrentPlan ? 'Plano Atual' : `Escolher Plano ${planName}`}
    </Button>
  )
}
