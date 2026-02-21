import type { ActionFunctionArgs } from 'react-router-dom';
import { createCertificateAction } from '../../api/mutations/createCertificate';
import type { createCertificateInput } from '../../api/types/createCertificateInput';

export default async function certificateAction({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();

        const payload: createCertificateInput = {
        address_to: formData.get("addressTo") as string,
        purpose: formData.get("purpose") as string,
        issued_on: formData.get("issuedOn") as string,
        employee_id: formData.get("employeeId") as string,
        };

        await createCertificateAction(payload);

        return {
            success: true,
            message: "Certificate request submitted successfully!"
        }
    } catch (error) {
        console.error("Error submitting certificate request:", error);
        return {
            success: false,
            message: "Failed to submit certificate request. Please try again."
        }
    }
}