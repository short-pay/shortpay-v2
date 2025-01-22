import { signInWithGithub } from '@/http/account/sign-in-with-github'
import { acceptInvite } from '@/http/invites/accept-invite'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()

  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')
  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth code was not found' },
      { status: 400 },
    )
  }

  const { token } = await signInWithGithub({ code })
  cookieStore.set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  const inviteId = cookieStore.get('inviteId')?.value

  if (inviteId) {
    try {
      await acceptInvite(inviteId)
      cookieStore.delete('inviteId')
    } catch {}
  }

  const redirectURL = request.nextUrl.clone()
  redirectURL.pathname = '/'
  redirectURL.search = ''

  return NextResponse.redirect(redirectURL)
}
