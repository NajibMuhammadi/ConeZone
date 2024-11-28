import axios, { AxiosError } from "axios";
import { urls } from "../../url";
import {adminApprove } from "../types/interfaces";

const adminUpdateOrder = async (adminOrderUrl: string, pk: string, sk:string, order: adminApprove) : Promise<void> => {
    const url = urls[adminOrderUrl];

    if (!url) {
        throw new Error('Url hittades inte');
    } 

    try {
        console.log('Order data being sent to backend:', order);
        const apiUrl = `/${url}/${pk}/${sk}`
        await axios.put<adminApprove>(apiUrl, order)
        
    } catch (error: AxiosError | any) {
        console.error('Fel vid uppdatering av order:', error.response);
        throw new Error(`Kunde inte uppdatera ordern: ${error?.response?.data?.message || error.message}`);
    }
}

export { adminUpdateOrder }

/**
 * Författare Ida 
 * En funktion som updatera en order från databasen med ny information från admins
 */