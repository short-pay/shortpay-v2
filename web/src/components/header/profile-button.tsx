import { ChevronDown, Cog, LogOut } from 'lucide-react'
import Link from 'next/link'

import { auth } from '@/auth/auth'

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
import { ThemeSelect } from './theme-select'

function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return initials
}

function getSubscriptionBadgeProps(subscription: string): {
  label: string
  variant?: 'default' | 'secondary'
} {
  switch (subscription.toLowerCase()) {
    case 'pro':
      return { label: 'PRO', variant: 'secondary' }
    case 'basic':
      return { label: 'BASIC', variant: 'secondary' }
    default:
      return { label: 'FREE', variant: 'secondary' }
  }
}

export async function ProfileButton() {
  const { user } = await auth()
  const { label, variant } = getSubscriptionBadgeProps(user.subscription)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <Avatar>
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
          {user.name && (
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          )}
        </Avatar>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="p-4 font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <Badge variant={variant} className="ml-2 text-xs">
                {label}
              </Badge>
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <ThemeSelect />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/settings/profile"
              className="flex cursor-pointer items-center"
            >
              <Cog className="mr-2 size-4" />
              <span>Ajustes</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a
            href="/api/auth/sign-out"
            className="flex cursor-pointer items-center text-red-500 hover:text-red-600"
          >
            <LogOut className="mr-2 size-4" />
            <span>Sair</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
