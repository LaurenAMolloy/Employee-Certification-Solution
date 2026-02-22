import type { Certificate } from "../types/certificate";
import type { createCertificateInput } from '../types/createCertificateInput';

const APIKEY = import.meta.env.VITE_SUBMISSION_API_KEY;
 
export async function createCertificate(
    payload: createCertificateInput 
): Promise<Certificate[]> {

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
            const errorData = await response.json();
            console.error("API Error:", errorData);
            return [];
        }

        const data = await response.json();
        console.log(data)
        return data as Certificate[];
}
