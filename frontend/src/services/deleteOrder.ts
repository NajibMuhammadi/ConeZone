import axios, { AxiosError } from "axios";
import { urls } from "../../url";

const deleteOrder = async (ordersUrl: string, pk: string, sk:string) : Promise<void> => {
    const url = urls[ordersUrl];


    if (!url) {
        throw new Error('Url hittades inte');
    } 

    try {
        await axios.delete(`${url}/${pk}/${sk}`)
        return;
    } catch (error: AxiosError | any) {
        throw new Error('Kunde inte radera ordern');
    }
}

export { deleteOrder }

/**
 * Författare Ida
 * En funktion som raderar en order från databasen
 */