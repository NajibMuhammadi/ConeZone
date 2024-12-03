import axios, { AxiosError } from "axios";
import { urls } from "../../url";

const deleteItem = async (itemsUrl: string, sk:string) : Promise<void> => {
    const token = sessionStorage.getItem('token');
    if(!token) {
        throw new Error ('Ingen token hittad')
    }
    const url = urls[itemsUrl];
    if (!url) {
        throw new Error('Url hittades inte');
    } 

    try {
        await axios.delete(`${url}/${sk}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
    } catch (error: AxiosError | any) {
        console.error('Fel när produkten raderas:', error.response?.data || error.message);
        throw new Error(`Kunde inte radera produkten: ${error?.response?.data?.message || error.message}`);
    }
}

export { deleteItem }

/**
 * Författare Ida
 * En funktion som raderar en produkt från databasen
 */