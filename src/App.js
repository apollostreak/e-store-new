import './App.css';
import React, { useState } from 'react';
import Category from './Components/Category';
import Category_Product from './Components/Category_Product';
import { getCategories, getProducts } from './fetcher';

function App() {
  //get the result from the json file
  const [categories, setCategories] = useState({errorMessage:'',data:[]});
  const [products, setProducts] = useState({errorMessage:'',data:[]});
  
  //usage of fetch API to get data from the json server to pull some dummy data
  React.useEffect(()=>{
    //inorder to asynchronously call the fetch API first and then return to the useEffect
    const fetchData = async() => {
      const responseObject = await getCategories();
      setCategories(responseObject);
    }
    fetchData();
  },[]) // the [] is done in order to perform fetch only once

  const handleCategoryClick = id => {
    
    const fetchData = async() => {
      const responseObject = await getProducts(id);
      setProducts(responseObject);
    }
    fetchData();

    // fetch('http://localhost:3001/products?catId='+id)
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
    //   setProducts(data);
    // });
  }

  const renderCategories = () => {
    //traverse through array and get the title of the categories
    return categories.data.map(c => 
        //key is required below in order to loop through the dynamic data
        <Category key = {c.id} id = {c.id} title = {c.title} onCategoryClick = {() => handleCategoryClick(c.id)}></Category>
      );

    //alternate to map
    // const categories = [];
    // for(let i = 0; i <= result.length; i++){
    //   categories.push(<Category key = {result[i].id} id = {result[i].id} title = {result[i].title}></Category>);
    // }
  }

  const renderProducts = () => {
    return products.data.map(d => 
        <Category_Product key={d.id} {...d}>{d.title}</Category_Product>
      );
  }
  return (
    <React.Fragment>
      <header>My Store</header>
      <section>
        <nav>
          {categories.errorMessage && <div>Error:{categories.errorMessage}</div>}
          {categories.data && renderCategories()}
        </nav>
        <article>
          <h1>Products</h1>
          {products.errorMessage && <div>Error:{products.errorMessage}</div>}
          {products.data && renderProducts()}
        </article>
      </section>
      <footer>Footer</footer>
    
      {/* <div className="App">
        
      </div> */}
    </React.Fragment>
  );
}

export default App;
