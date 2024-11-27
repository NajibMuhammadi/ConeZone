import axios from 'axios';
import { Order } from '../types/interfaces';
import { urls } from '../../url';

interface FetchOrdersResponse {
    success: boolean;
    message: Order[];
}

const fetchOrders = async (): Promise<Order[]> => {
    const url = urls['ordersUrl'];

    if (!url) {
        throw new Error('Url hittades inte');
    }

    try {
        const response = await axios.get<FetchOrdersResponse>(url);
        console.log('Fetched Orders:', response.data.message);
        return response.data.message || [];
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Kunde inte hämta order');
    }
};

export default fetchOrders;

// Författare: Diliara
// En funktion som hämtar alla ordrar från databasen