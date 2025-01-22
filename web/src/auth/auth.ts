import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/account/get-profile'
import { getMembership } from '@/http/members/get-membership'
import { defineAbilityFor } from '@/@casl/src'

export async function isAuthenticated() {
  const cookieStore = await cookies()
  return !!cookieStore.get('token')?.value
}

export async function getCurrentOrg() {
  const cookieStore = await cookies()
  return cookieStore.get('org')?.value ?? null
}

export async function getCurrentPathName() {
  const cookieStore = await cookies()
  return cookieStore.get('path-name')?.value ?? null
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg()

  if (!org) {
    return null
  }

  const { membership } = await getMembership(org)
  return membership
}

export async function ability(slug?: string) {
  let membership

  if (slug) {
    const result = await getMembership(slug)
    membership = result?.membership
  } else {
    membership = await getCurrentMembership()
  }

  if (!membership) {
    return null
  }

  return defineAbilityFor({
    id: membership.userId,
    role: membership.role,
    organizationId: membership.organizationId,
  })
}

export async function auth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()
    return { user }
  } catch {
    redirect('/api/auth/sign-out')
  }
}

export async function getCurrentSubscription() {
  const { user } = await getProfile()
  return user.subscription
}
