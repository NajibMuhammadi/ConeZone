import axios, { AxiosError } from "axios";
import { urls } from "../../url";
import {adminApprove } from "../types/interfaces";

const adminUpdate = async (adminOrdersUrl: string, pk: string, sk:string, order: adminApprove) : Promise<void> => {
    const url = urls[adminOrdersUrl];

    const token = sessionStorage.getItem('token');
    if(!token) {
        throw new Error ('Ingen token hittad')
    }

    if (!url) {
        throw new Error('Url hittades inte');
    } 

    try {
        await axios.put(`${url}/${pk}/${sk}?key=key-6GRf3`, order, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    } catch (error: AxiosError | any) {
        console.error('Fel vid uppdatering av order:', error.response);
        throw new Error(`Kunde inte uppdatera ordern: ${error?.response?.data?.message || error.message}`);
    }
}

export { adminUpdate }

/**
 * Författare Ida 
 * En funktion som updatera en order från databasen med ny information från admins
 */