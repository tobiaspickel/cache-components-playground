import { Suspense } from "react"
import { CrashClient } from "./crash-client"



export default async function ProductDetailPage({ params }: { params: Promise<Record<string, string>> }) {
  return (
    <Suspense>
      <ProductPage params={params} />
      <CrashClient />
    </Suspense>
  )
}

const ProductPage = async ({ params }: { params: Promise<Record<string, string>> }) => {
  "use cache"
  const { id } = await params
  const product = await fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
  return (
    <div>
      {id}
      <pre>
        {JSON.stringify(product)}
      </pre>
      <h1>{product?.title}</h1>
      <h2>{product?.price}</h2>
    </div>
  )

}

