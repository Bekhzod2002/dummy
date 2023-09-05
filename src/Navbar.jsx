import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import logo from './logo.png'
import { useEffect, useState } from 'react';


const Navbar = ( {setSearchedProductName} ) => {
    
    const [productName, setProductName] = useState('');

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    }

    const clearProductName = () => {
       setSearchedProductName('');
    }

    return (
        <>
        <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary navbarWholeContainer">
            <div className="container navbarInsideContainer p-50">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation" onClick={() => clearProductName()}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#" onClick={() => clearProductName()}>
                    <img src={logo} alt="logo" width="35px" height="35px" className='logoContainer'/>
                    Dummy Products
                </a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" 
                            aria-current="page"
                            href="#"
                            onClick={() => clearProductName()}>
                            Products
                            </a>
                        </li>
                    </ul>
                    
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" 
                        type="search" 
                        placeholder="Search..." 
                        aria-label="Search" 
                        onChange={handleProductNameChange}/>
                        <button 
                        className="btn btn-outline-success" 
                        type="button"
                        onClick={() => setSearchedProductName(productName)}>
                        Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;