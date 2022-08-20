import * as React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import Register from "../components/Register";
import {renderWithRouterAndProviders} from "../testUtils.js";


describe('Registration Form', () => {

    describe('check for the presence of fields in the submit request', () => {
        it('Will display an error is the email field is omitted', () => {
            renderWithRouterAndProviders(<Register/>)


            const usernameInput = screen.getByTestId('username-input');
            fireEvent.change(usernameInput, {target: {value: 'fugazi'}});

            const passwordInput = screen.getByTestId('password-input');
            fireEvent.change(passwordInput, {target: {value: 'fugazi123'}});


            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);

            // expect(screen.queryByTestId('success-header')).not.toBeInTheDocument();
            expect(screen.getByTestId('error-header')).toBeInTheDocument();
        });

        it('should display eny error is the username is not omitted', () => {
            renderWithRouterAndProviders(<Register/>)

            const passwordInput = screen.getByTestId('password-input');
            fireEvent.change(passwordInput, {target: {value: 'fugazi123'}});

            const emailInput = screen.getByTestId('email-input');
            fireEvent.change(emailInput, {target: {value: 'fugazi123@gmail.com'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);


            expect(screen.getByTestId('error-header')).toBeInTheDocument();
        })

        it('should display eny error is the password is not omitted', () => {
            renderWithRouterAndProviders(<Register/>)

            const usernameInput = screen.getByTestId('username-input');
            fireEvent.change(usernameInput, {target: {value: 'fugazi'}});


            const emailInput = screen.getByTestId('email-input');
            fireEvent.change(emailInput, {target: {value: 'fugazi123@gmail.com'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);


            expect(screen.getByTestId('error-header')).toBeInTheDocument();
        })

        it('should not display eny error is the email and username is not omitted', () => {
            renderWithRouterAndProviders(<Register/>)

            const usernameInput = screen.getByTestId('username-input');
            fireEvent.change(usernameInput, {target: {value: 'fugazi'}});

            const passwordInput = screen.getByTestId('password-input');
            fireEvent.change(passwordInput, {target: {value: 'fugazi123'}});

            const emailInput = screen.getByTestId('email-input');
            fireEvent.change(emailInput, {target: {value: 'fugazi123@gmail.com'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);


            expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
        })

    })

    describe('check validity of input properties', () => {
        it('should show an error if the email field is not not avalid email', () => {
            renderWithRouterAndProviders(<Register/>)

            const emailInput = screen.getByTestId('email-input');
            fireEvent.change(emailInput, {target: {value: 'invalidemail@'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);

            expect(screen.getByTestId('invalid-email')).toBeInTheDocument()
        })

        it('should show an error if the username length is less than 3  field is not not avalid email', () => {
            renderWithRouterAndProviders(<Register/>)

            const usernameInput = screen.getByTestId('username-input');
            fireEvent.change(usernameInput, {target: {value: 'fu'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);

            expect(screen.getByTestId('username-length')).toBeInTheDocument()
        })

        it('should show an error if the username length is greater than 20  field is not not avalid email', () => {
            renderWithRouterAndProviders(<Register/>)

            const usernameInput = screen.getByTestId('username-input');
            fireEvent.change(usernameInput, {target: {value: 'usernamewhichisgreaterthan20arenotallowed'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);

            expect(screen.getByTestId('username-length')).toBeInTheDocument()
        })

        it('should show no error if the username length is greater than 3 and less than 20', () => {
            renderWithRouterAndProviders(<Register/>)

            const usernameInput = screen.getByTestId('username-input');
            fireEvent.change(usernameInput, {target: {value: 'johnmack47'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);

            expect(screen.queryByTestId('username-length')).not.toBeInTheDocument()
        })
    })


    // it('will display an error if all fields except the department are submitted', () => {
    //     var component = render(<ContactUsForm />);
    //
    //     var input = component.getByTestId('email-input');
    //     fireEvent.change(input, { target: { value: 'myEmail@udacity.com' } });
    //     var textarea = component.getByTestId('question-textarea');
    //     fireEvent.change(textarea, { target: { value: 'my question' } });
    //     var submitButton = component.getByTestId('submit-button');
    //     fireEvent.click(submitButton);
    //     expect(component.queryByTestId('success-header')).not.toBeInTheDocument();
    //     expect(component.getByTestId('error-header')).toBeInTheDocument();
    // });
    //
    // it('will display an error if all fields except the question are submitted', () => {
    //     var component = render(<ContactUsForm />);
    //
    //     var input = component.getByTestId('email-input');
    //     fireEvent.change(input, { target: { value: 'myEmail@udacity.com' } });
    //     var select = component.getByTestId('department-select');
    //     fireEvent.change(select, { target: { value: 'sales' } });
    //     var submitButton = component.getByTestId('submit-button');
    //     fireEvent.click(submitButton);
    //     expect(component.queryByTestId('success-header')).not.toBeInTheDocument();
    //     expect(component.getByTestId('error-header')).toBeInTheDocument();
    // });

    // it('will display a success message if all fields are submitted', () => {
    //     var component = render(<ContactUsForm />);
    //
    //     var input = component.getByTestId('email-input');
    //     fireEvent.change(input, { target: { value: 'myEmail@udacity.com' } });
    //     var select = component.getByTestId('department-select');
    //     fireEvent.change(select, { target: { value: 'sales' } });
    //     var textarea = component.getByTestId('question-textarea');
    //     fireEvent.change(textarea, { target: { value: 'my question' } });
    //     var submitButton = component.getByTestId('submit-button');
    //     fireEvent.click(submitButton);
    //     expect(component.getByTestId('success-header')).toBeInTheDocument();
    //     expect(component.queryByTestId('error-header')).not.toBeInTheDocument();
    // });
});