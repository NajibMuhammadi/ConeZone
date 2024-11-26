import axios from 'axios';
import { urls } from "../../url";
import { LoginType, RegisterType } from "../types/interfaces";

interface loginResponseProps {
    data: {
        message: string;
        success: boolean;
    }
    body: {
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
        const response = await axios.post<loginResponseProps>(url, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            let errorMessage = error.response.data.data || JSON.stringify(error.response.data);
            try {
                errorMessage = JSON.parse(errorMessage);
            } catch (e) {
                console.error('Error parsing error message:', e);
            }
            throw new Error(errorMessage);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};


export { postFetch };

/* 
 * Författare: Najib
 * Postar data till en databas
 */

/* Edited: Diliara
fixade error hantering */