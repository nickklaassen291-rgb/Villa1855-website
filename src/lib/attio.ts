// ============================================================================
// Attio CRM integratie
// ============================================================================
// Upsert (find-or-create) person op email, dan toevoegen aan Lead pipeline
// list met form-specifieke velden. Alles failure-tolerant — als Attio down
// is, blijft de formulier-submit succesvol (Sheet + mail blijven werken).
// ============================================================================

const ATTIO_API_URL = 'https://api.attio.com/v2'
const LEAD_PIPELINE_LIST_ID = 'd2eaf63c-ded2-4ed6-99b8-ee45f75cba0c'

// Select option IDs voor Kanaal
const KANAAL = {
  TROUWBROCHURE: '6d987c4b-64e6-4fab-bfa2-e90d08d35ddb',
  CONTACT: 'a9fc3eb5-1fad-49bf-96d4-174c19890275',
  OPEN_DAG: '1cde841a-8009-4369-a61d-9ea4b7f59d1b',
  ZAKELIJK: 'e3f0a7f0-9dca-43f3-b2c4-eafb1684f002',
} as const

// Select option IDs voor Klantgroep
const KLANTGROEP = {
  B2C_VILLA_BRUILOFTEN: '4b19edb9-2f06-4ad5-97ab-9bb48b39d7a6',
  B2B_VILLA: '66a8bf11-945d-46c1-af0f-22cec709fad6',
} as const

// Tijdsblok status IDs (uur → status id)
const TIJDSBLOK_BY_HOUR: Record<number, string> = {
  10: '2ca1a629-aa9f-498b-a2f4-b3bd007015d9', // 10-11u
  11: '54a58b07-5d2d-4bde-bd9c-93ae785be35e', // 11-12u
  12: '0769ed72-6ea1-4dda-877e-a8424495fdf7', // 12-13u
  13: 'd8cb0b53-0b57-4e9e-b2b2-04e973839d92', // 13-14u
  14: '5785227f-0578-4eff-a7d5-fa44b0d620f6', // 14-15u
  15: '0ad0a0f1-b6f6-4a4f-827e-6f266b3664b9', // 15-16u
  16: '6a154626-21d6-4335-bc53-0d49398cac34', // 16-17u
}

// Deelname event option IDs
const DEELNAME_EVENT = {
  OPEN_TROUW_28_6_26: '7752b378-f448-440c-a675-cba8734b6d66',
} as const

// Lead Status (pipeline) IDs
const LEAD_STATUS = {
  NIEUW: 'b8412e72-cfa4-4ae7-9ffc-d1809379c3e7',
} as const

async function attioFetch(path: string, options: RequestInit = {}): Promise<any> {
  const apiKey = process.env.ATTIO_API_KEY
  if (!apiKey) throw new Error('ATTIO_API_KEY not configured')

  const response = await fetch(`${ATTIO_API_URL}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Attio API ${response.status} on ${path}: ${text}`)
  }

  return response.json()
}

// ----------------------------------------------------------------------------
// People object — find by email or create
// ----------------------------------------------------------------------------

async function findPersonByEmail(email: string): Promise<string | null> {
  try {
    const data = await attioFetch('/objects/people/records/query', {
      method: 'POST',
      body: JSON.stringify({
        filter: {
          email_addresses: { email_address: email },
        },
        limit: 1,
      }),
    })
    if (data.data && data.data.length > 0) {
      return data.data[0].id.record_id
    }
    return null
  } catch (err) {
    console.error('Attio findPersonByEmail failed:', err)
    return null
  }
}

interface PersonInput {
  name: string
  email: string
  phone?: string
}

async function upsertPerson(input: PersonInput): Promise<string | null> {
  const existingId = await findPersonByEmail(input.email)

  // Build name attribute — split if "First Last" format
  const nameParts = input.name.trim().split(/\s+/)
  const firstName = nameParts[0] || input.name
  const lastName = nameParts.slice(1).join(' ') || ''

  const values: Record<string, any> = {
    name: [{ first_name: firstName, last_name: lastName, full_name: input.name }],
    email_addresses: [{ email_address: input.email }],
  }
  if (input.phone) {
    values.phone_numbers = [{ original_phone_number: input.phone }]
  }

  if (existingId) {
    // Update existing — only update phone if not yet present
    try {
      await attioFetch(`/objects/people/records/${existingId}`, {
        method: 'PATCH',
        body: JSON.stringify({ data: { values } }),
      })
      return existingId
    } catch (err) {
      console.error('Attio update person failed:', err)
      return existingId  // Still return the ID so we can create list entry
    }
  } else {
    // Create new
    const createBody = JSON.stringify({ data: { values } })
    const data = await attioFetch('/objects/people/records', {
      method: 'POST',
      body: createBody,
    })
    return data.data?.id?.record_id || null
  }
}

