import { fireStoreDB } from '@/firebase.config'
import { getAuth } from '@clerk/nextjs/server'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const addToOrders = async metadata => {
  const orders = await JSON.parse(metadata.orders)
  let userId = metadata.userId

  console.log(metadata)
  for (const order of orders) {
    await addDoc(collection(fireStoreDB, `users/${userId}/orders`), {
      prod_id: order?.id,
      prod_price: order?.price,
      prod_quantity: order?.quantity
    })

    await deleteDoc(doc(fireStoreDB, `users/${userId}/cart/${order?.id}`))
  }
}

export async function POST (request) {
  //   request = await request.json()
  const headersList = headers()
  const sig = headersList.get('stripe-signature')

  const body = await request.text()
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
            // console.log(lineItems)
            addToOrders(session.metadata)
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
