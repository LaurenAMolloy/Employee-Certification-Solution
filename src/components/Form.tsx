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
    //Something like this employeeId: ["Employee ID must be a number"],
    const[errors, setErrors] = useState<Record<string, string[]>>({})

    type CertificateFormData = {
        addressTo: string;
        purpose: string;
        issuedOn: string;
        employeeId: string;
    }
    
    //Initial form state
    const[certificate, setCertificate] = useState<CertificateFormData>({
        addressTo: "",
        purpose: "",
        issuedOn: "",
        employeeId: ""
    })

    //zod schema
    const certificateSchema = z.object({
       addressTo: z.string()
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
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const updated = {
            ...certificate,
            [e.currentTarget.name]: e.currentTarget.value
        }

        setCertificate(updated);

        const result = certificateSchema.safeParse(updated);
        
        if (!result.success) {
            const flattened = result.error.flatten();
            setErrors(flattened.fieldErrors ?? {});
            setIsDisabled(true);
            } else {
            setErrors({})
            setIsDisabled(false);
        }
         
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        //Changing case to match API
        const apiPayload = {
            address_to: certificate.addressTo,
            purpose: certificate.purpose,
            issued_on: certificate.issuedOn,
            employee_id: certificate.employeeId
        }

        try {
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
            alert("There was an error submitting your request. Please try again.");
            return;
        }

        const data = await response.json();
        console.log(data)
        
        setSuccess(true);
        setCertificate({
            addressTo: "",
            purpose: "",
            issuedOn: "",
            employeeId: ""
        })
        
        setTimeout(() => setSuccess(false), 4000);
         
    } catch (error) {
        console.error("Network Error:", error);
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
        value={certificate.addressTo}
        onChange={handleChange}
        className="border-gray-200 border-2 rounded-md p-2"
        >
        </textarea>
        {errors.addressTo?.[0] && <p>{errors.addressTo[0]}</p>}
    
        <label htmlFor="purpose">Purpose</label>
        <textarea 
        name="purpose" 
        id="purpose"
        value={certificate.purpose}
        onChange={handleChange}
        className="border-gray-200 border-2 rounded-md p-2"
        >
        </textarea>
        {errors.purpose?.[0] && <p>{errors.purpose[0]}</p>}


        <label htmlFor="issuedOn">Date</label>
        <input 
        type="date" 
        id="issuedOn" 
        name="issuedOn"
        value={certificate.issuedOn}
        onChange={handleChange}
        className="border-gray-200 border-2 rounded-md p-2">
        </input>
        {errors.issuedOn?.[0] && <p>{errors.issuedOn[0]}</p>}

        <label 
        htmlFor="employeeId">Employee Id</label>
        <input 
        type="text" 
        id="employeeId" 
        name="employeeId"
        value={certificate.employeeId}
        onChange={handleChange}
        className="border-gray-200 border-2 rounded-md p-2">
        </input>
        {errors.employeeId?.[0] && <p>{errors.employeeId[0]}</p>}
        {success && <p className="success-message">Certificate Submitted!!</p>}
        <button
            disabled={isDisabled}
            className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition text-center 
            ${isDisabled 
            ? "bg-gray-200 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
        Submit Request
        </button> 
        
        <Link to="/requests" 
        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">View all requests</Link>
    </form>
  )
}
