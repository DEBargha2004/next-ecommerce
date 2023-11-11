import { fireStoreDB } from '@/firebase.config'
import { getAuth } from '@clerk/nextjs/server'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { buffer } from 'micro'

export const config = {
  api: {
    bodyParser: false
  }
}

const addToOrders = async (metadata, lineItems) => {
  const orders = await JSON.parse(metadata.orders)
  let userId = metadata.userId

  // console.log(metadata)
  let index = 0
  for (const order of lineItems) {
    await addDoc(collection(fireStoreDB, `users/${userId}/orders`), {
      prod_id: orders[index].id,
      prod_price: order?.amount_total / 100,
      prod_quantity: order?.quantity
    })

    await deleteDoc(doc(fireStoreDB, `users/${userId}/cart/${order?.id}`))
    index++
  }
}

export async function POST (request) {
  const body = await request.text()

  const headersList = headers()
  const sig = headersList.get('stripe-signature')
  // const body = request.body

  const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY)
  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.NEXT_STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: `got an error ${error.message}` })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100 },
        (err, lineItems) => {
          try {
            console.log(lineItems)
            addToOrders(session.metadata, lineItems.data)
          } catch (error) {
            console.error(error, err)
          }
        }
      )
      break

    default:
      console.log(event.type)
      break
  }

  return NextResponse.json({ status: 'Data received' })
}
