import { Link } from 'react-router-dom';
import { Form, useActionData, useNavigation} from 'react-router-dom';

export default function CertificateForm() {

    const actionData = useActionData();
    const errors = actionData?.errors;
    const success = actionData?.success;
    //Capture the routing state to determine if the form is currently submitting
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post"
    className="flex flex-col space-y-4 p-6 rounded-lg shadow-md max-w-md mx-auto" 
    >
        <label htmlFor='addressTo'>Address To</label>
        <textarea 
        name="addressTo" 
        id="addressTo" 
        className="border-gray-200 border-2 rounded-md p-2"
        >
        </textarea>
        {errors?.addressTo?.[0] && (
          <p className='text-red-500'>
            {errors.addressTo[0]}</p>
        )}
    
        <label htmlFor="purpose">Purpose</label>
        <textarea 
        name="purpose" 
        id="purpose"
        className="border-gray-200 border-2 rounded-md p-2"
        >
        </textarea>
        {errors?.purpose?.[0] && (
          <p className='text-red-500'>{errors.purpose[0]}</p>
        )}

        <label htmlFor="issuedOn">Date</label>
        <input 
        type="date" 
        id="issuedOn" 
        name="issuedOn"
        className="border-gray-200 border-2 rounded-md p-2">
        </input>
        {errors?.issuedOn?.[0] && (
          <p className='text-red-500'>{errors.issuedOn[0]}</p>
        )}
        <label 
        htmlFor="employeeId">Employee Id</label>
        <input 
        type="text" 
        id="employeeId" 
        name="employeeId"
        className="border-gray-200 border-2 rounded-md p-2">
        </input>
         {errors?.employeeId?.[0] && (
          <p className='text-red-400'>{errors.employeeId[0]}</p>
        )}
         {success && <p className="text-green-500">Certificate Submitted!!</p>}

        <button 
        disabled={isSubmitting}
        type="submit"
        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-700 text-center">
         { isSubmitting ? "Submitting..." : "Submit Request"}
        </button> 

        <Link to="/requests" 
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 text-center">View all requests</Link>
    </Form>
  )
}
