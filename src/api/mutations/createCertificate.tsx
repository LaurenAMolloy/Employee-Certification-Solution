import type { Certificate } from "../types/certificate";
import type { ActionFunctionArgs } from 'react-router-dom';
import type { createCertificateInput } from '../types/createCertificateInput';

const APIKEY = import.meta.env.VITE_SUBMISSION_API_KEY;

export async function createCertificateAction({ request }: ActionFunctionArgs): Promise<Certificate[]> {
    try {
        const formData = await request.formData();

        const apiPayload: createCertificateInput = {
        address_to: formData.get("addressTo") as string,
        purpose: formData.get("purpose") as string,
        issued_on: formData.get("issuedOn") as string,
        employee_id: formData.get("employeeId") as string,
        };
        
        const response = await fetch(`https://zalexinc.azure-api.net/request-certificate?subscription-key=${APIKEY}`,
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(apiPayload)
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
         
    } catch (error) {
        console.error("Network Error:", error);
        return [];
}
}