import React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  subject?: string
  message?: string
}

const ContactConfirmation = ({ name, subject, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for reaching out to Blark-Walter Designs</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>BLARK-WALTER DESIGNS</Text>
        <Heading style={h1}>{name ? `Thanks, ${name}!` : 'Thanks for reaching out!'}</Heading>
        <Text style={text}>
          I've received your message and will get back to you within 1–2 business days.
        </Text>
        {(subject || message) && (
          <>
            <Hr style={hr} />
            {subject ? <Text style={label}>Subject: {subject}</Text> : null}
            {message ? <Text style={quote}>{message}</Text> : null}
          </>
        )}
        <Hr style={hr} />
        <Text style={footer}>Clyde Walter · Blark-Walter Designs · WhatsApp +234 810 269 2046</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmation,
  subject: 'We received your message',
  displayName: 'Contact form confirmation',
  previewData: { name: 'Jane', subject: 'New website', message: 'Hi, I need a portfolio site.' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '28px 25px', maxWidth: '560px' }
const brand = { color: '#E11D2E', fontWeight: 700, letterSpacing: '2px', fontSize: '12px' }
const h1 = { color: '#111111', fontSize: '24px', margin: '12px 0' }
const text = { color: '#333333', fontSize: '15px', lineHeight: '24px' }
const label = { color: '#111111', fontSize: '14px', fontWeight: 700 }
const quote = { color: '#555555', fontSize: '14px', lineHeight: '22px', borderLeft: '3px solid #E11D2E', paddingLeft: '12px', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#eeeeee', margin: '20px 0' }
const footer = { color: '#888888', fontSize: '12px' }
