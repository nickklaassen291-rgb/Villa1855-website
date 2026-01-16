import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

interface ContactData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

const subjectLabels: Record<string, string> = {
  bruiloft: 'Bruiloft',
  zakelijk: 'Zakelijk event',
  bezichtiging: 'Bezichtiging aanvragen',
  anders: 'Anders',
}

async function getGoogleSheetsClient() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!credentials) {
    throw new Error('Google Service Account credentials not configured')
  }

  // Fix for Vercel: replace actual newlines with escaped newlines
  const fixedCredentials = credentials.replace(/\n/g, '\\n')

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(fixedCredentials),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return google.sheets({ version: 'v4', auth })
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: 'Vul alle verplichte velden in.' },
        { status: 400 }
      )
    }

    const subjectLabel = data.subject ? subjectLabels[data.subject] || data.subject : 'Algemeen'

    // Get current timestamp
    const timestamp = new Date().toLocaleString('nl-NL', {
      dateStyle: 'short',
      timeStyle: 'short',
    })

    // Prepare row data for Google Sheets
    const rowData = [
      timestamp,
      data.name,
      data.email,
      data.phone || '',
      subjectLabel,
      data.message,
    ]

    // Get Google Sheets client
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    if (!spreadsheetId) {
      console.error('Google Sheet ID not configured')
      return NextResponse.json(
        { success: false, message: 'Service niet geconfigureerd. Neem contact op via telefoon.' },
        { status: 500 }
      )
    }

    // Append the row to the Contact sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Contact!A:F', // Sheet name and columns
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.',
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Er ging iets mis. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
