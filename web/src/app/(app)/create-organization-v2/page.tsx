'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, HelpCircle } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { CreateOrganizationV2Form } from './create-organization-v2-form'

export default function CreateTeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <motion.header
        className="flex items-center justify-between p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button asChild variant="outline" size="icon">
          <Link href={'/'}>
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <Button variant="outline" className="text-sm font-normal">
          <HelpCircle className="mr-2 h-4 w-4" />
          Contatar Suporte
        </Button>
      </motion.header>

      <motion.main
        className="flex flex-grow flex-col items-center justify-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full max-w-md">
          <motion.h1
            className="mb-2 text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Crie sua organização
          </motion.h1>
          <motion.p
            className="mb-8 text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Crie sua organização para começar
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <CreateOrganizationV2Form />
          </motion.div>
        </div>
      </motion.main>

      <motion.footer
        className="p-4 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        © 2023 Short Pay. All rights reserved.
      </motion.footer>
    </div>
  )
}
