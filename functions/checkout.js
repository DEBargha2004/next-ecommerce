export const checkout = async ({ product, quantity, router, products }) => {
  let checkoutInfo = await fetch(`/api/checkout`, {
    method: 'POST',
    body: JSON.stringify({ products: products || [{ ...product, quantity }] })
  })

  try {
    checkoutInfo = await checkoutInfo.json()
    let url = checkoutInfo?.url
    url ? router.push(url) : null
  } catch (error) {
    console.error(error)
  }
}
