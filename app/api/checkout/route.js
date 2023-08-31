import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST (request) {
  const stripeInstance = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

  request = await request.json()
  const products_refetched = []
  for (const product of request.products) {
    let product_refetched = await fetch(
      `https://fakestoreapi.com/products/${product.id}`
    )
    product_refetched = await product_refetched.json()
    products_refetched.push({ ...product, ...product_refetched })
  }

  const session = await stripeInstance.checkout.sessions.create({
    mode: 'payment',
    submit_type: 'pay',
    billing_address_collection: 'required',
    shipping_options: [{ shipping_rate: 'shr_1NkpxkSB7hQsCwxuNLmTYC5n' }],
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
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
    }))
  })

  return NextResponse.json({ url: session.url })
}
