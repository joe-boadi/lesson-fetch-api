import { useState } from 'react'
import axios from 'axios'
// Interface for the data structure.
interface Product {
  id: number;
  title: string;
  images: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  reviews: number;
}

function Products () {
  const [ products, setProducts ] = useState<Product[]>([])
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);

  const fetchApiResponse = async () => {
    try {
      // https://dummyjson.com/products
      const res = await axios.get('./database/product');
        setProducts(res.data.products);

    } catch (err) { 
          console.error(err)
          setError("Failed to fetch products")

      } finally {
          setLoading(false)
        };
    }

  fetchApiResponse();
  
  if(loading) return <div>Loading...</div>;
  if(error) return <div>Error fetching data</div>

  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>
          <img src={product.images} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  )
};

export default Products
