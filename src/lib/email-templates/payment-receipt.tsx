import React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  item?: string
  amount?: string
  reference?: string
  isTemplate?: boolean
}

const PaymentReceipt = ({ name, item, amount, reference, isTemplate }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your payment receipt from Blark-Walter Designs</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>BLARK-WALTER DESIGNS</Text>
        <Heading style={h1}>Payment received{name ? `, ${name}` : ''}</Heading>
        <Text style={text}>Thank you for your purchase. Here are your receipt details:</Text>
        <Hr style={hr} />
        <Text style={row}><b>Item:</b> {item || 'Purchase'}</Text>
        <Text style={row}><b>Amount paid:</b> {amount || '—'}</Text>
        <Text style={row}><b>Reference:</b> {reference || '—'}</Text>
        <Hr style={hr} />
        <Text style={text}>
          {isTemplate
            ? "I'll send your template files to this email address shortly."
            : "I'll be in touch shortly to kick off your subscription."}
        </Text>
        <Text style={footer}>Questions? Reply on WhatsApp +234 810 269 2046</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PaymentReceipt,
  subject: (d: Record<string, any>) => `Receipt: ${d.item ?? 'your purchase'}`,
  displayName: 'Payment receipt',
  previewData: { name: 'Jane', item: 'Brand Identity – Starter', amount: '₦160,000', reference: 'PSK_123', isTemplate: false },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '28px 25px', maxWidth: '560px' }
const brand = { color: '#E11D2E', fontWeight: 700, letterSpacing: '2px', fontSize: '12px' }
const h1 = { color: '#111111', fontSize: '24px', margin: '12px 0' }
const text = { color: '#333333', fontSize: '15px', lineHeight: '24px' }
const row = { color: '#111111', fontSize: '14px', margin: '6px 0' }
const hr = { borderColor: '#eeeeee', margin: '20px 0' }
const footer = { color: '#888888', fontSize: '12px' }
