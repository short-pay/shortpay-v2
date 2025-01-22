'use client'

import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import PersonalInfo from './components/personal'
import DeliveryInfo from './components/delivery'
import PaymentInfo from './components/payment'
import CartSidebar from './components/card-sidebar'

interface ConversionThemeProps {
  primaryColor: string
  logo: string
  companyName: string
  securityBadgeEnabled: boolean
}

export default function ConversionTheme({
  primaryColor,
  logo,
  companyName,
  securityBadgeEnabled,
}: ConversionThemeProps) {
  const [activeSection, setActiveSection] = useState<string>('personal')
  const [personalInfoComplete, setPersonalInfoComplete] = useState(false)
  const [deliveryInfoComplete, setDeliveryInfoComplete] = useState(false)
  const [paymentInfoComplete, setPaymentInfoComplete] = useState(false)

  const handleSectionComplete = (section: string) => {
    if (section === 'personal') {
      setPersonalInfoComplete(true)
      setActiveSection('delivery')
    } else if (section === 'delivery') {
      setDeliveryInfoComplete(true)
      setActiveSection('payment')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="order-1 md:order-2">
            <Accordion
              type="single"
              value={activeSection}
              onValueChange={setActiveSection}
              collapsible
              className="space-y-4"
            >
              <AccordionItem
                value="personal"
                className="bg-white rounded-lg shadow-md border-none"
              >
                <AccordionTrigger
                  className="px-6 py-4 hover:no-underline [&[data-state=open]]:bg-gray-50"
                  hideChevron
                >
                  <PersonalInfo.Header complete={personalInfoComplete} />
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <PersonalInfo.Content
                    primaryColor={primaryColor}
                    onComplete={() => handleSectionComplete('personal')}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="delivery"
                className="bg-white rounded-lg shadow-md border-none"
                disabled={!personalInfoComplete}
              >
                <AccordionTrigger
                  className="px-6 py-4 hover:no-underline [&[data-state=open]]:bg-gray-50"
                  hideChevron
                >
                  <DeliveryInfo.Header complete={deliveryInfoComplete} />
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <DeliveryInfo.Content
                    primaryColor={primaryColor}
                    onComplete={() => handleSectionComplete('delivery')}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="payment"
                className="bg-white rounded-lg shadow-md border-none"
                disabled={!deliveryInfoComplete}
              >
                <AccordionTrigger
                  className="px-6 py-4 hover:no-underline [&[data-state=open]]:bg-gray-50"
                  hideChevron
                >
                  <PaymentInfo.Header complete={paymentInfoComplete} />
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <PaymentInfo.Content
                    primaryColor={primaryColor}
                    complete={paymentInfoComplete}
                    onComplete={() => setPaymentInfoComplete(true)}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="md:order-2">
            <CartSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
