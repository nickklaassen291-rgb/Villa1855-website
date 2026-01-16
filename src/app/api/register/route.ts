import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

interface RegistrationData {
  names: string
  email: string
  phone: string
  weddingDate?: string
  timeSlot: string
  guestCount?: string
  message?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
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
    const data: RegistrationData = await request.json()

    // Validate required fields
    if (!data.names || !data.email || !data.phone || !data.timeSlot) {
      return NextResponse.json(
        { success: false, message: 'Vul alle verplichte velden in.' },
        { status: 400 }
      )
    }

    // Format the time slot for display
    const timeSlotLabels: Record<string, string> = {
      '10:00': '10:00 - 11:00',
      '11:00': '11:00 - 12:00',
      '12:00': '12:00 - 13:00',
      '13:00': '13:00 - 14:00',
      '14:00': '14:00 - 15:00',
      '15:00': '15:00 - 16:00',
      '16:00': '16:00 - 17:00',
    }

    const timeSlotLabel = timeSlotLabels[data.timeSlot] || data.timeSlot

    // Format wedding date if provided
    const formattedWeddingDate = data.weddingDate
      ? new Date(data.weddingDate).toLocaleDateString('nl-NL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : ''

    // Get current timestamp
    const timestamp = new Date().toLocaleString('nl-NL', {
      dateStyle: 'short',
      timeStyle: 'short',
    })

    // Prepare row data for Google Sheets
    const rowData = [
      timestamp,
      data.names,
      data.email,
      data.phone,
      timeSlotLabel,
      formattedWeddingDate,
      data.guestCount || '',
      data.message || '',
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_campaign || '',
      data.utm_content || '',
      data.utm_term || '',
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

    // Append the row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Aanmeldingen!A:M', // Sheet name and columns
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Bedankt voor je aanmelding! We nemen binnen 24 uur contact met je op.',
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Er ging iets mis. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
