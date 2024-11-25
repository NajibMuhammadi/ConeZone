import './styles/orderStatus.css'

function OrderStatus() {

    const cancelOrder = async () => {
        console.log('clicked the cancel order button')
    };

    const editOrder = async () => {
        console.log('clicked the edit order button')
    };


    return (
        <div className='order__wrapper'>
            <main className='order'>
                <h1 className='order__title'>Order Status</h1>
                <span className='order__divider'></span>
                <section className='order__info-container'>
                    <p className='order__info-title'>Your order is created!</p>
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


/* 
    författare: Najib
    en komponent som visar orderstatusen för användaren och möjligheten att avbryta eller bekräfta ordern
 */