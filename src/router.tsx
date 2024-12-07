import { createBrowserRouter, Navigate } from "react-router-dom";
import { Navbar } from "./compontents/Navbar";
import { Home } from "./pages/Home";
import { UserPage } from "./compontents/UserPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: ":userName",
        element: <UserPage />,
      },
    ],
  },
]);
