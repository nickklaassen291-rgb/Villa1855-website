// TEMP: cleanup endpoint voor Attio test records
// Verwijdert na gebruik!

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const TEST_EMAIL_PATTERNS = [
  '@example.com',
  '@villa1855-test.nl',
  '@x.x',
]

async function attioFetch(path: string, options: RequestInit = {}): Promise<any> {
  const apiKey = process.env.ATTIO_API_KEY
  if (!apiKey) throw new Error('ATTIO_API_KEY not set')
  const response = await fetch(`https://api.attio.com/v2${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  const text = await response.text()
  if (!response.ok) {
    throw new Error(`Attio ${response.status} on ${path}: ${text.slice(0, 200)}`)
  }
  return text ? JSON.parse(text) : null
}

export async function POST(request: NextRequest) {
  const token = request.headers.get('x-cleanup-token')
  if (token !== process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const results: any = { deletedEntries: 0, deletedPeople: 0, errors: [] }

  try {
    // 1. Get all entries on Lead pipeline
    const entriesRes = await attioFetch('/lists/d2eaf63c-ded2-4ed6-99b8-ee45f75cba0c/entries/query', {
      method: 'POST',
      body: JSON.stringify({ limit: 100 }),
    })
    const entries = entriesRes?.data || []

    // 2. Get parent people for each entry, check if email matches test pattern.
    // If person GET fails (orphan), delete the entry anyway.
    for (const entry of entries) {
      const personId = entry.parent_record_id
      const entryId = entry.id?.entry_id
      if (!personId || !entryId) continue

      let isTest = false
      let personExists = true
      try {
        const person = await attioFetch(`/objects/people/records/${personId}`)
        const emails = person?.data?.values?.email_addresses || []
        const email = emails[0]?.email_address || ''
        isTest = TEST_EMAIL_PATTERNS.some((p) => email.endsWith(p))
      } catch (err) {
        // Person record missing → orphan entry. Delete it.
        personExists = false
        isTest = true
        results.errors.push(`orphan entry ${entryId}: person ${personId} unreachable`)
      }

      if (!isTest) continue

      try {
        await attioFetch(`/lists/d2eaf63c-ded2-4ed6-99b8-ee45f75cba0c/entries/${entryId}`, { method: 'DELETE' })
        results.deletedEntries++
      } catch (err) {
        results.errors.push(`delete entry ${entryId}: ${err instanceof Error ? err.message : String(err)}`)
      }

      if (personExists) {
        try {
          await attioFetch(`/objects/people/records/${personId}`, { method: 'DELETE' })
          results.deletedPeople++
        } catch (err) {
          results.errors.push(`delete person ${personId}: ${err instanceof Error ? err.message : String(err)}`)
        }
      }
    }

    return NextResponse.json({ success: true, ...results })
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : String(err),
      ...results,
    }, { status: 500 })
  }
}
