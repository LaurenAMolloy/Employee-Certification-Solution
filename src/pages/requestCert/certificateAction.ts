import type { ActionFunctionArgs } from 'react-router-dom';
import { createCertificate } from '../../api/mutations/createCertificate';
import { certificateSchema } from './schema';
import type { CreateCertificateApiInput } from '../../api/types/createCertificateApiInput';

export default async function certificateAction({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        
        //Safe parse needs a plain object
        const rawData = {
        addressTo: formData.get("addressTo")?.toString() || "",
        purpose: formData.get("purpose")?.toString() || "",
        issuedOn: formData.get("issuedOn")?.toString() || "",
        employeeId: formData.get("employeeId")?.toString() || "",
        };
        
        //safeParse will validate the data and return either the valid data or the errors, we can use this to ensure we are sending correct data to the API and also to display errors to the user if the validation fails
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
        console.log("Valid Data:", validData)

        const apiPayload: CreateCertificateApiInput = {
        address_to: validData.addressTo,
        purpose: validData.purpose,
        issued_on: validData.issuedOn,
        employee_id: validData.employeeId,
        };

        await createCertificate(apiPayload)

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