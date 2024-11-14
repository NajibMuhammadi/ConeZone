import Footer from "../components/Footer"
import Header from "../components/Header"

import './styles/cartPage.css';

import icecreamImage from '../assets/ice cream.jpg';
import deleteIcon from '../assets/Vector.png';
import { Link } from "react-router-dom";

function BasketPage() {
    return (
        <div className="cart__wrapper">
            <Header/>
            <main className="cart">
                <h1 className="cart__title">Cart</h1>
                <span className="cart__divider"></span>
                <section className="cart__item-container">
                    <img className="cart__item-image" src={icecreamImage} alt="Ice Cream" />
                    <section className="cart__item-details">
                            <h2 className="cart__item-title">Ice Cream</h2>
                        <section className="cart__item">
                            <div className="cart__item-quantity">
                                <button className="cart__item-decrease">-</button>
                                <span className="cart__item-quantity-value">1</span>
                                <button className="cart__item-increase">+</button>
                            </div>
                            <button className="cart__item-delete">
                                <img className="cart__item-delete-icon" src={deleteIcon} alt="Delete" />
                            </button>   
                        </section>
                        <span className="cart__description-price"><span className="cart__description-price-text">Price:</span> 50 Sek</span>
                    </section>
                    
                </section>
                <span className="cart__divider"></span>
                <section className="cart__summmary">
                    <article className="cart__total">
                        <span className="cart__total-text">Total</span>
                        <span className="cart__total-price">50 Sek</span>
                    </article>
                    <Link to="/order" className="cart__checkout">Checkout</Link>
                </section>
                
            </main>
            <Footer/>
        </div>
    )
}  
export default BasketPage

/**
 * Författare: Najib
 * en sida som visar varukorgen och möjlighet att ta bort varor från varukorgen
 * 
 * Edited: Diliara
 * La till en Link element för att navigera till OrderPage
 */