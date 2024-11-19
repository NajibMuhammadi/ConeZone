import './styles/kitchenViewPage.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import useMenuStore from '../stores/cartStore'

function kitchenViewPage() {

    const kitchenOrders = useMenuStore(state => state.kitchenOrders)

    return (
        <>
            <Header />
            <section className='kitchenViewPage__wrapper'>
                <section className='kitchenViewPage__container'>
                    <h2 className='kitchenViewPage__header'>Kitchen View</h2>
                    <section>
                        <section className='kitchenViewPage__incomingContainer'>
                            <h3 className='kitchenViewPage__header'>INCOMING</h3>
                            {kitchenOrders.length === 0 ? (
                                <p>No incoming orders.</p>
                            ) : (
                                kitchenOrders.map((order) => (
                                    <div key={order.sk} className="order">
                                        <p>Order ID: {order.sk}</p>
                                        <p>Customer: {order.customerDetails.name}</p>
                                        <p>Total: {order.totalPrice} SEK</p>
                                        <p>Payment: {order.paymentMethod}</p>
                                        <ul>
                                            {order.items.map((item) => (
                                                <li key={item.sk}>
                                                    {item.name} - {item.qty} x {item.price} SEK
                                                </li>
                                            ))}
                                        </ul>
                                        {/* <p>Status: {order.status}</p> */}
                                    </div>
                                ))
                            )}
                        </section>
                        <section className='kitchenViewPage__OngoingContainer'></section>
                        <h3 className='kitchenViewPage__header'>ONGOING</h3>

                        <section className='kitchenViewPage__DoneContainer'></section>
                        <h3 className='kitchenViewPage__header'>DONE</h3>

                    </section>
                </section >
            </section >
            <Footer />
        </>
    )
}

export default kitchenViewPage

//Författare Lisa - skapat sidan
