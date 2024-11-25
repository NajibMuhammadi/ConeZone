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
    const clearCart = useMenuStore(state => state.clearCart);

    const [editingQty, setEditingQty] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(false);
    const [editingPayment, setEditingPayment] = useState(false);

    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(
        order?.customerDetails || { name: '', phone: '', email: '' });
    const [newPaymentMethod, setNewPaymentMethod] = useState(paymentMethod);

    if (!order || cart.length === 0) {
        return (
            <section className="overview__msg">
                <p className="overview__no-order">Ingen order finns</p>
            </section>
        )
    }

    const handleSendOrder = async () => {
        try {
            await postOrder('ordersUrl', order, paymentMethod, totalPrice);
            clearCart();
            onNext();
        } catch (error) {
            console.error('Error uploading order:', error);
        }
    };

    const handleSaveCustomer = () => {
        setOrder(customerDetails.name, customerDetails.phone, customerDetails.email);
        setEditingCustomer(false);
    };

    const handleSavePayment = () => {
        setPaymentMethod(newPaymentMethod);
        setEditingPayment(false);
    };

    return (
        <>
            <section className="overview__wrapper">
                <article className="overview">
                    <h2 className="overview__heading">Overview</h2>
                    <hr className="overview__line" />

                    {/* Customer Details */}
                    <section>
                        <section className="overview__customer-container-top">
                            <h3 className="overview__customer">Customer</h3>
                            {!editingCustomer ? (
                                <section>
                                    <p className="overview__customer-info"><strong>Name:</strong> {order.customerDetails.name}</p>
                                    <p className="overview__customer-info"><strong>Phone number:</strong> {order.customerDetails.phone}</p>
                                    <p className="overview__customer-info"><strong>Email:</strong> {order.customerDetails.email}</p>
                                    <button className="overview__edit" onClick={() => setEditingCustomer(true)}>
                                        <img className='overview__edit-img' src="../../src/assets/edit.png" alt="Redigera" />
                                    </button>
                                </section>
                            ) : (
                                <section>
                                    <input
                                        className="overview__customer-input"
                                        type="text"
                                        value={customerDetails.name || ''}
                                        onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                                    />
                                    <input
                                        className="overview__customer-input"
                                        type="text"
                                        value={customerDetails.phone || ''}
                                        onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                                    />
                                    <input
                                        className="overview__customer-input"
                                        type="email"
                                        value={customerDetails.email || ''}
                                        onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                                    />
                                    <button className='overview__customer-savebtn' onClick={handleSaveCustomer}>Save</button>
                                </section>
                            )}
                        </section>
                    </section>
                    <hr className="overview__line" />

                    {/* Cart */}
                    <section className="overview__product-wrapper">
                        <h3 className="overview__customer">Cart</h3>
                        {cart.map((item) => (
                            <section className="overview__product" key={item.sk}>
                                <img src={item.image} alt={item.name} className="overview__img" />
                                <section className="overview__info-wrapper">
                                    <section className="overview__info">
                                        <h4 className="overview__product-name">Product: {item.name}</h4>
                                        {editingQty ? (
                                            <>
                                                <Counter item={item} />
                                                {cart.indexOf(item) === 0 && (
                                                    <button
                                                        className="overview__customer-savebtn"
                                                        onClick={() => setEditingQty(false)}>
                                                        Save</button>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <p className="overview__item-qty">Quantity: {item.qty}</p>
                                                {cart.indexOf(item) === 0 && (
                                                    <button
                                                        className="overview__edit"
                                                        onClick={() => setEditingQty(true)}>
                                                        <img
                                                            className="overview__edit-img"
                                                            src="../../src/assets/edit.png"
                                                            alt="Edit" />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                        <p className="overview__price">Price: {item.price} sek</p>
                                    </section>
                                </section>
                            </section>
                        ))}
                    </section>
                    <hr className="overview__line" />

                    {/* Payment Method */}
                    <section className="overview__payment-wrapper">
                        <h3 className="overview__customer">Choosen payment method</h3>
                        {!editingPayment ? (
                            <section className="overview__payment">
                                {paymentMethod && <p className="overview__method-details">{paymentMethod}</p>}
                                {paymentMethod && <img src={`../../src/assets/${(paymentMethod)}.svg`} alt={paymentMethod} className="overview__method-img" />}
                                <button className="overview__edit" onClick={() => setEditingPayment(true)}>
                                    <img className='overview__edit-img' src="../../src/assets/edit.png" alt="Redigera" />
                                </button>
                            </section>
                        ) : (
                            <section className='overview__payment-dropdown'>
                                <select className='overview__payment-dropdownmenu' value={newPaymentMethod} onChange={(e) => setNewPaymentMethod(e.target.value)}>
                                    <option value="Card">Card</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Swish">Swish</option>
                                    <option value="Klarna">Klarna</option>
                                </select>
                                <button className='overview__customer-savebtn' onClick={handleSavePayment}>Save</button>
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
// Fixat möjlighet till editing på sida.

//Fixa kontroller på namn, mejl etc!
/*
*/
