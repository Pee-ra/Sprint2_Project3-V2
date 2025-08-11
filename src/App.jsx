import React from 'react'
import Navber from './components/Navber'
import Profile from './views/Profile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './views/Home';
import Pricing from './views/Pricing';
import Tracking from './views/Tracking';
import BookService from './views/BookService';
import MyOrder from './views/MyOrder';

const router = createBrowserRouter([
  {
  path : "/",
  element : <Navber/>,
  errorElement : (<div>
    <h1 className="text-2xl font-bold mb-4 object-center">404 - page Not Found</h1>
  </div>),
  children : [
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "pricing",
        element : <Pricing/>
      },
      {
        path : "tracking",
        element : <Tracking/>
      },
      {
        path : "bookService",
        element : <BookService/>
      },
      {
        path : "myOder",
        element : <MyOrder/>
      },
      {
        path : "profile",
        element : <Profile/>
      },
    ],
  },
]);





const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App