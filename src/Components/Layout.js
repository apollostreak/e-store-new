import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CartIcon, HomeIcon } from './Icons';
import Search from './Search';

const Layout = ({categories}) => {

    const renderCategories = () => {
        // //traverse through array and get the title of the categories 'Fridges'/'Kettles'/'Televisions'
        // return categories.data.map(c => 
        //     //key is required below in order to loop through the dynamic data
        //     <Category key = {c.id} id = {c.id} title = {c.title} onCategoryClick = {() => handleCategoryClick(c.id)}></Category>
        //   );
    
          return categories.data.map(c => 
            <li key = {c.id}>
                <Link to={`/categories/${c.id}`}>
                    {c.title}
                </Link>
            </li>
          );
    
        //alternate to map
        // const categories = [];
        // for(let i = 0; i <= result.length; i++){
        //   categories.push(<Category key = {result[i].id} id = {result[i].id} title = {result[i].title}></Category>);
        // }
    }

    return (
        <>
            <header>
                <div id='headerHomeIcon'>
                    <Link to={'/'}>
                        <HomeIcon width={40}></HomeIcon>
                    </Link>
                </div>
                <Search> </Search>
                <div id='headerTitle'>
                    My Store
                </div>
                <div id='headerCartIcon'>
                    <Link to={'/basket'}>
                        <CartIcon width={40}></CartIcon>
                    </Link>
                </div>
            </header>

            <section>
            <nav>
                {categories.errorMessage && <div>Error:{categories.errorMessage}</div>}
                <ul>
                    {categories.data && renderCategories()}
                </ul>
            </nav>

            <main>
                <Outlet />
            </main>
            </section>

            <footer><Link to={'/'}>Home</Link> | <Link to={'/basket'}>Basket</Link></footer>
        </>
    )
}

export default Layout