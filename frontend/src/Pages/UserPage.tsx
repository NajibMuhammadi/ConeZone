import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/userPage.css';
import fetchOrders from '../services/fetchOrders';
import { Order } from '../types/interfaces';
import { jwtDecode } from 'jwt-decode';

function UserPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decoded: { username: string } = jwtDecode(token);
                setUsername(decoded.username);
                console.log('Decoded token:', decoded);
            } catch (err) {
                console.error('Error parsing token:', err);
            }
        }
    }, []);

    useEffect(() => {
        const loadOrders = async () => {
            if (!username) return;
            try {
                const fetchedOrders = await fetchOrders();
                const userOrders = fetchedOrders.filter(order => order.pk === username);
                console.log('Fetched Orders:', userOrders);
                setOrders(userOrders);
            } catch (err) {
                console.error('Error loading orders:', err);
                setError('Kunde inte hämta order');
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [username]);

    const getRandomDate = (start: Date, end: Date): Date => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    return (
        <>
            <Header />
            <section className="user__wrapper">
                <section className="user__orders">
                    <h2 className="user__header">My orders</h2>
                    <section className="user__orders-container">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : orders.length === 0 ? (
                            <p className="user__order-empty">No orders found.</p>
                        ) : (
                            orders.map((order) => {
                                const randomDate = getRandomDate(new Date(2022, 0, 1), new Date());
                                return (
                                    <article key={order.sk} className="user__order-item">
                                        <section className="user__order-img">
                                            {order.items.map((item) => (
                                                <img key={item.sk} src={`${item.image}`} alt={item.name} className="user__img" />
                                            ))}
                                        </section>
                                        <section className="user__order-info">
                                            <p className="user__date">
                                                <strong>{randomDate.toLocaleDateString()}</strong>
                                                <span className="user__date"> {randomDate.toLocaleTimeString()}</span>
                                            </p>
                                            <p className="user__total">
                                                <strong>Total</strong>
                                                <br />
                                                {order.totalPrice}kr
                                            </p>
                                        </section>
                                    </article>
                                );
                            })
                        )}
                    </section>
                </section>
            </section>
            <Footer />
        </>
    );
}

export default UserPage;

/**
 * Författare Diliara
 * Här visas användarens tidigare ordrar,
 * hämtar riktig data från databasen och visar den på sidan
 * 
 * Edit: Ida
 * La till ett mellanrum mellan datum och tid
*/