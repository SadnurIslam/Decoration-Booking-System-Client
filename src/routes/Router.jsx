import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/services/Services";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: "/services",
                Component: Services
            }
        ]
    }
]);