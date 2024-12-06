import './styles/allOrdersPage.css';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import fetchOrders from '../services/fetchOrders';
import { Order } from '../types/interfaces';
import Header from '../components/Header';

function AllOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const fetchedOrders = await fetchOrders();
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

    return (
        <>
            <Header />
            <section className='all-orders__wrapper'>
                <section className='all-orders__container'>
                    <h2 className='all-orders__header'>All Orders</h2>
                    <section className='all-orders__orders'>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : orders.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            orders.map((order) => (
                                <div key={order.sk} className="all-orders__item">
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
                                </div>
                            ))
                        )}
                    </section>
                </section>
            </section>
            <Footer />
        </>
    );
}

export default AllOrdersPage;

// Författare: Diliara
// En sida som visar alla ordrar som finns i databasen