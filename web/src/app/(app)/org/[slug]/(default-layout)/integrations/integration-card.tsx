'use client'

import { motion } from 'framer-motion'
import { Check, ExternalLink, Settings } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

export interface IntegrationCardProps {
  integration: {
    name: string
    provider: string
    description: string | null
    isConnected: boolean
    icon: string | null
    domain: string | null
  }
}

export function IntegrationCard({ integration }: IntegrationCardProps) {
  const { slug: orgSlug } = useParams<{ slug: string }>()
  const router = useRouter()

  const handleToggle = () => {
    if (integration.isConnected) {
      // Redirect to update integration
      router.push(
        `/org/${orgSlug}/update-integration?provider=${integration.provider}`,
      )
    } else {
      // Redirect to create integration
      router.push(
        `/org/${orgSlug}/create-integration?provider=${integration.provider}`,
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md">
        <CardContent className="flex h-[200px] flex-col justify-between p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              {integration.icon ? (
                <motion.img
                  src={integration.icon}
                  alt={integration.name}
                  className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              ) : (
                <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
              )}
              {integration.domain && (
                <Button
                  variant="outline"
                  size="xs"
                  className="shrink-0"
                  asChild
                >
                  <Link
                    href={`https://${integration.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5"
                  >
                    {integration.domain}
                    <ExternalLink className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
            <div className="overflow-hidden">
              <h3 className="truncate text-lg font-semibold">
                {integration.name}
              </h3>
              <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                {integration.description || 'No description available'}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={integration.isConnected ? { scale: 1.1 } : {}}
                whileTap={integration.isConnected ? { scale: 0.9 } : {}}
              >
                <Link
                  prefetch
                  href={`/org/${orgSlug}/update-integration?provider=${integration.provider}`}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`mr-2 h-8 w-8 p-0 ${
                      !integration.isConnected
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                    }`}
                    disabled={!integration.isConnected}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                className="flex items-center"
                layout
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className={`flex items-center text-sm font-medium ${
                    integration.isConnected
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  layout
                >
                  {integration.isConnected && (
                    <Check className="mr-1 h-3 w-3" />
                  )}
                  {integration.isConnected ? 'Connected' : 'Disconnected'}
                </motion.span>
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Switch
                checked={integration.isConnected}
                onCheckedChange={handleToggle}
                className={integration.isConnected ? 'bg-green-500' : ''}
              />
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
