import type { Certificate } from "../types/certificate";
import type { CreateCertificateApiInput } from '../types/createCertificateApiInput';

const APIKEY = import.meta.env.VITE_SUBMISSION_API_KEY;
 
export async function createCertificate(
    payload: CreateCertificateApiInput 
): Promise<Certificate> {

        const response = await fetch(`https://zalexinc.azure-api.net/request-certificate?subscription-key=${APIKEY}`,
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        if(!response.ok) {
            //This will be any so we need to type it as an error response
            const errorData = await response.json();
            console.error("API Error:", errorData);
        }

        const data = await response.json();
        console.log(data)
        return data as Certificate;
}
