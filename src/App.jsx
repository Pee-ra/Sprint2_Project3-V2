import React from "react";
import Navber from "./components/Navber";
import Profile from "./views/Profile";
import {Home} from "./views/Home";
import Pricing from "./views/Pricing";
import Tracking from "./views/Tracking";
import BookService from "./views/BookService";
import MyOrder from "./views/MyOrder";
import Login from "./views/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import Register from "./views/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
   {
    path: "/login",
    element: <Login />,
  },
   {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/home",
    element: <Navber />,
    errorElement: (
      <div>
        <h1 className="text-2xl font-bold mb-4 object-center">
          404 - page Not Found
        </h1>
      </div>
    ),
    children: [
      { path: "/home", element: <Home /> },
      { path: "/home/pricing", element: <Pricing /> },
      { path: "/home/tracking", element: <Tracking /> },
      { path: "/home/bookService", element: <BookService /> },
      { path: "/home/myOder", element: <MyOrder /> },
      { path: "/home/profile", element: <Profile /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;

