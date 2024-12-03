import axios, { AxiosError } from "axios";
import { Order } from "../types/interfaces";
import { urls } from "../../url";
import { v4 as uuid } from "uuid";
import { jwtDecode } from "jwt-decode";

const postOrder = async (
    ordersUrl: string,
    order: Order,
    paymentMethod: string,
    totalPrice: number
): Promise<Order> => {
    const url = urls[ordersUrl];
    const sk = uuid().substring(0, 8);

    if (!url) {
        throw new Error('Url hittades inte');
    } else if (!order) {
        throw new Error('Ingen order');
    }

    const token = sessionStorage.getItem('token');
    let username = 'guest';
    if (token) {
        try {
            const decoded: { username: string } = jwtDecode(token);
            username = decoded.username;
            console.log('Decoded token:', decoded);
        } catch (err) {
            console.error('Error decoding token:', err);
        }
    }

    const orderData = {
        username,
        sk,
        items: order.items,
        customerDetails: order.customerDetails,
        paymentMethod,
        totalPrice,
        isApproved: false,
        isDone: false,
    };

    console.log('Order data:', orderData);

    try {
        const response = await axios.post(`${url}?key=key-6GRf3`, orderData);
        console.log('Response data:', response.data);
        return response.data;
    } catch (error: AxiosError | any) {
        console.error("Error:", error.response?.data || error.message);
        throw new Error('Kunde inte skicka ordern');
    }
};

export { postOrder };

/** Författare Lisa och Ida
 *  Postar en ny order till databasen och skapar en unik sk för varje order. 
 */

/* Edited: Diliara
decodar token och hämtar användarnamn från token */