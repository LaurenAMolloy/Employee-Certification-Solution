import type { Certificate } from "../../api/types/certificate";
import { getCertificates } from "../../api/queries/getCertificates";

// This loader function will be used to fetch the list of certificates before rendering the CertificateListPage component.
export interface CertificateListLoaderResult {
  certificates: Certificate[];
}

export default async function certificatesListLoader(): Promise<CertificateListLoaderResult> {
  try {
    const certificates = await getCertificates();
    console.log(certificates);
    return { certificates };

  } catch (error) {
    console.error("Error fetching certificates:", error);
    return { certificates: [] }; 
  }
 
}
