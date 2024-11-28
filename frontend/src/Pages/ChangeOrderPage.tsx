import './styles/changeOrderPage.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchOrder } from '../services/fetchOrder';
import { Order } from '../types/interfaces';
import { updateOrder } from '../services/updateOrder';
import { deleteOrder } from '../services/deleteOrder';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function ChangeOrderPage() {
    const navigate = useNavigate();
    const orderId = useParams();
    const pk = orderId.pk;
    const sk = orderId.sk;
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    useEffect(() => {
        const loadOrder = async (): Promise<void> => {
            try {
                const fetchedOrder = await fetchOrder('ordersUrl', pk as string, sk as string)
                setOrder(fetchedOrder);
                setTotalPrice(fetchedOrder.totalPrice)
                console.log(order)
            } catch (error) {
                console.error('Error fetching order', error)
            } finally {
                setLoading(false)
            }
        }
        if (pk && sk) {
            loadOrder();
        }
    }, [loading])

    useEffect(() => {
        if (order) {
            const newPrice = order.items.reduce((total, item) => total + item.price * item.qty, 0);
            setTotalPrice(newPrice)
            console.log('Nu räknas det nya priset ut:', newPrice)
        }
    }, [order])

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decoded: { isAdmin: boolean } = jwtDecode(token);
                const isAdmin = decoded.isAdmin;
                console.log('isAdmin:', isAdmin);
                setIsAdmin(isAdmin);
            } catch (err) {
                console.error('Error parsing token:', err);
            }
        } else {
            setIsAdmin(false);
        }
    }, []);

    const adminButton = () => {
        navigate('/kitchenview')
    }

    if (loading) {
        return
        <p>Waiting....</p>
    }

    if (!order) {
        return <p>No order found</p>
    }

    const items = order.items

    const decreaseQuantity = (id: string, qty: number) => {
        updateItemQuantity(id, qty - 1)
        console.log('Subtraktion', id, qty)
    };

    const increaseQuantity = (id: string, qty: number) => {
        updateItemQuantity(id, qty + 1)
    };

    const updateItemQuantity = (itemId: string, newQty: number) => {
        const updateOrder = order.items.map(item => {
            if (item.sk === itemId) {
                return { ...item, qty: newQty };
            }
            return item;
        })
            .filter(item => item.qty >= 1);
        setOrder({ ...order, items: updateOrder });
        console.log(order)
    }

    const sendChangedOrder = async () => {
        let newOrder = {
            sk: sk,
            items: items,
            totalPrice: totalPrice
        }
        console.log('sendChangedOrder is clicked', pk, sk, newOrder)
        if (items.length === 0) {
            const response = await deleteOrder('ordersUrl', pk as string, sk as string);
            if (!response) {
                setErrorMsg('You can not delete an order that has been approved');
            }
            if (response) {
                setSuccessMsg('Order deleted')
            }
        } else {
            const response = await updateOrder('ordersUrl', pk as string, sk as string, newOrder)
            if (!response) {
                setSuccessMsg('');
                setErrorMsg('You can not change an order that has been approved');
            } else {
                setSuccessMsg('Order updated successfully!')
            }
        }
    }

    const backToOrderStatus = () => {
        navigate('/order', { state: { slideIndex: 3, sk: sk } })
    }

    return (
        <section className="overview__wrapper">
            <section>
                <article className="overview">
                    <h2 className="overview__heading">Overview</h2>
                    <hr className="overview__line" />
                    {/* Customer Details */}
                    <section>
                        <section className="overview__customer-container-top">
                            <h3 className="overview__customer">Customer</h3>
                            <section>
                                <p className="overview__customer-info"><strong>Name:</strong> {order.customerDetails.name}</p>
                                <p className="overview__customer-info"><strong>Phone number:</strong> {order.customerDetails.phone}</p>
                                <p className="overview__customer-info"><strong>Email:</strong> {order.customerDetails.email}</p>
                            </section>
                        </section>
                    </section>
                    <hr className="overview__line" />
                    {/* Cart */}
                    <section className="overview__product-wrapper">
                        <h3 className="overview__customer">Cart</h3>
                        {items.map((item) => (
                            <section className="overview__product" key={item.sk}>
                                <img src={item.image} alt={item.name} className="overview__img" />
                                <section className="overview__info-wrapper">
                                    <section className="overview__info">
                                        <h4 className="overview__product-name">Product: {item.name}</h4>
                                        <article className="counter-container">
                                            <button className="decreaseCounter-btn" onClick={() => decreaseQuantity(item.sk, item.qty)}>-</button>
                                            <p className="counter-qty">{item.qty}</p>
                                            <button className="increaseCounter-btn" onClick={() => increaseQuantity(item.sk, item.qty)}>+</button>
                                        </article>
                                    </section>
                                </section>
                            </section>
                        ))}
                    </section>
                    <hr className="overview__line" />

                    {/* Payment Method  */}
                    <section className="overview__payment-wrapper">
                        <h3 className="overview__customer">Choosen payment method</h3>
                        <section className="overview__payment">
                            <p className="overview__method-details">{order.paymentMethod}</p>
                            <img src={`../../src/assets/${(order.paymentMethod)}.svg`} alt={order.paymentMethod} className="overview__method-img" />
                        </section>
                    </section>
                    <hr className="overview__line" />
                    <section className="overview__total">
                        <p className="overview__total-price">Total: <strong> {totalPrice} sek</strong></p>
                        {errorMsg && <p className="overview__errormsg">{errorMsg}</p>}
                        {successMsg && <p className="overview__successmsg">{successMsg}</p>}
                        <button
                            className="overview__submit"
                            onClick={sendChangedOrder}
                        >Change Order</button>
                        {isAdmin && (
                            <button
                                className="overview__submit overview__submit-green"
                                onClick={adminButton}>
                                Go back to kitchenView
                            </button>
                        )}
                        <button
                            className="overview__submit-white"
                            onClick={backToOrderStatus}
                        >Back To Order Status</button>
                    </section>
                </article>
            </section>
        </section>
    )
}

export default ChangeOrderPage


/**
 * Författare Lisa och Ida
 * Vi hämtar alla ordrar, skriver ut dem på sidan. 
 * Skapar funktioner för att justera kvantiteten och tar bort objektet om den går under ett
 * Skapar en funktion för att göra nya uträkningar på priset
 * Skapar en funktion som skickar iväg den uppdaterade ordern med ny information. Om den blivit approved skrivs ett felmeddelande ut.
 * Skapar en funktion som navigerar oss till sista slidern på orderpages sidan.
 */