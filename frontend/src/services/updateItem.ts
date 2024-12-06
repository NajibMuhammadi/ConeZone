import axios, { AxiosError } from "axios";
import { urls } from "../../url";
import { NewItem } from "../types/interfaces";


const updateItem = async (itemsUrl: string, sk:string, newItem: NewItem) : Promise<void> => {
    const token = sessionStorage.getItem('token');
    if(!token) {
        throw new Error ('Ingen token hittad')
    }

    const url = urls[itemsUrl];

    if (!url) {
        throw new Error('Url hittades inte');
    } 

    try {
        await axios.put(`${url}/${sk}?key=key-6GRf3`, newItem, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        
    } catch (error: AxiosError | any) {
        console.error('Fel vid uppdatering av produkten:', error.response?.data || error.message);
        throw new Error(`Kunde inte uppdatera produkten: ${error?.response?.data?.message || error.message}`);
    }
}

export { updateItem }

/**
 * Författare Ida 
 * En funktion som updatera ett item från databasen med ny information
 */