import './styles/kitchenViewPage.css';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import fetchOrders from '../services/fetchOrders';
import { Order } from '../types/interfaces';
import AdminHeader from '../components/AdminHeader';
import { adminUpdate } from '../services/adminUpdate';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

function KitchenViewPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const fetchedOrders = await fetchOrders();
                console.log('Fetched Orders:', fetchedOrders);
                setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
            } catch (err) {
                console.error('Error loading orders:', err);
                setError('Kunde inte hämta order');
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const incomingOrders = orders.filter(order => !order.isApproved);
    const ongoingOrders = orders.filter(order => order.isApproved && !order.isDone);
    const doneOrders = orders.filter(order => order.isDone);

    const filteredOrders = filter === 'incoming' ? incomingOrders :
        filter === 'ongoing' ? ongoingOrders :
            filter === 'done' ? doneOrders : orders;

        const [newMessage, setNewMessage] = useState('')
        const pk = 'guest'
        
    const approveOrder = async (sk : string) => {
            let newOrder = {
                sk: sk,
                isApproved: true,
                kitchenMessage: newMessage,
            }
            console.log(`Your order with the id `, sk, ` has been approved with the following `, newMessage )
            await adminUpdate('adminOrdersUrl', pk, sk, newOrder)
            //location.reload()
    }

const orderDone = async (sk : string) => {
        let newOrder = {
            sk: sk,
            isApproved: true,
            isDone: true
        }

        await adminUpdate('adminOrdersUrl', pk, sk, newOrder)
}

    return (
        <>
            <AdminHeader />
            <section className='kitchenViewPage__wrapper'>
                <section className='kitchenViewPage__container'>
                    <h2 className='kitchenViewPage__header'>Kitchen View</h2>
                    <div className='kitchenViewPage__filter'>
                        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
                        <button onClick={() => setFilter('incoming')} className={filter === 'incoming' ? 'active' : ''}>Incoming</button>
                        <button onClick={() => setFilter('ongoing')} className={filter === 'ongoing' ? 'active' : ''}>Ongoing</button>
                        <button onClick={() => setFilter('done')} className={filter === 'done' ? 'active' : ''}>Done</button>
                    </div>
                    <section>
                        {filter === 'all' || filter === 'incoming' ? (
                            <section className='kitchenViewPage__incomingContainer'>
                                <h3 className='kitchenViewPage__header-incoming'>INCOMING</h3>
                                <section className='kitchenViewPage__incoming'>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p>{error}</p>
                                    ) : incomingOrders.length === 0 ? (
                                        <p>No incoming orders.</p>
                                    ) : (
                                        incomingOrders.map((order) => (
                                            <div key={order.sk} className="order__incoming">
                                                <Link to={`/order/${order.pk}/${order.sk}`}>
                                                    <button className="kitchenViewPage__edit">
                                                        <img className='kitchenViewPage__edit-img' src="../../src/assets/edit.png" alt="Redigera" />
                                                    </button></Link>
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
                                                <textarea
                                                    placeholder="Add a comment"
                                                    className="incoming__comment-input"
                                                    onChange={(event) => setNewMessage(event.target.value)}
                                                />
                                                <button className="incoming__btn" onClick={() => approveOrder(order.sk)}>Approve</button>
                                            </div>
                                        ))
                                    )}
                                </section>
                            </section>
                        ) : null}
                        {filter === 'all' || filter === 'ongoing' ? (
                            <section className='kitchenViewPage__OngoingContainer'>
                                <h3 className='kitchenViewPage__header-ongoing'>ONGOING</h3>
                                <section className='kitchenViewPage__ongoing'>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p>{error}</p>
                                    ) : ongoingOrders.length === 0 ? (
                                        <p>No ongoing orders.</p>
                                    ) : (
                                        ongoingOrders.map((order) => (
                                            <div key={order.sk} className="order__ongoing">
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
                                                <p className="kitchenViewPage__message">Message: {order.kitchenMessage}</p>
                                                <button className="ongoing__btn" onClick={() => orderDone(order.sk)}>Done</button>
                                            </div>
                                        ))
                                    )}
                                </section>
                            </section>
                        ) : null}
                        {filter === 'all' || filter === 'done' ? (
                            <section className='kitchenViewPage__DoneContainer'>
                                <h3 className='kitchenViewPage__header-done'>DONE</h3>
                                <section className='kitchenViewPage__done'>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p>{error}</p>
                                    ) : doneOrders.length === 0 ? (
                                        <p>No done orders.</p>
                                    ) : (
                                        doneOrders.map((order) => (
                                            <div key={order.sk} className="order__done">
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
                                                <button className="done__btn">Remove</button>
                                            </div>
                                        ))
                                    )}
                                </section>
                            </section>
                        ) : null}
                    </section>
                </section>
            </section>
            <Footer />
        </>
    );
}

export default KitchenViewPage;

//Författare Lisa - skapat sidan

//Författare Diliara
// Gjorde om sidan, läser in orders från db

/**
 * Författare Ida
 * Har lagt till funktionalitet för att kunna markera en order som approved och kunna skicka med information till köket
 * Har lagt till en funktion för att kunna markera en order som done
 * La även till så att när en kommentar skickas med till köket skrivs det ut
 */
