import {fireEvent, screen} from "@testing-library/react";
import NewWebsite from "../components/NewWebsite.js";
import * as React from "react";
import {renderWithRouterAndProviders} from "../testUtils.js";


describe('Website Creation Form', () => {


    describe('check for the presence of fields in the create website request', () => {
        it('Will display an error is the url field is omitted', () => {
            renderWithRouterAndProviders(<NewWebsite/>)


            const websiteNameInput = screen.getByTestId('website-name-input');
            fireEvent.change(websiteNameInput, {target: {value: 'fugazi'}});

            const categoryInput = screen.getByTestId('category-input');
            fireEvent.change(categoryInput, {target: {value: 'Development'}});


            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);

            // expect(screen.queryByTestId('success-header')).not.toBeInTheDocument();
            expect(screen.getByTestId('error-header')).toBeInTheDocument();
        });

        it('should display eny error is the website name field is not omitted', () => {
            renderWithRouterAndProviders(<NewWebsite/>)

            const categoryInput = screen.getByTestId('category-input');
            fireEvent.change(categoryInput, {target: {value: 'Development'}});

            const urlInput = screen.getByTestId('url-input');
            fireEvent.change(urlInput, {target: {value: 'fugazi123@gmail.com'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);


            expect(screen.getByTestId('error-header')).toBeInTheDocument();
        })

        it('should display eny error is the category is not omitted', () => {
            renderWithRouterAndProviders(<NewWebsite/>)

            const websiteNameInput = screen.getByTestId('website-name-input');
            fireEvent.change(websiteNameInput, {target: {value: 'fugazi'}});

            const urlInput = screen.getByTestId('url-input');
            fireEvent.change(urlInput, {target: {value: 'http://www.udacity.com'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);


            expect(screen.getByTestId('error-header')).toBeInTheDocument();
        })

        it('should not display eny error is the website url, category  is not omitted', () => {
            renderWithRouterAndProviders(<NewWebsite/>)

            const websiteNameInput = screen.getByTestId('website-name-input');
            fireEvent.change(websiteNameInput, {target: {value: 'fugazi'}});

            const categoryInput = screen.getByTestId('category-input');
            fireEvent.change(categoryInput, {target: {value: 'Development'}});

            const urlInput = screen.getByTestId('url-input');
            fireEvent.change(urlInput, {target: {value: 'http://www.udacity.com'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);


            expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
        })

        it('should find the description section on the document', () => {
            renderWithRouterAndProviders(<NewWebsite/>)
            expect(screen.getByText(/Description/i)).toBeInTheDocument()
        })
    })

    describe('check validity of input for the website field', () => {
        it('should show an error if the url field is not a valid url', () => {
            renderWithRouterAndProviders(<NewWebsite/>)

            const urlInput = screen.getByTestId('url-input');
            fireEvent.change(urlInput, {target: {value: 'invalidurl@'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);

            expect(screen.getByTestId('invalid-url')).toBeInTheDocument()
        })

        it('should show an error if the website name length is less than 3  field is not not valid url', () => {
            renderWithRouterAndProviders(<NewWebsite/>)

            const websiteNameInput = screen.getByTestId('website-name-input');
            fireEvent.change(websiteNameInput, {target: {value: 'we'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);

            expect(screen.getByTestId('website-name-length')).toBeInTheDocument()
        })

        it('should show an error if the website name length is greater than 40  field is not not avalid url', () => {
            renderWithRouterAndProviders(<NewWebsite/>)

            const websiteNameInput = screen.getByTestId('website-name-input');
            fireEvent.change(websiteNameInput, {target: {value: 'usernamesernamewhichissernamewhichissernamewhichissernamewhichiswhichisgreaterthan20arenotallowed'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);

            expect(screen.getByTestId('website-name-length')).toBeInTheDocument()
        })

        it('should show no error if the website name length is greater than 3 and less than 40', () => {
            renderWithRouterAndProviders(<NewWebsite/>)

            const websiteNameInput = screen.getByTestId('website-name-input');
            fireEvent.change(websiteNameInput, {target: {value: 'Udacity'}});

            const submitButton = screen.getByTestId('submit-button');
            fireEvent.click(submitButton);

            expect(screen.queryByTestId('website-name-length')).not.toBeInTheDocument()
        })
    })
});