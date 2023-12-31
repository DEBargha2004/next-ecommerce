import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

export async function POST (request) {
  const headersList = headers()
  const origin = headersList.get('origin')

  const stripeInstance = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY)

  let userId = getAuth(request).userId
  if (!userId) {
    return NextResponse.json({
      data: 'You are not authorized'
    })
  }
  request = await request.json()

  const products_refetched = []
  for (const product of request.products) {
    let product_refetched = await fetch(
      `https://fakestoreapi.com/products/${product.id}`
    )
    product_refetched = await product_refetched.json()
    products_refetched.push({ ...product, ...product_refetched })
  }

  let processed_productInfo = products_refetched.map(productInfo => ({
    id: productInfo.id,
    quantity: productInfo.quantity,
    price: productInfo.price
  }))

  const session = await stripeInstance.checkout.sessions.create({
    mode: 'payment',
    submit_type: 'pay',
    billing_address_collection: 'required',
    shipping_options: [{ shipping_rate: 'shr_1NkpxkSB7hQsCwxuNLmTYC5n' }],
    success_url: `${origin}/success`,
    cancel_url: `${origin}/cancel`,
    line_items: products_refetched?.map(product => ({
      price_data: {
        currency: 'INR',
        product_data: {
          name: product.title,
          description: product.description,
          images: [product.image]
        },
        unit_amount: product.price * 100
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 1
      },
      quantity: product.quantity
    })),
    metadata: {
      orders: JSON.stringify(processed_productInfo),
      userId
    }
  })

  return NextResponse.json({ url: session.url })
}
