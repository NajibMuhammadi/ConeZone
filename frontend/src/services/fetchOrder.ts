import axios, { AxiosError } from "axios";
import { urls } from "../../url";
import { Order } from "../types/interfaces";

const fetchOrder = async (ordersUrl: string, pk: string, sk:string) : Promise<Order> => {
    const url = urls[ordersUrl];

    if (!url) {
        throw new Error('Url hittades inte');
    } 

    try {
        const response = await axios.get<Order>(`${url}/${pk}/${sk}`)
        return response.data;
    } catch (error: AxiosError | any) {
        throw new Error('Kunde inte hämta ordern');
    }
}

export { fetchOrder }

/**
 * Författare Ida
 * En funktion som hämtar en order från databasen och returnerar datan
 */