import { deleteOrder } from '../services/deleteOrder';
import './styles/orderStatus.css'

interface Props {
    sk: string;
}

function OrderStatus({sk} : Props) {
    const pk = 'guest'

    const cancelOrder = async () => {
        console.log(`Your order with the id `, sk, ` has been deleted` )
        await deleteOrder('ordersUrl', pk, sk);

    };

    const editOrder = async () => {
        console.log('clicked the edit order button and the order id is', sk)
    };


    return (
        <div className='order__wrapper'>
            <main className='order'>
                <h1 className='order__title'>Order Status</h1>
                <span className='order__divider'></span>
                <section className='order__info-container'>
                    <p className='order__info-title'>Your order with ordernumber {sk} has been created!</p>
                    <p className='order__info-subtitle'>Wait until staff sees and confirms your order.</p>
                    <p className='order__info-subtitle'>You can still change or delete your order until it is approved.</p>
                </section>
                <section className='order__button-container'>
                    <button className='order__btn order__btn--change' onClick={editOrder}>Change order</button>
                    <button className='order__btn' onClick={cancelOrder}>Cancel order</button>
                </section>
            </main>
        </div>
    )
}

export default OrderStatus


/** 
 *  Författare: Najib
 * en komponent som visar orderstatusen för användaren och möjligheten att avbryta eller bekräfta ordern
 * 
 *  Författare: Ida
 * Skapat en funktion som gör att man kan radera ordern från databasen när man klickar på cancel order knappen
 */