import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { CartContext } from '../Context/CartContext';

const Category_Product = ({
    id,
    title,
    image,
    specs,
    features,
    price,
    stock
    }) => {

    const navigate = useNavigate();
    const { addProduct } = useContext(CartContext);

  return (
    <ProductInfoArticle>

        <ProductTitle> 
            <Link to={`/products/${id}`}>{title}</Link> 
        </ProductTitle>

        <figure>
            <ProductImageContainer>
                <ProductImage src={`/assets/${image}`} alt={title} />
            </ProductImageContainer>
        </figure>

        <aside>
            <ProductInfo>
                <ProductInfoHeader>Dimensions</ProductInfoHeader>
                <label>{specs.dimensions}</label>
            </ProductInfo>

            {specs.capacity && (
            <ProductInfo>
                <ProductInfoHeader>Capacity</ProductInfoHeader>
                <label>{specs.capacity}</label>
            </ProductInfo>
            )}

            <ProductInfo>
                <ProductInfoHeader>Features</ProductInfoHeader>
                <ul>
                    {features?.map((featureIndexValue, featureIndex) => { return   <ProductInfoFeatureList key={`feature${featureIndex}`}> {featureIndexValue} </ProductInfoFeatureList> })}
                </ul>
            </ProductInfo>
        </aside>

        <aside>
            <ProductInfoFinancePrice>
                &pound;{price}
            </ProductInfoFinancePrice>

            <ProductInfoStock>
                <ProductInfoStockLabel> Stock Level: {stock} </ProductInfoStockLabel>
                <ProductInfoStockLabel> Free Delivery </ProductInfoStockLabel>
            </ProductInfoStock>

            <ProductInfoAction>
                <ProductInfoActionButton onClick={() => navigate(`/products/${id}`)}> View Products </ProductInfoActionButton>
                <ProductInfoActionButton onClick={() => addProduct({id,title,price})}> Add to Basket </ProductInfoActionButton>
            </ProductInfoAction>
        </aside>

    </ProductInfoArticle>
  );
};

export default Category_Product;

const ProductInfoArticle = styled.article`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 0.25fr 1fr 0.25fr;
    column-gap: 20px;
`;

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
`;

const ProductImage = styled.img`
    width: 100%;
    height: 100%;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`;
const ProductInfoHeader = styled.h3`
    color: darkslategray;
    font-size: 1em;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 5px;
`;
const ProductInfoFeatureList = styled.li`
    padding-top: 5px;
`;
const ProductInfoStock = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 20px;
    padding-top: 10px;
    background-color: lightgrey;
    height: 25%;
    width: 50%;
    border: 2px solid black;
    border-radius: 5px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
`;
const ProductInfoStockLabel = styled.label`
    padding-bottom: 5px;
`;
const ProductInfoAction = styled.div`
    margin-top: 10px;
    padding-top: 10px;
    height: 20%;
    width: 50%;
    border-radius: 5px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
`;

const ProductInfoActionButton = styled.button`
    font-size: 10px;
    font-weight: bold;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 8px;
`;

const ProductInfoFeatures = styled.div`

`;

const ProductInfoFinancePrice = styled.div`
    color: darkslategray;
    font-size: 2em;
    font-weight: bold;
    padding-top: 10px;
`;
