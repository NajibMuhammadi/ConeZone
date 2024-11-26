import './styles/changeOrderPage.css';
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchOrder } from '../services/fetchOrder';
import { Order } from '../types/interfaces';

function ChangeOrderPage() {
    const orderId = useParams();
    const pk = orderId.pk;
    const sk = orderId.sk;
    const [order, setOrder]= useState<Order[] | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        const loadOrder = async () : Promise<void> => {
            try {
                const fetchedOrder = await fetchOrder('ordersUrl', pk as string, sk as string)
                setOrder(fetchedOrder);
                console.log(order)
            } catch (error) {
                console.error('Error fetching order', error)
            } finally {
                setLoading(false)
            }
        }
        if(pk && sk) {
        loadOrder();
        }
    }, [loading])

if (loading) {
    return 
    <p>Waiting....</p> 
}

if(!order) {
    console.log('No order found')
}
    return (
        <section>
            <Header/>
            <section className="overview__wrapper">
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
                        {/* Lägg in och rendera ut ordrar. Dessa ska gå att edita */}
                        <section className="overview__product-wrapper">
                            <h3 className="overview__customer">Cart</h3>
                            {/* {cart.map((item) => (
                                <section className="overview__product" key={item.sk}>
                                    <img src={item.image} alt={item.name} className="overview__img" />
                                    <section className="overview__info-wrapper">
                                        <section className="overview__info">
                                            <h4 className="overview__product-name">Product: {item.name}</h4>
                                            {editingQty ? (
                                                <Counter item={item} />
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
                            {editingQty && (
                                <button
                                    className="overview__savebtn"
                                    onClick={() => setEditingQty(false)}>
                                    Save</button>
                            )} */}
                        </section>
                        <hr className="overview__line" />

                        {/* Payment Method */}
                        <section className="overview__payment-wrapper">
                            <h3 className="overview__customer">Choosen payment method</h3>
                            {/* Lägg in vald paymentMethod med bild  */}
                                 <section className="overview__payment"> 

                                     <p className="overview__method-details">{order.paymentMethod}</p> 
                                   {/* <img src={`../../src/assets/${(paymentMethod)}.svg`} alt={paymentMethod} className="overview__method-img" /> */}
                                </section>
                       {/* </section>
                        <hr className="overview__line" />
                        <section className="overview__total">
                            <p className="overview__total-price">Total: <strong> {totalPrice} sek</strong></p> */}
                            <button
                                className="overview__submit"
                                // onClick={}
                            >Change Order</button>
                        </section>
                    </article>
                </section>
        <Footer/>
        </section>
    )
}

export default ChangeOrderPage
