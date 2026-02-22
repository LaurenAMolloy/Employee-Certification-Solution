import { createRoutesStub } from "react-router-dom"
import { 
    render, 
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from "../../components/Form";
import { test } from "vitest";

//When the form submits
//The routes run
//Errors are rendered

test("Request form shows errors on submit",  async () => {
    const ADDRESS_MESSAGE = "Address To is required";
    const PURPOSE_MESSAGE = "Purpose is required";
    const DATE_MESSAGE = "Issued date is required!";
    const EMPLOYEE_ID_MESSAGE = "Employee Id is required";

    const Stub = createRoutesStub([
        {
            path: "/",
            Component: Form,
            //This action runs
            //Returns an object of errors
            action() {
                return {
                    errors: {
                        addressTo: [ADDRESS_MESSAGE],
                        purpose: [PURPOSE_MESSAGE],
                        issuedOn: [DATE_MESSAGE],
                        employeeId: [EMPLOYEE_ID_MESSAGE]
                    },
                };
            },
        },
    ]);

    //render the app stub at "/"
    render(<Stub initialEntries={["/"]} />);

    //simulate interactions
    await userEvent.click(screen.getByRole("button", { name: /submit request/i }));

    //assertions
    waitFor(() => screen.findByText(ADDRESS_MESSAGE));
    waitFor(() => screen.findByText(PURPOSE_MESSAGE));
    waitFor(() => screen.findByText(DATE_MESSAGE));
    waitFor(() => screen.findByText(EMPLOYEE_ID_MESSAGE));
})


