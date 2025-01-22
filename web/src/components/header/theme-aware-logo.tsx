'use client'

import clsx from 'clsx'
import Image from 'next/image'

import logoIconLight from '@/assets/icon-shortpay.svg'
import logoIcon from '@/assets/icon-shortpay-v2.svg'

export function ThemeAwareLogo() {
  return (
    <div className="relative size-8">
      <Image
        className={clsx(
          'absolute left-0 top-0 transition-opacity duration-300 ease-in-out',
          'dark:invisible dark:opacity-0',
        )}
        src={logoIcon}
        alt="Logo (Tema Claro)"
        width={40}
        height={40}
      />
      <Image
        className={clsx(
          'absolute left-0 top-0 transition-opacity duration-300 ease-in-out',
          'invisible opacity-0 dark:visible dark:opacity-100',
        )}
        src={logoIconLight}
        alt="Logo (Tema Escuro)"
        width={40}
        height={40}
      />
    </div>
  )
}
