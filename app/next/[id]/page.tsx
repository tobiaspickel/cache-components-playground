import { Suspense } from 'react'
import { connection } from 'next/server'
import { cacheTag, cacheLife } from 'next/cache'


// adapted from https://nextjs.org/docs/app/api-reference/directives/use-cache-remote
// why is this line required? 
// without it the build fails for us it does not make sense and is not pointed out in the docs at all.
export const generateStaticParams = () => {
  return [{ id: "0" }]
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div>
      <ProductDetails id={id} />
      <Suspense fallback={<div>Loading price...</div>}>
        <ProductPrice productId={id} />
      </Suspense>
    </div>
  )
}

function ProductDetails({ id }: { id: string }) {
  return <div>Product: {id}</div>
}

async function ProductPrice({ productId }: { productId: string }) {
  // Calling connection() makes this component dynamic, preventing
  // it from being included in the static shell. This ensures the price
  // is always fetched at request time.
  await connection()

  // Now we can cache the price in a remote cache handler.
  // Regular 'use cache' would NOT work here because we're in a dynamic context.
  const price = await getProductPrice(productId)

  return <div>Price: ${price}</div>
}

async function getProductPrice(productId: string) {
  'use cache: remote'
  cacheTag(`product-price-${productId}`)
  cacheLife({ expire: 3600 }) // 1 hour

  const product = await fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
  // This database query is cached and shared across all users
  return product?.price ?? 0
}
