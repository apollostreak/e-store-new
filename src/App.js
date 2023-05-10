import React, { useState } from 'react';
import './App.css';
import { getCategories, getProducts } from './fetcher';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from './Components/ProductDetails';
import Checkout from './Components/Checkout';
import Basket from './Components/Basket';
import Category from './Components/Category';
import Layout from './Components/Layout';
import Home from './Components/Home';
import OrderConfirmation from './Components/OrderConfirmation';
import SearchResults from './Components/SearchResults';

function App() {
  //get the result from the json file
  const [categories, setCategories] = useState({errorMessage:'',data:[]});
  // const [products, setProducts] = useState({errorMessage:'',data:[]});
  
  //usage of fetch API to get data from the json server to pull some dummy data
  React.useEffect(()=>{
    //inorder to asynchronously call the fetch API first and then return to the useEffect
    const fetchData = async() => {
      const responseObject = await getCategories();
      setCategories(responseObject);
    }
    fetchData();
  },[]); // the [] is done in order to perform fetch only once

  // const handleCategoryClick = id => {
    
  //   const fetchData = async() => {
  //     const responseObject = await getProducts(id);
  //     setProducts(responseObject);
  //   }
  //   fetchData();

  //   // fetch('http://localhost:3001/products?catId='+id)
  //   // .then(response => response.json())
  //   // .then(data => {
  //   //   console.log(data);
  //   //   setProducts(data);
  //   // });
  // }

  const router = createBrowserRouter([
    { path:'/', element: (<Layout categories={categories}/>), children:[
      { index: true, element:(<Home />) },
      { path:'basket', element:(<Basket />) },
      { path:'checkout', element:(<Checkout />) },
      { path:'orderconfirm', element:(<OrderConfirmation />) },
      { path:'search', element:(<SearchResults />)},
      { path:'categories/:categoryId', element:(<Category />)},
      { path:'products/:productsId', element:(<ProductDetails />) }
    ]}
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
