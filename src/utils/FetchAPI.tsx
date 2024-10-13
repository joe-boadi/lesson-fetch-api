import { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UseLoadingStateSkeleton from '@/components/hooks/Loading';
import UseErrorLoading  from '@/components/hooks/ErrorLoading';

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
};

function Products () {
  const [ products, setProducts ] = useState<Product[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);

  const fetchApiResponse = async () => {
    try {
      // ./database/products
      // https://dummyjson.com/products
      const res = await axios.get('https://dummyjson.com/products');
        setProducts(res.data.products);
        console.log(res.data.products);
    } catch (err) { 
          console.error(err)
          setError("Failed to fetch products")
      } finally {
          setLoading(false);
        };
  }

  useEffect(() =>{
    fetchApiResponse(); // This useEffect will run only once when the component mounts and will clean up when the component unmounts.
  },[])

  if(loading) return < UseLoadingStateSkeleton />;
  if(error) return < UseErrorLoading />;

  return (
    <>
      {products.map((product, index) => (
        <Suspense key={product.id} fallback={loading}>
          <Card className='grid grid-cols-4 gap-4 p-4'>
            <CardHeader>
              <img src={product.images[0]} alt={product.title} width={210}/>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <CardDescription>{product.description}</CardDescription> */}
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Rating: {product.rating}</p>
            </CardContent>
            {/* You can include the id if you want it displayed */}
            <CardFooter>
              <p>Product ID: {product.id}</p>
            </CardFooter>
            {index % 2 === 0 && <hr />}
          </Card>
        </Suspense>
      ))}
  </>
  )
};
export default Products;
