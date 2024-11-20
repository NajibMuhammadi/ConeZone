import axios, { AxiosError } from "axios";
import { Order } from "../types/interfaces";
import { urls } from "../../url";

const postOrder = async (
    ordersUrl: string,
    order: any,
    paymentMethod: string,
    totalPrice: number
): Promise<Order[]> => {
    const url = urls[ordersUrl];

    if (!url) {
        throw new Error('Url hittades inte');
    } else if (!order) {
        throw new Error('Ingen order');
    }

    const orderData = {
        username: 'guest',
        items: order.items,
        customerDetails: order.customerDetails,
        paymentMethod,
        totalPrice,
        isApproved: false,
        isDone: false
    };

    try {
        const response = await axios.post(url, orderData)
        console.log(response.data)
        return response.data;
    } catch (error: AxiosError | any) {
        console.error("Error:", error.response?.data || error.message);
        throw new Error('Kunde inte skicka ordern');
    }
}

export { postOrder }

/**
 * Författare Lisa och Ida
 * En funktion som postar en ny order till databasen
 */
