import axios, { AxiosError } from "axios";
import { Order } from "../types/interfaces";
import { urls } from "../../url";
import {v4 as uuid} from "uuid";

const postOrder = async (
    ordersUrl: string,
    order: Order,
    paymentMethod: string,
    totalPrice: number
): Promise<Order> => {
    const url = urls[ordersUrl];
    const sk = uuid().substring(0, 8)

    if (!url) {
        throw new Error('Url hittades inte');
    } else if (!order) {
        throw new Error('Ingen order');
    }

    const orderData = {
        username: 'guest',
        sk: sk,
        items: order.items,
        customerDetails: order.customerDetails,
        paymentMethod,
        totalPrice,
        isApproved: false,
        isDone: false,
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
