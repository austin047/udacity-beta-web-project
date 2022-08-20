import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {render} from "@testing-library/react";
import setupStore from "./store.js";


export const renderWithRouterAndProviders = (
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore,
        ...renderOptions
    } = {}
) => {
    function Wrapper({children}) {
        return <MemoryRouter> <Provider store={store}>{children}</Provider> </MemoryRouter>
    }

    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}