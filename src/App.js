import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from './Navbar.jsx'
import Products from './Products.jsx';
import './App.css'
import React, { useEffect, useState } from 'react';

const baseUrl = "https://dummyjson.com/products/";

const App = () => {
    const [searchedProductName, setSearchedProductName] = useState('');

    useEffect(() => {
    }, [])

    return (
        <div className='app'>
            <Navbar setSearchedProductName={setSearchedProductName} />

            <Products searchedProductName={searchedProductName}/>
        </div>
    )
}
export default App;