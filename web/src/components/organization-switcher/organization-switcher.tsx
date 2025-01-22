'use client'

import Link from 'next/link'
import { ChevronsUpDown, Info, PlusCircle } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface OrganizationSwitcherProps {
  organizations: Array<{
    id: string
    slug: string
    name: string
    avatarUrl: string | null
    role: 'OWNER' | 'ADMIN' | 'BILLING' | 'MEMBER' | 'CUSTOMER'
  }>
  currentOrg: string | null
  isFree: boolean
  isAdminInAnyOrg: boolean
}

const roleBadgeProps = {
  OWNER: { label: 'Owner' },
  ADMIN: { label: 'Admin' },
  BILLING: { label: 'Billing' },
  MEMBER: { label: 'Member' },
  CUSTOMER: { label: 'Customer' },
}

export function OrganizationSwitcher({
  organizations,
  currentOrg,
  isFree,
  isAdminInAnyOrg,
}: OrganizationSwitcherProps) {
  const currentOrganization = organizations.find(
    (org) => org.slug === currentOrg,
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[186px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {currentOrganization ? (
          <>
            <Avatar className="mr-2 size-4">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <div className="flex flex-1 items-center justify-between overflow-hidden">
              <span className="truncate text-left">
                {currentOrganization.name}
              </span>
              <Badge variant="outline" className="ml-2 px-1 py-0 text-[10px]">
                {roleBadgeProps[currentOrganization.role].label}
              </Badge>
            </div>
          </>
        ) : (
          <span className="text-muted-foreground">Escolha a organização</span>
        )}
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={22}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizações</DropdownMenuLabel>
          {organizations.map((organization) => {
            const { label } = roleBadgeProps[organization.role]
            const isDisabled = isFree && organization.role === 'ADMIN'

            return (
              <DropdownMenuItem
                key={organization.id}
                asChild
                disabled={isDisabled}
              >
                <Link
                  href={`/org/${organization.slug}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Avatar className="mr-2 size-4">
                      {organization.avatarUrl && (
                        <AvatarImage src={organization.avatarUrl} />
                      )}
                      <AvatarFallback />
                    </Avatar>
                    <span className="line-clamp-1">{organization.name}</span>
                  </div>
                  <Badge variant="outline" className="px-1 py-0 text-[10px]">
                    {label}
                  </Badge>
                  {isDisabled && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Faça upgrade para acessar esta organização</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          disabled={(isFree && isAdminInAnyOrg) || organizations.length > 0}
        >
          <Link href="/create-organization" className="flex items-center">
            <PlusCircle className="mr-2 size-4" />
            Criar nova
            {((isFree && isAdminInAnyOrg) || organizations.length > 0) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="ml-2 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {organizations.length > 0
                        ? 'Você já possui uma organização'
                        : 'Faça upgrade para criar uma nova organização'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
