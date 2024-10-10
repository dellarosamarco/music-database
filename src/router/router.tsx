import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";
import { routes } from "./routes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: routes,
        errorElement: <Navigate to="/" replace />
    }
]);