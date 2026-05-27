import { NextResponse } from 'next/server'
import { getAllContent } from '@/lib/content'

export async function GET() {
  try {
    const content = getAllContent()
    return NextResponse.json(content)
  } catch {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 })
  }
}
