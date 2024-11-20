import axios from 'axios';
import { urls } from "../../url";
import { RegisterType } from "../types/interfaces";

const postFetch = async (urlKey: string, data: RegisterType): Promise<void> => {
    const url = urls[urlKey]; 

    if (!url) {
        throw new Error('Url hittades inte');
    }

    try {
        const response = await axios.post(url, data); 
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Fel vid registrering');
    }
};

export { postFetch };

/* 
 * Författare: Najib
 * Postar data till en databas
 */