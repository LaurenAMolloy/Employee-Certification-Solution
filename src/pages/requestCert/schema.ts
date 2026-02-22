import { z } from "zod";

//zod schema
    export const certificateSchema = z.object({
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