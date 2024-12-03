import axios, { AxiosError } from "axios";
import { urls } from "../../url";
import {updatedOrder } from "../types/interfaces";

const updateOrder = async (ordersUrl: string, pk: string, sk:string, order: updatedOrder) : Promise<boolean> => {
    const url = urls[ordersUrl];

    if (!url) {
        throw new Error('Url hittades inte');
    } 
    
    try {
        const response = await axios.put<updatedOrder>(`${url}/${pk}/${sk}?key=key-6GRf3`, order)
        console.log(response.data)
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error: AxiosError | any) {
        console.error('Fel vid uppdatering av order:', error.response?.data || error.message);
        if(error instanceof AxiosError && error.response?.data?.success === false) {
            return false
        }
        throw new Error(`Kunde inte uppdatera ordern: ${error?.response?.data?.message || error.message}`);
    }
}

export { updateOrder }

/**
 * Författare Ida och Lisa
 * En funktion som updatera en order från databasen med ny information och skickar tillbaka information som antingen är sann eller falsk
 */