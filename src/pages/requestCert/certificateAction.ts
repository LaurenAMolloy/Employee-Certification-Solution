import type { ActionFunctionArgs } from 'react-router-dom';
import { createCertificate } from '../../api/mutations/createCertificate';
import { certificateSchema } from './schema';

export default async function certificateAction({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();

        const rawData = {
        addressTo: formData.get("addressTo")?.toString() || "",
        purpose: formData.get("purpose")?.toString() || "",
        issuedOn: formData.get("issuedOn")?.toString() || "",
        employeeId: formData.get("employeeId")?.toString() || "",
        };

        const result = certificateSchema.safeParse(rawData)

        if(!result.success) {
            const flattened = result.error.flatten();
            //React router will return the response to the component, we can use it to display errors
            return {
                success: false,
                errors: flattened.fieldErrors
            }
        }

        const validData = result.data;

        await createCertificate({
        address_to: validData.addressTo,
        purpose: validData.purpose,
        issued_on: validData.issuedOn,
        employee_id: validData.employeeId,
        });

        return {
            success: true,
            errors: {}
        }

    } catch (error) {
        console.error("Error in certificateAction:", error);
        return {
            success: false,
            errors: { server: ["An unexpected error occurred. Please try again later."] }
        }
    }
}