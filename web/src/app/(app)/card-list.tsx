'use client'

import { motion } from 'framer-motion'
import { Activity, Briefcase, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Line, LineChart, ResponsiveContainer } from 'recharts'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import type { Role } from '@/@casl/src/enums'

interface Organization {
  role: Role
  id: string
  name: string
  slug: string
  avatarUrl: string | null
}

interface OrganizationalStructureGridProps {
  organizations: Organization[]
}

const getRoleColor = (role: Organization['role']) => {
  switch (role) {
    case 'ADMIN':
      return 'hsl(var(--chart-1))'
    case 'MEMBER':
      return 'hsl(var(--chart-2))'
    case 'BILLING':
      return 'hsl(var(--chart-3))'
  }
}

const getRoleLabel = (role: Organization['role']) => {
  switch (role) {
    case 'ADMIN':
      return 'Administrador'
    case 'MEMBER':
      return 'Membro'
    case 'BILLING':
      return 'Faturamento'
  }
}

const generateFakeData = (role: Organization['role']) => {
  const baseValue = role === 'ADMIN' ? 50 : role === 'MEMBER' ? 30 : 20
  return Array.from({ length: 7 }, (_, i) => baseValue + ((i * 2) % 10))
}

export function OrganizationalStructureGrid({
  organizations,
}: OrganizationalStructureGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {organizations.map((org) => {
        const fakeData = generateFakeData(org.role)
        return (
          <motion.div
            key={org.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <Link href={`/org/${org.slug}`} className="block">
              <Card className="transition-colors duration-300 hover:border-gray-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {org.avatarUrl ? (
                      <Image
                        src={org.avatarUrl}
                        alt={org.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                        <Briefcase className="h-5 w-5 text-gray-500" />
                      </div>
                    )}
                    <div className="grid gap-1">
                      <h2 className="text-lg font-semibold">{org.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {org.slug}
                      </p>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      {getRoleLabel(org.role)}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-4 py-3">
                  <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Clientes: {fakeData[fakeData.length - 1]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <span>Atividade:</span>
                      <ChartContainer
                        config={{
                          activity: {
                            label: 'Atividade',
                            color: getRoleColor(org.role),
                          },
                        }}
                      >
                        <ResponsiveContainer width={60} height={24}>
                          <LineChart
                            data={fakeData.map((value, index) => ({
                              value,
                              day: index,
                            }))}
                          >
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke={`var(--color-activity)`}
                              strokeWidth={1.5}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
