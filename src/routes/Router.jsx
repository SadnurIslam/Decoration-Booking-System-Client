import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/services/Services";
import ServiceDetails from "../pages/services/ServiceDetails";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";

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
            },
            {
                path: "/services/:id",
                Component: ServiceDetails
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children:[
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            }
        ]
    }
]);