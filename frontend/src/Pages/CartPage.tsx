import Footer from "../components/Footer"
import Header from "../components/Header"
import './styles/cartPage.css';
import deleteIcon from '../assets/Vector.png';
import { Link } from "react-router-dom";
import useMenuStore from "../stores/cartStore";
import Counter from "../components/Counter";

function CartPage() {
    const cart = useMenuStore(state => state.cart);
    const totalPrice = useMenuStore(state => state.totalPrice());
    const removeFromCart = useMenuStore(state => state.removeFromCart);

    const removeItem = (itemSk: string) => {
        removeFromCart(itemSk);
    };

    return (
        <div className="cart__wrapper">
            <Header />
            <main className="cart">
                <h1 className="cart__title">Cart</h1>
                <section className="cart__item-container">
                    {cart.length > 0 ? (
                        cart.map(item => (
                            <section key={item.sk} className="cart__item">
                                <img className="cart__item-image" src={item.image} alt={item.name} />
                                <section className="cart__item-details">
                                    <h2 className="cart__item-title">{item.name}</h2>
                                    <section className="cart__item">
                                        <Counter item={item} />
                                        <button
                                            className="cart__item-delete"
                                            onClick={() => removeItem(item.sk)}
                                        >
                                            <img className="cart__item-delete-icon" src={deleteIcon} alt="Delete" />
                                        </button>
                                    </section>
                                    <span className="cart__description-price">
                                        <span className="cart__description-price-text">Price:</span> {item.price} SEK
                                    </span>
                                </section>
                            </section>
                        ))
                    ) : (
                        <p>Your cart is empty!</p>
                    )}
                </section>
                <span className="cart__divider"></span>
                <section className="cart__summmary">
                    <article className="cart__total">
                        <span className="cart__total-price">Totalt: {totalPrice} SEK</span>
                    </article>
                    <Link to="/order" className="cart__checkout">Checkout</Link>
                </section>
            </main>
            <Footer />
        </div>
    )
}
export default CartPage

/**
 * Författare: Najib
 *
 * en sida som visar varukorgen och möjlighet att ta bort varor från varukorgen
 * 
 * Edited: Diliara
 * La till en Link element för att navigera till OrderPage
 */

/** 
  * Författare: Lisa
  * Kopplar ihop CartPage med Zustand och våran Cart. Renderar ut på sidan så man ser Cart
  * Lagt in Counter-funktion och removeItem.
*/