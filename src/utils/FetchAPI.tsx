import { useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import style from '@/styles/fetchAPI.module.css'

// Interface for the data structure.
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

function Products () {
  const [ products, setProducts ] = useState<Product[]>([])
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);

  const fetchApiResponse = async () => {
    try {
      // ./database/product
      // https://dummyjson.com/products
      const res = await axios.get('https://dummyjson.com/products');
        setProducts(res.data.products);
        console.log(res.data.products);

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
    <div className=''>
      {products.map((product, index) => (
       <Card key={product.id} className='grid grid-cols-4 gap-4 p-4'>
          <CardHeader>
            <img src={product.images[0]} alt={product.title} />
            <CardTitle>{product.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{product.description}</CardDescription>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
          </CardContent>
          <CardFooter>
            <p>Reviews: {product.reviews}</p>
          </CardFooter>
          {/*Add a horizontal rule every second product card for better readability.*/}
          {index % 2 === 0 && <hr />}         
          {/* Add other styles or features as needed */}
       </Card>
      ))}
    </div>
  )
};

export default Products
