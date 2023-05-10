import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { getProductsById } from '../fetcher'
import styled from 'styled-components'

// import { CartContext } from '../Context/CartContext'

const ProductDetails = () => {
    const [product, setProduct] = useState({errorMessage: '',data:{}});
    const products = useParams();
    // const { addProduct } = useContext(CartContext);

    React.useEffect(()=>{
        const fetchData = async ()=> {
            const responseObject = await getProductsById(products.productsId);
            setProduct(responseObject);
        }
        fetchData();
    },[])

    const createMarkup = () => {
        return{ __html: product.data?.description }
    }    

  return (
    <article>
        <ProductTitle>
            {product.data.title}
        </ProductTitle>

        <figure>
            <ProductImageContainer>
                <ProductImage src={`/assets/${product.data.image}`} alt={product.data.title} />
            </ProductImageContainer>
        </figure>

        <aside>
            <div className='category-product-info-dimensions'>
                <ProductInfoHeader>Dimensions</ProductInfoHeader>
                <label>{product.data.specs?.dimensions}</label>
            </div>
            {product.data.specs?.capacity && 
                <div className='category-product-info-capacity'>
                    <ProductInfoHeader>Capacity</ProductInfoHeader>
                    <label>{product.data.specs?.capacity}</label>
                </div>
            }
            
            <ProductInfoFeatures>
                <ProductInfoHeader>Features</ProductInfoHeader>
                <ul>
                    {product.data.features?.map((f, i) => {return <ProductInfoFeatureList key={`feature${i}`}>{f}</ProductInfoFeatureList>})}
                </ul>            
            </ProductInfoFeatures>
            
        </aside>

        <aside className='category-product-finance'>
            <ProductInfoFinancePrice>
                &pound;{product.data.price}
            </ProductInfoFinancePrice>

            <ProductInfoStock className='category-product-info-stock'>
                <label>Stock Level: {product.data.stock} </label>
                <label>Free Delivery</label>
            </ProductInfoStock>
            <ProductInfoAction>
                {/* <ProductInfoActionButton onClick={() => addProduct({id:product.data.id,title:product.data.title,price:product.data.price})}>Add to Basket</ProductInfoActionButton> */}
                <ProductInfoActionButton>Add to Basket</ProductInfoActionButton>
            </ProductInfoAction>
        </aside>

        <ProductDescription dangerouslySetInnerHTML={createMarkup()}></ProductDescription>
    </article>
  )
}

export default ProductDetails;

const ProductDescription = styled.div`
    grid-column: 1 /span 3;
`

const ProductTitle = styled.div`
    grid-column: 1 /span 3;
    color: darkslategray;
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 10px;
`;

const ProductImageContainer = styled.div`
    padding: 10px;
    width: 60%;
`

const ProductImage = styled.img`
    width: 100%;
    height: 100%;
`

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`
const ProductInfoHeader = styled.h3`
    color: darkslategray;
    font-size: 1em;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 5px;
`
const ProductInfoFeatureList = styled.li`
    padding-top: 5px;
`
const ProductInfoStock = styled.div`
    padding-left: 10px;
    margin-top: 20px;
    padding-top: 10px;
    background-color: lightgrey;
    height: 20%;
    width: 30%;
    border-radius: 5px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
`

const ProductInfoAction = styled.div`
    margin-top: 10px;
    padding-top: 10px;
    height: 20%;
    width: 50%;
    border-radius: 5px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
`

const ProductInfoActionButton = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 8px;
`

const ProductInfoFeatures = styled.div`

`

const ProductInfoFinancePrice = styled.div`
    color: darkslategray;
    font-size: 3em;
    font-weight: bold;
    padding-top: 10px;
`