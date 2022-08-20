import {screen} from '@testing-library/react';
import App from "../App.js";
import {renderWithRouterAndProviders} from "../testUtils.js";


test('full app rendering/navigating', async () => {
    renderWithRouterAndProviders(<App/>)

    /// verify page content for default route
    expect(screen.getByText(/Website Reviews/i)).toBeInTheDocument()

})
