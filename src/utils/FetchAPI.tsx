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
import styles from '@/styles/FetchAPI.module.css'
import Button from '@/styles/Button.module.css';
import { IoAdd } from 'react-icons/io5';

// Interface for the data structure.
interface Product {
  id: number;
  title: string;
  images: string[];
  thumbnail: string;
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
    <div className={`${styles.container} grid-rows-4`}>
      {products.map((product, index) => (
        <Suspense key={product.id}  fallback={loading}>
          <Card className={`${styles.card}`}>
            <CardHeader>
              <img src={product.images[0]} alt={product.title} width={210}/>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <CardDescription>{product.description}</CardDescription> */}
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Rating: {product.rating}</p>
            </CardContent>
            <CardFooter className={`${styles.thumbnail}`}>
              {/* <img src={product.thumbnail} alt='thumbnail'/> */}
              <button className={`${Button.buyBtn}`}>Add<IoAdd /></button>
            </CardFooter>
            {index % 2 === 0 && <hr />}
          </Card>
        </Suspense>
      ))}
  </div>
  )
};

export default Products;
