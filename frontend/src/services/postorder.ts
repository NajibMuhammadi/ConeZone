import axios, { AxiosError } from "axios";
import { Order } from "../types/interfaces";
import { urls } from "../../url";
import useMenuStore from "../stores/cartStore";
import { v4 as uuid } from 'uuid';

const postOrder = async (ordersUrl: string): Promise<Order[]> => {
    const url = urls[ordersUrl];
    const order = useMenuStore(state => state.order)
    const paymentMethod = useMenuStore(state => state.paymentMethod)
    const totalPrice = useMenuStore(state => state.totalPrice)

    if (!url) {
        throw new Error('Url hittades inte')
    } else if (!order) {
        throw new Error('ingen order')
    }

    const orderId = uuid().replace(/-/g, '').slice(0, 10);
    const orderData = {
        username: 'guest',
        sk: orderId,
        items: order.items,
        customerDetails: order.customerDetails,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
        isApproved: false,
        isDone: false,
    }

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
