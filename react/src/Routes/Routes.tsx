import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Hjemmeside from "../Pages/Hjemmeside/Hjemmeside";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Hjemmeside />,
            }
        ],
    }
])