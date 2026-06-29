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

    const webhookUrl = process.env.N8N_WEBOOK_URL || process.env.N8N_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('N8N webhook URL is not configured.')
      return NextResponse.json(
        { error: 'Server configuration error: webhook endpoint not set.' },
        { status: 500 }
      )
    }

    // Build payload depending on action
    const payload = {
      action: action === 'feedback' ? 'unsubscribe_feedback' : 'resubscribe',
      email: email || 'anonymous',
      reason: reason || '',
      details: details || '',
      submittedAt: new Date().toISOString(),
      source: 'NexusFlow AI Unsubscribe Page'
    }

    // Forward to n8n webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('n8n Webhook Error:', errText)
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
