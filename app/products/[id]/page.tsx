import { Suspense } from "react"
import { CrashClient } from "./crash-client"
import { Metadata } from "next";

const fetchProduct = async (id: string) => {
  "use cache"
  await new Promise(resolve => {
    setTimeout(() => {
      resolve("")
    }, 3000)
  })
  const product = await fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
  return product
}

export const generateMetadata = async ({ params }: { params: Promise<Record<string, string>> }): Promise<Metadata> => {
  const { id } = await params
  const product = await fetchProduct(id)
  return {
    title: product?.title,
  }
};

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
  const product = await fetchProduct(id)
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

