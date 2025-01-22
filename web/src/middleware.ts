import { NextRequest, NextResponse } from 'next/server'
import { env } from './env/env'
import { getProfile } from './http/account/get-profile'

// // Rotas pagas:
const paidRoutes = ['/create-organization']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1) Se a rota for /auth/... ou semelhante, deixamos passar sem checar token:
  if (pathname.startsWith('/auth')) {
    return NextResponse.next()
  }

  // 2) Verifica se existe cookie `token`
  const token = request.cookies.get('token')?.value
  if (!token) {
    // Se não houver, redireciona para login
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  // 3) Cria o response base (o NextResponse que devolveremos no final)
  const response = NextResponse.next()

  // Função auxiliar para extrair o slug da organização
  const extractOrgSlug = (path: string): string | null => {
    const orgMatch = path.match(/^\/org\/([^/]+)/)
    if (orgMatch) return orgMatch[1]

    const settingsMatch = path.match(/^\/settings\/organization\/([^/]+)/)
    if (settingsMatch) return settingsMatch[1]

    return null
  }

  // 4) Se estamos em rotas de org/ ou settings/organization/, trata o slug
  if (
    pathname.startsWith('/org') ||
    pathname.startsWith('/settings/organization')
  ) {
    let orgSlug = extractOrgSlug(pathname)

    // Se não encontrou no path, tenta ler do cookie 'org'
    if (!orgSlug) {
      const cookieValue = request.cookies.get('org')?.value
      orgSlug = cookieValue || null
    }

    // Se continuar nulo, redireciona para /
    if (!orgSlug) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Caso tenha encontrado, salva/atualiza no cookie 'org'
    response.cookies.set('org', orgSlug, {
      path: '/',
      sameSite: 'lax',
      secure: env.VERCEL_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30 dias
    })
  }

  // 5) (Opcional) Se você quiser checar rotas que exigem assinatura paga:

  try {
    const { user } = await getProfile()
    // Se a rota estiver na lista de rotas pagas:
    if (paidRoutes.some((route) => pathname.startsWith(route))) {
      if (user.subscription === 'FREE') {
        return NextResponse.redirect(new URL('/upgrade', request.url))
      }
    }
    // Exemplo: Define no header, se quiser usar no front:
    response.headers.set('X-User-Subscription', user.subscription)
  } catch (error) {
    console.error('Erro ao buscar o perfil do usuário:', error)
    // Se falhou, assume que o user não está autenticado
    // ou não tem assinatura
    if (paidRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }
  }

  // Se passou por todas as checagens, retorna normalmente
  return response
}

export const config = {
  // Matcher que ignora /api, /_next/static, /_next/image e favicon.ico
  // e aplica o middleware ao restante
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
