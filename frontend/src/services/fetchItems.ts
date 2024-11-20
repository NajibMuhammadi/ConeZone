import axios from "axios";
import { ItemType } from "../types/interfaces";
import { urls } from "../../url";

const fetchItems = async (itemsUrl: string) : Promise<ItemType[]> => {
    const url = urls[itemsUrl];

    if(!url) {
        throw new Error ('Url hittades inte')
    }
    try {
        const response = await axios.get<ItemType[]>(url); 
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error('Ett fel inträffade vid hämtning av data');
    }
}
export {fetchItems}

/**
 * Författare Ida
 * Läser in en url från en lokal fil
 * Hämtar ut rätt url från ett objekt med urls och just den url som heter itemsUrl
 * Om en url hittas hämtas datan från databasen och returneras till funktionen som behöver datan.
*/