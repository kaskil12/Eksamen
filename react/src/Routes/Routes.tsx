import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Hjemmeside from "../Pages/Hjemmeside/Hjemmeside";
import AdminSide from "../Pages/AdminSide/AdminSide";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Hjemmeside />,
      },
      {
        path: "/admin",
        element: isAdmin() ? <AdminSide /> : <Navigate to="/" />,
      },
    ],
  },
]);

function isAdmin() {
  return localStorage.getItem("isAdmin") === "true";
}