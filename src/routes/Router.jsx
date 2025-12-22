import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/Services/ServiceDetails";
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
import DecoratorApply from "../pages/Dashboard/user/DecoratorApply";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

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
            },
            {
                path: "*",
                Component: ErrorPage
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
            },
            {
                path: "*",
                Component: ErrorPage
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path: "profile",
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: "my-bookings",
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
            },
            {
                path: "payment-success",
                element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>
            },
            {
                path: "payment-cancel",
                element: <PrivateRoute><PaymentCancel></PaymentCancel></PrivateRoute>
            },
            {
                path: "payments",
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            },
            {
                path: "decorator-apply",
                element: <PrivateRoute><DecoratorApply></DecoratorApply></PrivateRoute>
            },
            {
                path: "manage-services",
                element: <AdminRoute><ManageServices></ManageServices></AdminRoute>
            },
            {
                path: "manage-bookings",
                element: <AdminRoute><ManageBookings></ManageBookings></AdminRoute>
            },
            {
                path: "manage-decorators",
                element: <AdminRoute><ManageDecorators></ManageDecorators></AdminRoute>
            },
            {
                path: "*",
                Component: ErrorPage
            }
        ]
    }
]);