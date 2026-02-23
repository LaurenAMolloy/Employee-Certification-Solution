import type { Certificate } from "../types/certificate";

const APIKEY = import.meta.env.VITE_SUBMISSION_API_KEY;

export async function getCertificates(): Promise<Certificate[]> {
        const response = await fetch(`https://zalexinc.azure-api.net/request-list?subscription-key=${APIKEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Certificate[] = await response.json();
        return data;
}
