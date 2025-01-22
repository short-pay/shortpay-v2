import { NextResponse } from 'next/server'

import { getCurrentMembership } from '@/auth/auth'

export async function GET() {
  try {
    const membership = await getCurrentMembership()
    return NextResponse.json(membership)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch current membership' },
      { status: 500 },
    )
  }
}
