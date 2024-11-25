import './styles/overview.css';
import useMenuStore from '../stores/cartStore';
import { postOrder } from '../services/postorder';
import { Order } from '../types/interfaces';

function Overview({ onNext }: { onNext: (sk:string) => void }) {
    const order = useMenuStore(state => state.order)
    const paymentMethod = useMenuStore(state => state.paymentMethod)
    const totalPrice = useMenuStore(state => state.totalPrice());


    if (!order) {
        return (
            <section className="overview__msg">
                <p className="overview__no-order">Ingen order</p>
            </section>
        )
    }

    const handleSendOrder = async () => {
        console.log('Starting order upload...');
        const response = await uploadOrder();
        console.log('Upload response:', response);

        if(response && response.sk) {
            console.log('Setting order ID:', response.sk);
            useMenuStore.getState().clearCart();
            onNext(response.sk);
        }
    };

    const uploadOrder = async () : Promise<Order | undefined>=> {
        const url = 'ordersUrl';
        const order = useMenuStore.getState().order;
        const paymentMethod = useMenuStore.getState().paymentMethod;
        const totalPrice = useMenuStore.getState().totalPrice();

        if (!order) {
            console.error("Ingen order finns");
            return;
        }
        try {
            const response = await postOrder(url, order, paymentMethod, totalPrice);
            return response;
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
                            <p className="overview__name"><strong>Name: </strong>{order.customerDetails.name}</p>
                            <p className="overview__phone"><strong>Phone number: </strong>{order.customerDetails.phone}</p>
                            <p className="overview__email"><strong>Email: </strong>{order.customerDetails.email}</p>
                        </section>
                    </section>
                    <hr className="overview__line" />
                    {order.items.map((item) => (
                        <section className="overview__product" key={item.sk}>
                            <img src={item.image} alt={item.name} className="overview__img" />
                            <section className="overview__info-wrapper">
                                <section className="overview__info">
                                    <h3 className="overview__product-name">Product: {item.name}</h3>
                                    <p className="overview__quantity">Quantity: {item.qty}</p>
                                    <p className="overview__price">Price: {item.price} sek</p>
                                </section>
                            </section>
                        </section>
                    ))}
                    <hr className="overview__line" />
                    <section className="overview__payment">
                        <p className="overview__method">Chosen Payment Method:</p>
                        {paymentMethod && <p className="overview__method-details">{paymentMethod}</p>}
                        {paymentMethod && <img src={`../../src/assets/${(paymentMethod)}.svg`} alt={paymentMethod} className="overview__method-img" />}
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

