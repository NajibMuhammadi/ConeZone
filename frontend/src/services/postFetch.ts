import axios from 'axios';
import { urls } from "../../url";
import { LoginType, RegisterType } from "../types/interfaces";

interface loginResponseProps {
        data: {
        success: boolean;
        message: string;
        data: {
          UserID: string;
          username: string;
          email: string;
          isAdmin: boolean;
        };
      };
      token: string;
}

const postFetch = async (urlKey: string, data: RegisterType | LoginType): Promise<loginResponseProps> => {
    const url = urls[urlKey]; 

    if (!url) {
        throw new Error('Url hittades inte');
    }

    try {
        const response = await axios.post(url, data); 
        return response.data;
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