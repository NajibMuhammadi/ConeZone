import { useEffect, useState } from 'react';
import { deleteOrder } from '../services/deleteOrder';
import './styles/orderStatus.css';
import { Link } from 'react-router-dom';
import { Order } from '../types/interfaces';
import { fetchOrder } from '../services/fetchOrder';

interface Props {
    sk: string;
}

function OrderStatus({ sk }: Props) {
    const [newSk, setNewSk] = useState<string>('');
    // const [newSk, setNewSk] = useState<string>(sk || '');
    const pk = 'guest';
    const [isCanceled, setIsCanceled] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [isPickedUp, setIsPickedUp] = useState(false);
    const [orderDetails, setOrderDetails] = useState<Order | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const cancelOrder = async () => {
        try {
            console.log(`Your order with the id `, newSk, ` has been deleted`);
            await deleteOrder('ordersUrl', pk, newSk);
            setIsCanceled(true);
            sessionStorage.removeItem('orderNumber')
        } catch (error) {
            console.error('Failed to cancel the order', error);
        }
    };

    const getOrder = async (orderNumber: string) => {
        try {
            console.log('Fetching order with pk:', pk, 'and sk:', orderNumber);
            const response = await fetchOrder('ordersUrl', pk, orderNumber);
            if (response) {
                setOrderDetails(response);
            }
        } catch (error) {
            console.error('Failed to fetch order', error);
        }
    }

    useEffect(() => {
        if (sk) {
            setNewSk(sk);
            sessionStorage.setItem('orderNumber', sk);
        } else {
            const storedSk = sessionStorage.getItem('orderNumber');
            if (storedSk) {
                setNewSk(storedSk);
            } else {
                console.error("No orderNumber found in sessionStorage");
            }
        }
    }, [sk]);

    useEffect(() => {
        if (newSk) {
            getOrder(newSk);
        }
    }, [newSk]);


    useEffect(() => {
        if (isEditing) {
            getOrder(newSk);
        }
    }, [isEditing, newSk]);

    useEffect(() => {
        if (orderDetails?.isApproved) {
            setIsApproved(true);
        }

        if (orderDetails?.isDone) {
            setIsApproved(false);
            setIsDone(true);
        }
        if (orderDetails?.isPickedUp) {
            setIsApproved(false);
            setIsDone(false);
            setIsPickedUp(true);
            sessionStorage.removeItem('orderNumber')
        }
    }, [orderDetails]);

    return (
        <div className='order__wrapper'>
            {isCanceled ? (
                <main className='order'>
                    <h1 className='order__title'>Order Status</h1>
                    <span className='order__divider'></span>
                    <section className='order__info-container'>
                        <p className='order__info-title'>Your order with ordernumber {newSk} has been canceled!</p>
                        <p className='order__info-subtitle'>You need to go back to menu if you want to order something else</p>
                    </section>
                </main>
            ) : isApproved ? (
                <main className='order'>
                    <h1 className='order__title'>Order Status</h1>
                    <span className='order__divider'></span>
                    <section className='order__info-container'>
                        <p className='order__info-title'>Your order with ordernumber {newSk} has been Approved!</p>
                    </section>
                </main>
            ) : isDone ? (
                <main className='order'>
                    <h1 className='order__title'>Order Status</h1>
                    <span className='order__divider'></span>
                    <section className='order__info-container'>
                        <p className='order__info-title'>Your order with ordernumber {newSk} is ready to be picked up!</p>
                    </section>
                </main>
            ) : (
                <main className='order'>
                    <h1 className='order__title'>Order Status</h1>
                    <span className='order__divider'></span>
                    <section className='order__info-container'>
                        <p className='order__info-title'>Your order with ordernumber {newSk} has been created!</p>
                        <p className='order__info-subtitle'>Wait until staff sees and confirms your order.</p>
                        <p className='order__info-subtitle'>You can still change or delete your order until it is approved.</p>
                    </section>
                    <section className='order__button-container'>
                        <Link to={`/order/${pk}/${newSk}`} onClick={() => setIsEditing(true)}>
                            <button className='order__btn order__btn--change'>Change order</button>
                        </Link>
                        <button className='order__btn' onClick={cancelOrder}>Cancel order</button>
                    </section>
                </main>
            )}
        </div>
    );
}

export default OrderStatus;


/**
 *  Författare: Najib
 * en komponent som visar orderstatusen för användaren och möjligheten att avbryta eller bekräfta ordern
 *
 *  Författare: Ida
 * Skapat en funktion som gör att man kan radera ordern från databasen när man klickar på cancel order knappen
 */

/* Edited: Diliara
 ** kollar om user ändrar order och då fetchar order, annars fetchOrder körs inte
*/

// Författare: Lisa
// Skapar funktion för att kunna lämna sidan och komma tillbaka med hjälp av sessionStorage 