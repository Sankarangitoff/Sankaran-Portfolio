import { NextResponse } from 'next/server'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
]

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `File type not allowed. Allowed: ${ALLOWED_TYPES.join(', ')}` },
        { status: 400 }
      )
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'bin'
    const timestamp = Date.now()
    const safeName = file.name
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .substring(0, 50)
    const filename = `${safeName}-${timestamp}.${ext}`

    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = path.join(uploadsDir, filename)
    writeFileSync(filePath, buffer)

    const urlPath = `/uploads/${filename}`
    return NextResponse.json({ url: urlPath })
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
