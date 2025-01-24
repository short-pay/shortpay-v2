import { PlusCircle, Slash } from 'lucide-react'

import { getCurrentOrg, getCurrentPathName } from '@/auth/auth'

import { Separator } from '../ui/separator'
import { MenuLink } from './menu-link'
import { ProfileButton } from './profile-button'
import { ThemeAwareLogo } from './theme-aware-logo'
import { OrganizationSwitcherWrapper } from '../organization-switcher/organization-switcher-wrapper'
import { Search } from './search'
import { Button } from '../ui/button'
import Link from 'next/link'

export async function Header() {
  const org = await getCurrentOrg()
  const path = await getCurrentPathName()

  const isHome = path === '/' || !org

  return (
    <>
      <div className="border-b">
        <div className="flex min-h-14 items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <ThemeAwareLogo />

            {!isHome && org && (
              <>
                <Slash className="w-3 -rotate-[24deg] text-border" />
                <OrganizationSwitcherWrapper />

                <Separator orientation="vertical" className="h-6" />

                <nav className="flex items-center space-x-2 lg:space-x-3">
                  <MenuLink href={`/org/${org}`}>Dashboard</MenuLink>
                  <MenuLink href={`/org/${org}/integrations`}>
                    Integrações
                  </MenuLink>
                  <MenuLink href={`/org/${org}/funnels`}>Funnels</MenuLink>
                  {/* <MenuLink href={`/org/${org}/customers`}>Clientes</MenuLink>
                  <MenuLink href={`/org/${org}/products`}>Produtos</MenuLink> */}
                </nav>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!isHome && org && (
              <>
                <Search />

                <Separator orientation="vertical" className="h-6" />

                <Button size="sm" asChild>
                  <Link href={`/org/${org}/editor`}>
                    <PlusCircle className="mr-2 w-4" />
                    Criar Checkout
                  </Link>
                </Button>

                <Separator orientation="vertical" className="h-6" />
              </>
            )}

            {/* <PendingInvites /> */}
            {/* <NotificationsAndInvites />  */}
            {/* <ThemeSwitcher /> */}
            {/* <Separator orientation="vertical" className="h-6" /> */}
            <ProfileButton />
          </div>
        </div>
      </div>
    </>
  )
}
