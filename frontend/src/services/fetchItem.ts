import axios, { AxiosError } from "axios";
import { urls } from "../../url";
import { ItemType } from "../types/interfaces";

const fetchItem = async (itemsUrl: string, sk:string) : Promise<ItemType> => {
    const token = sessionStorage.getItem('token');
    if(!token) {
        throw new Error ('Ingen token hittad')
    }

    const url = `${urls[itemsUrl]}/${sk}`;
    if (!url) {
        throw new Error('Url hittades inte');
    } 

    try {
        const response = await axios.get<ItemType>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        return response.data;
    } catch (error: AxiosError | any) {
        console.error('Fel vid hämtning av föremål:', error.response);
        throw new Error(`Kunde inte hämta föremålet: ${error?.response?.data?.message || error.message}`);
    }
}

export { fetchItem }

/**
 * Författare Ida
 * En funktion som hämtar ett item från databasen och returnerar datan
 */