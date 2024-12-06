import axios, { AxiosError } from "axios";
import { urls } from "../../url";

const deleteOrder = async (ordersUrl: string, pk: string, sk:string) : Promise<boolean> => {
    const url = urls[ordersUrl];


    if (!url) {
        throw new Error('Url hittades inte');
    } 

    try {
       const response = await axios.delete(`${url}/${pk}/${sk}?key=key-6GRf3`)
       if (response.status === 200) {
        return true;
        } else {
            return false;
        }
    } catch (error: AxiosError | any) {
        console.error('Fel när ordern raderas:', error.response?.data || error.message);
        if(error instanceof AxiosError && error.response?.data?.success === false) {
            return false
        }
        throw new Error(`Kunde inte radera ordern: ${error?.response?.data?.message || error.message}`);
    }
}

export { deleteOrder }

/**
 * Författare Ida
 * En funktion som raderar en order från databasen
 */