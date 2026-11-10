import React from 'react'
import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

const LABELS: Record<string, string> = {
  received: 'Received',
  in_progress: 'In progress',
  in_review: 'In review',
  delivered: 'Delivered',
}

interface Props {
  name?: string
  item?: string
  status?: string
  notes?: string
  deliveryUrl?: string
  orderCode?: string
}

const OrderStatusUpdate = ({ name, item, status, notes, deliveryUrl, orderCode }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`Your order is now ${LABELS[status ?? ''] ?? 'updated'}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>BLARK-WALTER DESIGNS</Text>
        <Heading style={h1}>Order update{name ? `, ${name}` : ''}</Heading>
        <Text style={text}>There's news on <b>{item || 'your order'}</b>.</Text>
        <Text style={badge}>{LABELS[status ?? ''] ?? 'Updated'}</Text>
        {notes ? <Text style={text}>{notes}</Text> : null}
        {deliveryUrl ? <Text style={row}><b>Link:</b> {deliveryUrl}</Text> : null}
        <Hr style={hr} />
        <Text style={row}><b>Order code:</b> {orderCode || '—'}</Text>
        <Button style={button} href="https://blarkwalterdesigns.com/track">Track your order</Button>
        <Text style={footer}>Questions? Reply on WhatsApp +234 810 269 2046</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OrderStatusUpdate,
  subject: (d: Record<string, any>) => `Your order is now ${LABELS[d.status] ?? 'updated'}`,
  displayName: 'Order status update',
  previewData: { name: 'Jane', item: 'Brand Identity – Starter', status: 'in_review', notes: 'First concepts are ready for review.', orderCode: 'BWD-ABC123' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '28px 25px', maxWidth: '560px' }
const brand = { color: '#E11D2E', fontWeight: 700, letterSpacing: '2px', fontSize: '12px' }
const h1 = { color: '#111111', fontSize: '24px', margin: '12px 0' }
const text = { color: '#333333', fontSize: '15px', lineHeight: '24px', whiteSpace: 'pre-line' as const }
const badge = { display: 'inline-block', backgroundColor: '#E11D2E', color: '#ffffff', borderRadius: '999px', padding: '6px 14px', fontSize: '13px', fontWeight: 700 }
const row = { color: '#111111', fontSize: '14px', margin: '6px 0' }
const hr = { borderColor: '#eeeeee', margin: '20px 0' }
const button = { backgroundColor: '#111111', color: '#ffffff', borderRadius: '999px', padding: '12px 22px', fontSize: '14px', fontWeight: 700, margin: '12px 0' }
const footer = { color: '#888888', fontSize: '12px' }
