import type { Certificate } from "../../api/types/certificate";
import { getCertificates } from "../../api/queries/getCertificates";

// This loader function will be used to fetch the list of certificates before rendering the CertificateListPage component.
export interface CertificateListLoaderResult {
  certificates: Certificate[];
}

export default async function certificatesListLoader(): Promise<CertificateListLoaderResult> {
    const certificates = await getCertificates();

    if(!certificates ||certificates.length === 0) {
        throw new Response("No certificates found", { status: 404 });
    } 

    return { certificates } ;  
}
