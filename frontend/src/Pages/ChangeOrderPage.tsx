import './styles/changeOrderPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchOrder } from '../services/fetchOrder';
import fetchOrders from '../services/fetchOrders';
import { Order } from '../types/interfaces';
import { updateOrder } from '../services/updateOrder';
import { deleteOrder } from '../services/deleteOrder';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ChangeOrderPage() {
    const navigate = useNavigate();
    const { pk, sk } = useParams<{ pk?: string; sk: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState<string>(pk || 'guest');
    const [storedPk, setStoredPk] = useState<string | null>(null);
    const [pkReady, setPkReady] = useState<boolean>(false);
    const [paymentMethodImg, setPaymentMethodImg] = useState<string>('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decoded: { isAdmin: boolean, username: string } = jwtDecode(token);
                if (decoded.isAdmin) {
                    setUsername('admin');
                } else if (pk === 'guest') {
                    setUsername(decoded.username);
                    navigate(`/order/${decoded.username}/${sk}`, { replace: true });
                } else {
                    setUsername(pk || 'guest');
                }
                setIsAdmin(decoded.isAdmin);
                console.log('Decoded token:', decoded);
                setPkReady(true);
            } catch (err) {
                console.error('Error parsing token:', err);
            }
        } else {
            setPkReady(true);
        }
    }, [pk, sk, navigate]);

    useEffect(() => {
        const loadOrder = async (): Promise<void> => {
            if (!pkReady) {
                console.log('pk is still guest or not ready, waiting for it to be set...');
                return;
            }
            try {
                let fetchedOrder;
                if (isAdmin) {
                    const orders = await fetchOrders();
                    fetchedOrder = orders.find(order => order.sk === sk);
                    if (!fetchedOrder) {
                        throw new Error('Order not found');
                    }
                    setStoredPk(fetchedOrder.pk || null);
                } else {
                    const fetchPk = username;
                    console.log('Fetching order with pk:', fetchPk, 'and sk:', sk);
                    fetchedOrder = await fetchOrder('ordersUrl', fetchPk, sk as string);
                }
                setOrder(fetchedOrder);
                setTotalPrice(fetchedOrder.totalPrice);
                setPaymentMethodImg(`../../src/assets/${fetchedOrder.paymentMethod}.svg`);
                console.log('Fetched order:', fetchedOrder);
            } catch (error) {
                console.error('Error fetching order', error);
            } finally {
                setLoading(false);
            }
        };
        if (pkReady && sk) {
            loadOrder();
        }
    }, [pkReady, username, sk, isAdmin]);

    useEffect(() => {
        if (order) {
            const newPrice = order.items.reduce((total, item) => total + item.price * item.qty, 0);
            setTotalPrice(newPrice);
            console.log('New total price:', newPrice);
        }
    }, [order]);

    const handleCustomerDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (order) {
            const { name, value } = e.target;
            setOrder({
                ...order,
                customerDetails: {
                    ...order.customerDetails,
                    [name]: value,
                },
            });
        }
    };

    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (order) {
            const newMethod = e.target.value;
            setOrder({
                ...order,
                paymentMethod: newMethod,
            });
            setPaymentMethodImg(`../../src/assets/${newMethod}.svg`);
        }
    };

    const adminButton = () => {
        navigate('/kitchenview');
    };

    if (loading) {
        return <p>Waiting....</p>;
    }

    if (!order) {
        return <p>No order found</p>;
    }

    const items = order.items;

    const decreaseQuantity = (id: string, qty: number) => {
        updateItemQuantity(id, qty - 1);
        console.log('Decreased quantity:', id, qty);
    };

    const increaseQuantity = (id: string, qty: number) => {
        updateItemQuantity(id, qty + 1);
    };

    const updateItemQuantity = (itemId: string, newQty: number) => {
        const updatedOrder = order.items
            .map(item => {
                if (item.sk === itemId) {
                    return { ...item, qty: newQty };
                }
                return item;
            })
            .filter(item => item.qty >= 1);
        setOrder({ ...order, items: updatedOrder });
        console.log('Updated order:', updatedOrder);
    };

    const sendChangedOrder = async () => {
        let newOrder = {
            sk: sk,
            items: items,
            customerDetails: order.customerDetails,
            paymentMethod: order.paymentMethod,
            totalPrice: totalPrice
        };
        const pkToUse = isAdmin ? (storedPk || 'guest') : username;
        console.log('sendChangedOrder is clicked', pkToUse, sk, newOrder);
        if (items.length === 0) {
            const response = await deleteOrder('ordersUrl', pkToUse, sk as string);
            if (!response) {
                setErrorMsg('You can not delete an order that has been approved');
            }
            if (response) {
                setSuccessMsg('Order deleted');
            }
        } else {
            const response = await updateOrder('ordersUrl', pkToUse, sk as string, newOrder);
            if (!response) {
                setSuccessMsg('');
                setErrorMsg('You can not change an order that has been approved');
            } else {
                setSuccessMsg('Order updated successfully!');
            }
        }
    };

    const backToOrderStatus = () => {
        navigate('/order', { state: { slideIndex: 3, sk: sk } });
    };

    return (
        <>
            <Header />
            <section className="changeOrderPage__wrapper">
                <section>
                    <article className="changeOrderPage">
                        <h2 className="changeOrderPage__heading">Overview</h2>
                        <hr className="changeOrderPage__line" />
                        {/* Customer Details */}
                        <section>
                            <section className="changeOrderPage__customer-container-top">
                                <h3 className="changeOrderPage__customer">Customer</h3>
                                <section className="changeOrderPage__input">
                                    <label>
                                        <strong>Name:</strong>
                                        <input
                                            type="text"
                                            name="name"
                                            value={order.customerDetails.name}
                                            onChange={handleCustomerDetailsChange}
                                        />
                                    </label>
                                    <label>
                                        <strong>Phone number:</strong>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={order.customerDetails.phone}
                                            onChange={handleCustomerDetailsChange}
                                        />
                                    </label>
                                    <label>
                                        <strong>Email:</strong>
                                        <input
                                            type="email"
                                            name="email"
                                            value={order.customerDetails.email}
                                            onChange={handleCustomerDetailsChange}
                                        />
                                    </label>
                                </section>
                            </section>
                        </section>
                        <hr className="changeOrderPage__line" />
                        {/* Cart */}
                        <section className="changeOrderPage__product-wrapper">
                            <h3 className="changeOrderPage__customer">Cart</h3>
                            {items.map((item) => (
                                <section className="changeOrderPage__product" key={item.sk}>
                                    <img src={item.image} alt={item.name} className="changeOrderPage__img" />
                                    <section className="changeOrderPage__info-wrapper">
                                        <section className="changeOrderPage__info">
                                            <h4 className="overview__product-name">Product: {item.name}</h4>
                                            <article className="changeOrderPage__counter-container">
                                                <button className="decreaseCounter-btn" onClick={() => decreaseQuantity(item.sk, item.qty)}>-</button>
                                                <p className="counter-qty">{item.qty}</p>
                                                <button className="increaseCounter-btn" onClick={() => increaseQuantity(item.sk, item.qty)}>+</button>
                                            </article>
                                        </section>
                                    </section>
                                </section>
                            ))}
                        </section>
                        <hr className="changeOrderPage__line" />

                        {/* Payment Method  */}
                        <section className="changeOrderPage__payment-wrapper">
                            <h3 className="changeOrderPage__customer">Choosen payment method</h3>
                            <section className="changeOrderPage__payment">
                                <select
                                    value={order.paymentMethod}
                                    onChange={handlePaymentMethodChange}
                                >
                                    <option value="Card">Card</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Swish">Swish</option>
                                    <option value="Klarna">Klarna</option>
                                </select>
                                {paymentMethodImg && (
                                    <img
                                        src={paymentMethodImg}
                                        alt={order.paymentMethod}
                                        className="changeOrderPage__method-img"
                                    />
                                )}
                            </section>
                        </section>
                        <hr className="changeOrderPage__line" />
                        <section className="changeOrderPage__total">
                            <p className="changeOrderPage__total-price">Total: <strong> {totalPrice} sek</strong></p>
                            {errorMsg && <p className="changeOrderPage__errormsg">{errorMsg}</p>}
                            {successMsg && <p className="changeOrderPage__successmsg">{successMsg}</p>}
                            <button
                                className="changeOrderPage__submit"
                                onClick={sendChangedOrder}
                            >Change Order</button>
                            {isAdmin && (
                                <button
                                    className="changeOrderPage__submit changeOrderPage__submit-green"
                                    onClick={adminButton}>
                                    Go back to kitchenView
                                </button>
                            )}
                            <button
                                className="changeOrderPage__submit-white"
                                onClick={backToOrderStatus}
                            >Back To Order Status</button>
                        </section>
                    </article>
                </section>
            </section>
            <Footer />
        </>
    );
}

export default ChangeOrderPage;

/**
 * Författare Lisa och Ida
 * Vi hämtar alla ordrar, skriver ut dem på sidan. 
 * Skapar funktioner för att justera kvantiteten och tar bort objektet om den går under ett
 * Skapar en funktion för att göra nya uträkningar på priset
 * Skapar en funktion som skickar iväg den uppdaterade ordern med ny information. Om den blivit approved skrivs ett felmeddelande ut.
 * Skapar en funktion som navigerar oss till sista slidern på orderpages sidan.
 */

/* Edited: Diliara
Kollar om user är admin, om man är då sparar vi pk i useState och använder det när order ska uppdateras
admin kan redigera alla ordrar, annars bara sina egna ordrar */