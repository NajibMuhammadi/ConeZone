import axios, { AxiosError } from "axios";
import { urls } from "../../url";
import { ItemType } from "../types/interfaces";


const postItem = async (itemsUrl: string, newItem: ItemType) : Promise<void> => {
    const token = sessionStorage.getItem('token');
    if(!token) {
        throw new Error ('Ingen token hittad')
    }

    const url = urls[itemsUrl];

    if (!url) {
        throw new Error('Url hittades inte');
    } 

    try {
        await axios.post(`${url}?key=key-6GRf3`, newItem, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        
    } catch (error: AxiosError | any) {
        console.error('Fel vid tilläggning av ny produkt:', error.response?.data || error.message);
        throw new Error(`Kunde inte lägga till produkten till databasen: ${error?.response?.data?.message || error.message}`);
    }
}

export { postItem }

/**
 * Författare Ida 
 * En funktion som lägger till en ny produkt till databasen 
 */