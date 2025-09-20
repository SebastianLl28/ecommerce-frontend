import { useGetProducts } from "../hooks"

const ProductsPage = () => {

  const { data, isLoading, error, isSuccess } = useGetProducts()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {isSuccess && data.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default ProductsPage
