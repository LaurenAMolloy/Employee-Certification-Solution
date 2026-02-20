
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from "zod";

const APIKEY = import.meta.env.VITE_SUBMISSION_API_KEY;

export default function CertificateForm() {
    //Success message
    const[success, setSuccess] = useState(false);
    //Disable submit button until form is valid
    const[isDisabled, setIsDisabled] = useState(true);
    //State to hold form errors
    const[errors, setErrors] = useState<Record<string, string[]>>({})

    type CertificateFormData = {
        addressTo: string;
        purpose: string;
        issuedOn: string;
        employeeId: string;
    }

    const[certificate, setCertificate] = useState<CertificateFormData>({
        addressTo: "",
        purpose: "",
        issuedOn: "",
        employeeId: ""
    })

    //zod schema
    const certificateSchema = z.object({
       address_to: z.string()
            .trim()
            .min(1,{ message: "Address is required" }),

       purpose: z.string()
            .trim()
            .min(1, { message: "Purpose is required" } ),

       issuedOn: z.string()
            .trim()
            .min(1, { message: "Issued date is required!" })
            .refine((date) => {
             const parsedDate = new Date(date);
             const today = new Date();
             today.setHours(0, 0, 0, 0);
             return parsedDate >= today;
            }, {
          message: "Issued date cannot be in the past",
        }),

       employeeId: z.string()
            .trim()
            .min(1, { message: "Employee ID is required" })
            //Regex = string, digit plus 1 end of string
            .regex(/^\d+$/, { message: "Employee ID must contain only digits" })
    })
    

    const handleChange = (e) => {
        const updated = {
            ...certificate,
            [e.target.name]: e.target.value
        }

        setCertificate(updated);

        const result = certificateSchema.safeParse(updated);
        
        if (!result.success) {
            const formattedErrors = z.treeifyError(result.error);
            setErrors(formattedErrors.properties ?? {});
            setIsDisabled(true);
            } else {
            setErrors({})
            setIsDisabled(false);
        }
        // {
        // errors: [],
        //     properties: {
        //         addressTo: { errors: ["Address is required"] },
        //         purpose: { errors: ["Purpose is required"] },
        //         issuedOn: { errors: ["Date cannot be in the past"] },
        //         employeeId: { errors: ["Employee ID must be a number"] }
        //     }
        // }  
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        //Changing case to match API
        const apiPayload = {
            address_to: certificate.addressTo,
            purpose: certificate.purpose,
            issued_on: certificate.issuedOn,
            employee_id: certificate.employeeId
        }

        const response = await fetch(' https://zalexinc.azure-api.net/request-certificate?subscription-key=apiKey', {
            Authentication: APIKEY
            method: "POST",
            //We are sending JSON!
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(apiPayload)
        })

        const data = await response.json();
        console.log(data)
        //show success message!
        setCertificate({
            address_to: "",
            purpose: "",
            issued_on: "",
            employee_id: ""
        })
        
        setTimeout(() => setSuccess(false), 4000);
        if(response.ok) {
          setSuccess(true);
        }   
    }

  return (
    <form 
    className="flex flex-col space-y-4 p-6 rounded-lg shadow-md max-w-md mx-auto" 
    onSubmit={handleSubmit}>
        <label htmlFor='addressTo'>Address To</label>
        <textarea 
        name="addressTo" 
        id="addressTo" 
        value={certificate.address_to}
        onChange={handleChange}
        className="border-gray-200 border-2 rounded-md p-2"
        required>
        </textarea>
        {errors.address_to?.errors?.[0] && (
            <p className='error'>{errors.address_to.errors[0]}</p>
        )}

        <label htmlFor="purpose">Purpose</label>
        <textarea 
        name="purpose" 
        id="purpose"
        value={certificate.purpose}
        onChange={handleChange}
        className="border-gray-200 border-2 rounded-md p-2"
        >
        </textarea>
        {errors.purpose?.errors?.[0] && (
            <p className='error'>{errors.purpose.errors[0]}</p>
        )}

        <label htmlFor="issuedOn">Date</label>
        <input 
        type="date" 
        id="issuedOn" 
        name="issuedOn"
        value={certificate.issued_on}
        onChange={handleChange}
        className="border-gray-200 border-2 rounded-md p-2">
        
        </input>
        {errors.issued_on?.errors?.[0] && (
            <p className='error'>{errors.issued.errors[0]}</p>
        )}

        <label 
        htmlFor="employeeId">Employee Id</label>
        <input 
        type="text" 
        id="employeeId" 
        name="employeeId"
        value={certificate.employee_id}
        onChange={handleChange}
        className="border-gray-200 border-2 rounded-md p-2">
        </input>
         {errors.employee_id?.errors?.[0] && (
            <p className='error'>{errors.employee_id.errors[0]}</p>
        )}

        {success && <p className="success-message">Certificate Submitted!!</p>}
        
        <button disabled={isDisabled} className={isDisabled ? "button-primary:disabled" : "disabled" }>Submit Request</button>
        <Link to="/requests" 
        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">View all requests</Link>
    </form>
  )
}
