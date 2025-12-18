import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/services/Services";
import ServiceDetails from "../pages/services/ServiceDetails";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/user/Dashboard";
import MyBookings from "../pages/Dashboard/user/MyBookings";
import PaymentSuccess from "../pages/Dashboard/user/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/user/PaymentCancel";
import MyProfile from "../pages/Dashboard/user/MyProfile";
import PaymentHistory from "../pages/Dashboard/user/PaymentHistory";
import ManageServices from "../pages/Dashboard/admin/ManageServices";
import ManageBookings from "../pages/Dashboard/admin/ManageBookings";
import ManageDecorators from "../pages/Dashboard/admin/ManageDecorators";

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
            },
            {
                path: "/about",
                Component: About
            },
            {
                path: "/contact",
                Component: Contact
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
    },
    {
        path: "/dashboard",
        Component: DashboardLayout,
        children:[
            {
                index: true,
                Component: MyProfile
            },
            {
                path: "my-bookings",
                Component: MyBookings
            },
            {
                path: "payment-success",
                Component: PaymentSuccess
            },
            {
                path: "payment-cancel",
                Component: PaymentCancel
            },
            {
                path: "payments",
                Component: PaymentHistory
            },
            {
                path: "manage-services",
                element: <ManageServices></ManageServices>
            },
            {
                path: "manage-bookings",
                element: <ManageBookings></ManageBookings>
            },
            {
                path: "manage-decorators",
                element: <ManageDecorators></ManageDecorators>
            }
        ]
    }
]);