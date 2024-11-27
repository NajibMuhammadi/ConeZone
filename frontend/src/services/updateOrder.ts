import axios, { AxiosError } from "axios";
import { urls } from "../../url";
import {updatedOrder } from "../types/interfaces";

const updateOrder = async (ordersUrl: string, pk: string, sk:string, order: updatedOrder) : Promise<void> => {
    const url = urls[ordersUrl];

    if (!url) {
        throw new Error('Url hittades inte');
    } 

    try {
        const response = await axios.put<updatedOrder>(`${url}/${pk}/${sk}`, order)
        console.log(response.data)
    } catch (error: AxiosError | any) {
        console.error('Fel vid uppdatering av order:', error);
        throw new Error(`Kunde inte uppdatera ordern: ${error?.response?.data?.message || error.message}`);
    }
}

export { updateOrder }

/**
 * Författare Ida
 * En funktion som updatera en order från databasen med ny information
 */