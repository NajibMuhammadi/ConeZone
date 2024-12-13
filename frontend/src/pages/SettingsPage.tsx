import './styles/settingsPage.css';
import { useEffect, useState } from 'react';
import fetchOrders from '../services/fetchOrders';
import { Order } from '../types/interfaces';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SettingsPage() {
    const [customerDetails, setCustomerDetails] = useState<Order['customerDetails'] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decoded: { username: string } = jwtDecode(token);
                setUsername(decoded.username);
            } catch (err) {
                console.error('Error parsing token:', err);
            }
        }
    }, []);

    useEffect(() => {
        const loadCustomerDetails = async () => {
            if (!username) return;
            try {
                const fetchedOrders = await fetchOrders();
                const userOrders = fetchedOrders.filter(order => order.pk === username);
                if (userOrders.length > 0) {
                    setCustomerDetails(userOrders[0].customerDetails);
                } else {
                    setError('No orders found for user');
                }
            } catch (err) {
                console.error('Error loading customer details:', err);
                setError('Failed to fetch customer details');
            } finally {
                setLoading(false);
            }
        };

        loadCustomerDetails();
    }, [username]);

    return (
        <>
            <Header />
            <section className="settings__wrapper">
                <section className="settings">
                    <h1 className="settings__header">Info</h1>
                    <section className="settings__content">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error-msg">{error}</p>
                    ) : customerDetails ? (
                        <>
                            <article className="settings__item">
                                <h2 className="settings__name">Name</h2>
                                <p className="settings__name">{customerDetails.name}</p>
                            </article>
                            <article className="settings__item"> 
                                <h2 className="settings__phone">Phone</h2>
                            <p className="settings__phone">{customerDetails.phone}</p>
                            </article>
                            <article className="settings__item">
                                <h2 className="settings__email">Email</h2>
                            <p className="settings__email">{customerDetails.email}</p>
                            </article>
                        </>
                    ) : (
                        <p>No customer details found.</p>
                    )}
                    </section>
                </section>
            </section>
            <Footer />
        </>
    );
}

export default SettingsPage;

/**
 * Författare: Diliara
 * En sida där användaren kan se sina uppgifter
 */