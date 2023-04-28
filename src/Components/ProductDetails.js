import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductsById } from '../fetcher';

const ProductDetails = () => {
    const [product, setProduct] = useState({errorMessage: '',data:[]});
    const ProductId = useParams();

    React.useEffect(()=>{
        const fetchData = async ()=> {
            const responseObject = await getProductsById(ProductId.productsId);
            setProduct(responseObject);
        }
        fetchData();
    },[])

  return (
    <div>ProductDetails id:{ProductId.productsId} title:{product.data.title}</div>
  )
}

export default ProductDetails