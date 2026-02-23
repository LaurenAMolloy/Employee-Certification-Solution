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
            console.error("API Error:", response.status, response.statusText);
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data as Certificate;
}
