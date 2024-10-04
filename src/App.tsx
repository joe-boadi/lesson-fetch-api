
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

// Interface for the project structure.
interface Product {
  id: number;
  title: string;
  images: string[];
  price: number;
  description: string;
  category: string;
  rating: number;
  reviews: number;
}

function App() {

  const [ products, setProducts ] = useState<Product[]>([])
  const [ loading, setLoading ] = useState(true);
  const [error, setError ] = useState<string | null>(null);

  useEffect(() => {

    // https://dummyjson.com/docs/products
    // ./database/product.json

    axios.get<{products: Product[]}>('https://dummyjson.com/docs/products')
    .then((res) => {
      setProducts(res.data.products);

      // Verify data is valid
      console.log(setProducts.length, res.data.products[0]);
    
    }).catch( err => { 
        console.error(err)
        setLoading(false)
        setError("Failed to fetch products")
      });
  }, [])

  if(loading) return <div>Loading</div>
  if(error) return <div>Error: {error}</div>

  return (
    <>
      <div>
        {products.length > 0 ? (products.map( (product, index) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <img src={product.images[index]} alt={product.title} />
            <p>{product.price}</p>
          </div>)
        )) : (
          <div>No products found...</div>
        )}
      </div>
    </>
  )
}

export default App
