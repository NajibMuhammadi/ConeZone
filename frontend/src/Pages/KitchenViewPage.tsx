import './styles/kitchenViewPage.css';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import fetchOrders from '../services/fetchOrders';
import { Order } from '../types/interfaces';
import AdminHeader from '../components/AdminHeader';
import { adminUpdate } from '../services/adminUpdate';
// import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function KitchenViewPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decoded: { isAdmin: boolean, username: string } = jwtDecode(token);
                setIsAdmin(decoded.isAdmin);
                console.log('Decoded token:', decoded);
            } catch (err) {
                console.error('Error parsing token:', err);
            }
        }
    }, []);

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

    console.log('Filtered orders:', filteredOrders);

    const [newMessage, setNewMessage] = useState('');
    const pk = 'guest';

    const approveOrder = async (sk: string) => {
        if (isAdmin) {
            try {
                let newOrder = {
                    sk: sk,
                    isApproved: true,
                    kitchenMessage: newMessage,
                };
                console.log(`Your order with the id `, sk, ` has been approved with the following `, newMessage);
                await adminUpdate('adminOrdersUrl', pk, sk, newOrder);
                location.reload();
            } catch (error) {
                console.error('Error editing order', error)
            }
        }
    };

    const orderDone = async (sk: string) => {
        if (isAdmin) {
            try {
                let newOrder = {
                    sk: sk,
                    isApproved: true,
                    isDone: true
                };
                await adminUpdate('adminOrdersUrl', pk, sk, newOrder)
                location.reload()
            } catch (error) {
                console.error('Error edition order', error)
            }
        }
}

    const orderIsPickedUp = async (sk: string) => {
        if(isAdmin) {
            try {
                let newOrder = {
                    sk: sk,
                    isApproved: true,
                    isDone: true,
                    isPickedUp: true,
                }

                console.log('Order skickas:', newOrder)
                await adminUpdate('adminOrdersUrl', pk, sk, newOrder)
                location.reload()
            } catch(error) {
                console.error('Error editing order', error)
            }
        }
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
                                                <Link to={isAdmin ? `/order/${order.sk}` : `/order/${order.pk}/${order.sk}`}>
                                                    <button className="kitchenViewPage__edit">
                                                        <img className='kitchenViewPage__edit-img' src="../../src/assets/edit.png" alt="Redigera" />
                                                    </button>
                                                </Link>
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
                                                    aria-label="Add a comment input"
                                                    placeholder="Add a comment"
                                                    className="incoming__comment-input"
                                                    onChange={(event) => setNewMessage(event.target.value)}
                                                />
                                                <button className="incoming__btn" onClick={() => order.sk && approveOrder(order.sk)}>Approve</button>
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
                                                <button className="ongoing__btn" onClick={() => order.sk && orderDone(order.sk)}>Done</button>
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
                                                <button className="done__btn" onClick={() => order.sk && orderIsPickedUp(order.sk)}>Remove</button>
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
// Gjorde om sidan, läser in orders från db,
// kollar om user är admin, admin skickas till /order/sk, inte /order/pk/sk son vanlig användare

/**
 * Författare Ida
 * Har lagt till funktionalitet för att kunna markera en order som approved och kunna skicka med information till köket
 * Har lagt till en funktion för att kunna markera en order som done
 * La även till så att när en kommentar skickas med till köket skrivs det ut
 */

// författare: Najib
// hämtade token från sessionstorage och dekodade den för att se om användaren är admin eller inte