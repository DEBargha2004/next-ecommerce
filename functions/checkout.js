export const checkout = async ({ product, quantity, router, products }) => {
  let checkoutInfo = await fetch(`/api/checkout`, {
    method: 'POST',
    body: JSON.stringify({ products: products || [{ ...product, quantity }] })
  })

  const { url: checkoutUrl } = await checkoutInfo.json()
  router.push(checkoutUrl)
}
