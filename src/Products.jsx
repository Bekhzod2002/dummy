import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import { useEffect, useState } from 'react';
import { get } from 'jquery';

const baseUrl = "https://dummyjson.com/products/";

const Products = (props) => {
    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState('');
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(30);

    const getCategories = async () => {
        const response = await fetch(`${baseUrl}categories`);
        const data = await response.json();
        let categoriesData = [];
        for (let i = 0; i < data.length; i++) {
            const categoryTitle = data[i].charAt(0).toUpperCase() + data[i].slice(1);
            categoriesData.push({
                    id: i,
                    title: categoryTitle
                });
        }
        setCategories(categoriesData);
    }

    useEffect(() => {
        getCategories();
    }, [])

    const getProducts = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        const dataProducts = data.products;
        let arr = [];
        for (let i = 0; i < dataProducts.length; i++) {
            const p = dataProducts[i];
            arr.push(p);
        }
        setProducts(arr);
    }

        
    useEffect(() => {
        let url = baseUrl;
        if (categoryName != 'All' && categoryName != '') {
            url += `category/${categoryName}?limit=${limit}`;
            getProducts(url);
            console.log("categoryName");
            return;
        }

        if (props.searchedProductName) {
            const url = buildUrl(props.searchedProductName)
            getProducts(url);
        }
         
        else {
            const url = buildUrl();
            getProducts(url);
        }
    }, [props.searchedProductName, categoryName]);



    useEffect(() => {
        const url = buildUrl();
        getProducts(url)
    }, [limit])

    const buildUrl = (searchQuery) => {
        let url = baseUrl;
        if (searchQuery) {
            const searchUrl = `search?q=${props.searchedProductName}`;
            return url + searchUrl;
        } else {
            return url + "?limit=" + limit;
        }
    }

    const checkStockAvability = (inStock) => {
        if (inStock < 50) {
            return <span className='lowAvailbility'> {inStock} <i className="bi bi-reception-1"></i></span>
        } else if (inStock < 100) {
            return <span className='mediumAvailbility'> {inStock} <i className="bi bi-reception-2"></i></span>
        } else if (inStock < 300) {
            return <span className='goodAvailbility'> {inStock} <i className="bi bi-reception-3"></i></span>
        } else {
            return <span className='greatAvailbility'> {inStock} <i className="bi bi-reception-4"></i></span>
        }
    }


    return (
        <div className="container mt-5 d-flex row justify-content-center">
            <div className='limitSelectorContainer'>
            <div className='sortContainer'>
                    <label className="form-label">Category</label>
                        <select className="form-select productLimitSelectorContainer" onChange={(e) => setCategoryName(e.target.value)} >
                        <option defaultValue={"All"}> All </option>
                        {categories.length > 0 ? 
                        (
                        <>
                            {categories.map((category) => 
                                <option key={category.id} value={category.title}>{category.title}</option>
                        )}</>)
                        : 
                        (<option value={'placeholder'}>nie</option>)}
                        </select>
                </div>

                <div className='sortContainer'>
                    <label className="form-label">Sort by</label>
                    <select className="form-select productLimitSelectorContainer">
                        <option value={'placeholder'}>placeholder</option>
                    </select>
                </div>

                <div className='limitContainer'>
                    <label className="form-label">Items</label>
                    <select className="form-select productLimitSelectorContainer" onChange={(e) => setLimit(e.target.value)}>
                        <option defaultValue={30} disabled> -- </option>
                        <option value={1}>1</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                        <option value={80}>80</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
                {
                    products.length > 0 ? 
                    (
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                        {products.map((product) => (
                            <div key={product.id} className="col">
                                <div className="card h-100">
                                    <div className='card-body cardPriceContainer'>
                                        <div>
                                        <i className="bi bi-tags-fill"></i> Price: <span className='priceHolder'> {product.price} € </span> 
                                        </div>

                                        <div>
                                        <i class="bi bi-star-fill"></i> Rating: <span className='ratingHolder'> {product.rating} </span> 
                                        </div>
                                    

                                    </div>
                                    <img src={product.thumbnail} className="card-img-top" alt="..." />
                                        <div className="card-body pb-2">
                                            <h4 className="card-title">{product.title}</h4>
                                            <h5 className="card-title">{product.brand}</h5>
                                            <p className="card-text">{product.description}</p>
                                        </div>
                                    <div className="card-footer">
                                        <small className="text-body">Availability: </small> 
                                        {
                                            checkStockAvability(product.stock)
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    ) 
                    : 
                    (
                        <div className="alert alert-warning" role="alert">
                            We are sorry but we can't find any product by the phrase you provided - {props.searchedProductName}. Try again with another one.
                        </div>
                    )
                }
        </div>
    );
}

export default Products;