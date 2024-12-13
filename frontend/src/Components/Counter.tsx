import "./styles/counter.css"
import useMenuStore from "../stores/cartStore"
import { CartItem, CounterProps } from "../types/interfaces"

function Counter({ item }: CounterProps) {

    const cart = useMenuStore(state => state.cart);
    const setCart = useMenuStore(state => state.setCart);

    const decreaseQuantity = () => {
        if (item.qty > 1) {
            const updatedCart: CartItem[] = cart.map((cartItem) =>
                cartItem.name === item.name
                    ? { ...cartItem, qty: cartItem.qty - 1 }
                    : cartItem
            );
            setCart(updatedCart);
        } else {
            const updatedCart = cart.filter((cartItem) => cartItem.name !== item.name);
            setCart(updatedCart);
        }
    };

    const increaseQuantity = () => {
        const updatedCart = cart.map((cartItem) =>
            cartItem.name === item.name
                ? { ...cartItem, qty: cartItem.qty + 1 }
                : cartItem
        );
        setCart(updatedCart);
    };

    return (
        <article className="counter-container">
            <button
                className="decreaseCounter-btn"
                onClick={decreaseQuantity}
            >
                -
            </button>
            <p className="counter-qty">{item.qty}</p>
            <button
                className="increaseCounter-btn"
                onClick={increaseQuantity}
            >
                +
            </button>
        </article>
    );
}

export default Counter

// Författare Lisa
// Skapat och implementerat Counter-funktion kopplat till Cart
