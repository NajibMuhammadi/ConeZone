import './styles/overview.css';
import useMenuStore from '../stores/cartStore';
import { postOrder } from '../services/postorder';

function Overview({ onNext }: { onNext: () => void }) {

    const order = useMenuStore(state => state.order)
    const paymentMethod = useMenuStore(state => state.paymentMethod)
    const totalPrice = useMenuStore(state => state.totalPrice());

    if (!order) {
        return (
            <p>Ingen order</p>
        )
    }

    const handleSendOrder = async () => {
        await uploadOrder();
        useMenuStore.getState().clearCart();
        alert('Order skickad till köket!');
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

    return (
        <>
            <section className="overview__wrapper">
                <article className="overview">
                    <h2 className="overview__heading">Overview</h2>
                    <hr className="overview__line" />
                    <section className="overview__customer-info">
                        <section className="overview__customer-container-top">
                            <h2 className="overview__customer">
                                Customer
                            </h2>
                            <img src="../../src/assets/edit.png" alt="" className="overview__edit" />
                        </section>
                        <section className="overview__customer-container-bottom">
                            <p className="overview__name"><strong>Name:</strong>{order.customerDetails.name}</p>
                            <p className="overview__phone"><strong>Phone number:</strong>{order.customerDetails.phone}</p>
                            <p className="overview__email"><strong>Email:</strong>{order.customerDetails.email}</p>
                        </section>
                    </section>
                    <hr className="overview__line" />
                    {order.items.map((item) => (
                        <section className="overview__product" key={item.sk}>
                            <img src={item.image} alt={item.name} className="overview__img" />
                            <section className="overview__info-wrapper">
                                <section className="overview__info">
                                    <h3 className="overview__name">Product:</h3>
                                    <p className="overview__quantity">Quantity:</p>
                                    <p className="overview__price">Price:</p>
                                </section>
                                <section className="overview__info-details">
                                    <h4 className="overview__name">{item.name}</h4>
                                    <p>{item.qty}</p>
                                    <p className="overview__price-details">{item.price} sek</p>
                                </section>
                            </section>
                        </section>
                    ))}
                    <hr className="overview__line" />
                    <section className="overview__payment">
                        <p className="overview__method">Chosen Payment Method:</p>
                        {paymentMethod && <p className="overview__method-details">{paymentMethod}</p>}
                        {paymentMethod && <img src={`../../src/assets/${paymentMethod}.svg`} alt={paymentMethod} className="overview__method-img" />}
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

