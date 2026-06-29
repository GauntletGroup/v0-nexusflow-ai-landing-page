import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, email, reason, details } = body

    if (!action || !['feedback', 'resubscribe'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid or missing action field.' },
        { status: 400 }
      )
    }

    const webhookUrl = process.env.N8N_UNSUBSCRIBE_WEBHOOK_URL || process.env.N8N_WEBOOK_URL || process.env.N8N_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('N8N unsubscribe webhook URL is not configured.')
      return NextResponse.json(
        { error: 'Server configuration error: unsubscribe webhook endpoint not set.' },
        { status: 500 }
      )
    }

    // Build the query parameters for the GET request to n8n
    const queryParams = new URLSearchParams({
      action: action === 'feedback' ? 'unsubscribe_feedback' : 'resubscribe',
      email: email || 'anonymous',
      reason: reason || '',
      details: details || '',
      submittedAt: new Date().toISOString(),
      source: 'NexusFlow AI Unsubscribe Page'
    })

    // Construct the final URL with query parameters
    const separator = webhookUrl.includes('?') ? '&' : '?'
    const finalWebhookUrl = `${webhookUrl}${separator}${queryParams.toString()}`

    // Send data to n8n unsubscribe webhook as a GET request
    const response = await fetch(finalWebhookUrl, {
      method: 'GET',
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('n8n Unsubscribe Webhook Error:', errText)
      return NextResponse.json(
        { error: `n8n webhook error: ${response.status} ${response.statusText}` },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('Error in api/unsubscribe:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