// ----------------------------------------------------------------------------
// Lead pipeline list entry
// ----------------------------------------------------------------------------

export type LeadKanaal = 'brochure' | 'contact' | 'zakelijk' | 'open-dag'

interface LeadEntryInput {
  kanaal: LeadKanaal
  // Optional fields
  eventdatum?: string // ISO date (YYYY-MM-DD)
  aantalPersonen?: number
  geschatteWaarde?: number // in euros
  opmerkingen?: string
  klantgroep?: 'b2c-villa-bruiloften' | 'b2b-villa'
  tijdslot?: string // "11:00" formaat — wordt geconverteerd naar status
  deelnameEvent?: 'open-trouw-28-6-26'
  naamPartner?: string
}

async function createLeadPipelineEntry(personId: string, input: LeadEntryInput): Promise<void> {
  const kanaalId = {
    'brochure': KANAAL.TROUWBROCHURE,
    'contact': KANAAL.CONTACT,
    'zakelijk': KANAAL.ZAKELIJK,
    'open-dag': KANAAL.OPEN_DAG,
  }[input.kanaal]

  const entryValues: Record<string, any> = {
    kanaal: kanaalId,
    test: LEAD_STATUS.NIEUW, // Lead Status (api_slug is "test")
    datum_binnenkomst: new Date().toISOString().slice(0, 10),
  }

  if (input.klantgroep) {
    entryValues.klantgroep = input.klantgroep === 'b2c-villa-bruiloften'
      ? KLANTGROEP.B2C_VILLA_BRUILOFTEN
      : KLANTGROEP.B2B_VILLA
  }

  if (input.eventdatum) {
    entryValues.eventdatum = input.eventdatum
  }

  if (input.aantalPersonen) {
    entryValues.aantal_personen = input.aantalPersonen
  }

  if (input.geschatteWaarde) {
    entryValues.geschatte_waarde = {
      currency_value: input.geschatteWaarde,
      currency_code: 'EUR',
    }
  }

  if (input.opmerkingen) {
    entryValues.opmerkingen = input.opmerkingen
  }

  if (input.tijdslot) {
    const hour = parseInt(input.tijdslot.split(':')[0], 10)
    const tijdsblokId = TIJDSBLOK_BY_HOUR[hour]
    if (tijdsblokId) entryValues.tijdsblok = tijdsblokId
  }

  if (input.deelnameEvent === 'open-trouw-28-6-26') {
    entryValues.deelname_event = [DEELNAME_EVENT.OPEN_TROUW_28_6_26]
  }

  if (input.naamPartner) {
    entryValues.naam_partner = input.naamPartner
  }

  await attioFetch(`/lists/${LEAD_PIPELINE_LIST_ID}/entries`, {
    method: 'POST',
    body: JSON.stringify({
      data: {
        parent_record_id: personId,
        parent_object: 'people',
        entry_values: entryValues,
      },
    }),
  })
}

// ----------------------------------------------------------------------------
// Public API — single-call functie voor in route handlers
// ----------------------------------------------------------------------------

export interface UpsertLeadInput {
  // Person
  name: string
  email: string
  phone?: string

  // Lead entry
  kanaal: LeadKanaal
  eventdatum?: string
  aantalPersonen?: number
  geschatteWaarde?: number
  opmerkingen?: string
  klantgroep?: 'b2c-villa-bruiloften' | 'b2b-villa'
  tijdslot?: string
  deelnameEvent?: 'open-trouw-28-6-26'
  naamPartner?: string
}

/**
 * Upsert person op email en voeg toe aan Lead pipeline list met form-data.
 * Throws een Error bij failure — caller handelt dit non-fatal af.
 */
export async function upsertLead(input: UpsertLeadInput): Promise<void> {
  if (!process.env.ATTIO_API_KEY) {
    console.log('Attio: ATTIO_API_KEY not set, skipping')
    return
  }

  const personId = await upsertPerson({
    name: input.name,
    email: input.email,
    phone: input.phone,
  })
  if (!personId) {
    throw new Error('Attio upsertLead: no person ID returned')
  }

  await createLeadPipelineEntry(personId, {
    kanaal: input.kanaal,
    eventdatum: input.eventdatum,
    aantalPersonen: input.aantalPersonen,
    geschatteWaarde: input.geschatteWaarde,
    opmerkingen: input.opmerkingen,
    klantgroep: input.klantgroep,
    tijdslot: input.tijdslot,
    deelnameEvent: input.deelnameEvent,
    naamPartner: input.naamPartner,
  })
}
