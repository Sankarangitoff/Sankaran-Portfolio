import { NextResponse } from 'next/server'
import { getSection, writeSection, isValidSection } from '@/lib/content'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params
  if (!isValidSection(section)) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 400 })
  }

  try {
    const data = getSection(section)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to read section' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params
  if (!isValidSection(section)) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 400 })
  }

  try {
    const data = await request.json()
    writeSection(section, data)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to write section' }, { status: 500 })
  }
}
