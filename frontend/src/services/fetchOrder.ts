import axios, { AxiosError } from "axios";
import { urls } from "../../url";
import { Order } from "../types/interfaces";

const fetchOrder = async (ordersUrl: string, pk: string, sk:string) : Promise<Order> => {
    //const url = urls[ordersUrl];
    if(!pk || !sk) {
        throw new Error ('Pk or Sk is missing')
    }

    const url = `${urls[ordersUrl]}/${pk}/${sk}`;
    
    if (!url) {
        throw new Error('Url hittades inte');
    } 

    try {
        const response = await axios.get<Order>(url)
        return response.data;
    } catch (error: AxiosError | any) {
        console.error('Fel vid hämtning av order:', error.response);
        throw new Error(`Kunde inte hämta ordern: ${error?.response?.data?.message || error.message}`);
    }
}

export { fetchOrder }

/**
 * Författare Ida
 * En funktion som hämtar en order från databasen och returnerar datan
 */