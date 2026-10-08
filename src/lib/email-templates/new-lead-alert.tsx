import React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  subject?: string
  message?: string
  plan?: string
}

const NewLeadAlert = ({ name, email, subject, message, plan }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New message from {name || 'a website visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>BLARK-WALTER DESIGNS · NEW LEAD</Text>
        <Heading style={h1}>New contact form message</Heading>
        <Text style={row}><b>Name:</b> {name || '—'}</Text>
        <Text style={row}><b>Email:</b> {email || '—'}</Text>
        {subject ? <Text style={row}><b>Subject:</b> {subject}</Text> : null}
        {plan ? <Text style={row}><b>Plan:</b> {plan}</Text> : null}
        <Hr style={hr} />
        <Text style={quote}>{message || '(no message)'}</Text>
        <Hr style={hr} />
        <Text style={footer}>Reply directly to {email || 'the sender'} to follow up.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewLeadAlert,
  subject: (d: Record<string, any>) => `New lead: ${d.name ?? 'Website visitor'}${d.subject ? ` – ${d.subject}` : ''}`,
  displayName: 'New lead alert (to owner)',
  to: 'blarkwalterdesigns@gmail.com',
  previewData: { name: 'Jane', email: 'jane@example.com', subject: 'New website', message: 'Hi, I need a portfolio site.' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '28px 25px', maxWidth: '560px' }
const brand = { color: '#E11D2E', fontWeight: 700, letterSpacing: '2px', fontSize: '12px' }
const h1 = { color: '#111111', fontSize: '22px', margin: '12px 0' }
const row = { color: '#111111', fontSize: '14px', margin: '6px 0' }
const quote = { color: '#333333', fontSize: '14px', lineHeight: '22px', borderLeft: '3px solid #E11D2E', paddingLeft: '12px', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#eeeeee', margin: '20px 0' }
const footer = { color: '#888888', fontSize: '12px' }
