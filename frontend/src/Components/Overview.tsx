import './styles/overview.css';
import useMenuStore from '../stores/cartStore';
import { postOrder } from '../services/postorder';
import { useState } from 'react';
import Counter from './Counter';
import { CustomerDetails } from '../types/interfaces';

function Overview({ onNext }: { onNext: () => void }) {

    const cart = useMenuStore(state => state.cart)
    const order = useMenuStore(state => state.order)
    const paymentMethod = useMenuStore(state => state.paymentMethod)
    const totalPrice = useMenuStore(state => state.totalPrice());
    const setOrder = useMenuStore(state => state.setOrder);
    const setPaymentMethod = useMenuStore(state => state.setPaymentMethod);


    const [editingQty, setEditingQty] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(false);
    const [editingPayment, setEditingPayment] = useState(false);

    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(
        order?.customerDetails || { name: '', phone: '', email: '' }
    ); const [newPaymentMethod, setNewPaymentMethod] = useState(paymentMethod);


    if (!order) {
        return (
            <section className="overview__msg">
                <p className="overview__no-order">Ingen order</p>
            </section>
        )
    }

    const handleSendOrder = async () => {
        await uploadOrder();
        useMenuStore.getState().clearCart();
        onNext();
    };

    const uploadOrder = async () => {
        const url = 'ordersUrl';
        const order = useMenuStore.getState().order;
        const paymentMethod = useMenuStore.getState().paymentMethod;
        const totalPrice = useMenuStore.getState().totalPrice();

        if (!order) {
            console.error("Ingen order finns");
            return;
        }
        try {
            await postOrder(url, order, paymentMethod, totalPrice);
        } catch (error) {
            console.error("Error uploading order:", error);
        }
    }

    const handleSaveCustomer = () => {
        setOrder(customerDetails.name, customerDetails.phone, customerDetails.email);
        setEditingCustomer(false);
    };

    const handleSavePayment = () => {
        setPaymentMethod(newPaymentMethod);
        setEditingPayment(false);
    };

    if (cart.length === 0) {
        return (
            <section className="overview__msg">
                <p className="overview__no-order">Ingen order finns</p>
            </section>
        );
    }

    return (
        <>
            <section className="overview__wrapper">
                <article className="overview">
                    <h2 className="overview__heading">Overview</h2>
                    <hr className="overview__line" />
                    <section>
                        <section className="overview__customer-container-top">
                            <h3 className="overview__customer">Customer</h3>
                            {!editingCustomer ? (
                                <section>
                                    <p className="overview__customer-info"><strong>Name:</strong> {order.customerDetails.name}</p>
                                    <p className="overview__customer-info"><strong>Phone number:</strong> {order.customerDetails.phone}</p>
                                    <p className="overview__customer-info"><strong>Email:</strong> {order.customerDetails.email}</p>
                                    <button className="overview__edit" onClick={() => setEditingCustomer(true)}>
                                        <img className='overview__edit--img' src="../../src/assets/edit.png" alt="Redigera" />
                                    </button>
                                </section>
                            ) : (
                                <section>
                                    <input
                                        type="text"
                                        value={customerDetails.name || ''}
                                        onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                                        placeholder="Name"
                                    />
                                    <input
                                        type="text"
                                        value={customerDetails.phone || ''}
                                        onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                                        placeholder="Phone"
                                    />
                                    <input
                                        type="email"
                                        value={customerDetails.email || ''}
                                        onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                                        placeholder="Email"
                                    />
                                    <button onClick={handleSaveCustomer}>Save</button>
                                </section>
                            )}
                        </section>
                    </section>
                    <hr className="overview__line" />
                    <section className="overview__product--wrapper">
                        <button className="overview__edit" onClick={() => setEditingQty(!editingQty)}>
                            <img className='overview__edit--img' src="../../src/assets/edit.png" alt="Redigera" />
                        </button>
                        {cart.map((item) => (
                            <section className="overview__product" key={item.sk}>
                                <img src={item.image} alt={item.name} className="overview__img" />
                                <section className="overview__info-wrapper">
                                    <section className="overview__info">
                                        <h3 className="overview__product-name">Product: {item.name}</h3>
                                        {!editingQty ? (
                                            <p className="overview__item-qty">Quantity: {item.qty}</p>
                                        ) : (
                                            <Counter item={item} />
                                        )}
                                        <p className="overview__price">Price: {item.price} sek</p>
                                    </section>
                                </section>
                            </section>
                        ))}
                    </section>
                    <hr className="overview__line" />
                    <section className="overview__payment--wrapper">
                        <h3 className="overview__customer">Choosen payment method</h3>
                        {!editingPayment ? (
                            <section className="overview__payment">
                                {paymentMethod && <p className="overview__method-details">{paymentMethod}</p>}
                                {paymentMethod && <img src={`../../src/assets/${(paymentMethod)}.svg`} alt={paymentMethod} className="overview__method-img" />}
                                <button className="overview__edit" onClick={() => setEditingPayment(true)}>
                                    <img className='overview__edit--img' src="../../src/assets/edit.png" alt="Redigera" />
                                </button>
                            </section>
                        ) : (
                            <section>
                                <select value={newPaymentMethod} onChange={(e) => setNewPaymentMethod(e.target.value)}>
                                    <option value="Card">Card</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Swish">Swish</option>
                                    <option value="Klarna">Klarna</option>
                                </select>
                                <button onClick={handleSavePayment}>Save</button>
                            </section>
                        )}
                    </section>
                    <hr className="overview__line" />
                    <section className="overview__total">
                        <p className="overview__total-price">Total: <strong> {totalPrice} sek</strong></p>
                        <button
                            className="overview__submit"
                            onClick={handleSendOrder}
                        >Send Order</button>
                    </section>
                </article>
            </section>
        </>
    )
}

export default Overview

/*
/* Författare: Diliara
/* Overview component som visar kundinformation,
produktinformation, vald betalningsmetod och totalpris, läsas in på OrderPage
*/

// Författare: Lisa
// Implementerat funktionalitet på sidan från vår Store samt till databasen (med Ida).
/*
*/

