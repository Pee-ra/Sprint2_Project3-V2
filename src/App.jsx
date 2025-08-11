import React from 'react'
import Navber from './components/Navber'
import Profile from './views/Profile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
  path : "/",
  element : <Navber/>,
  errorElement : (<div>
    <h1 className="text-2xl font-bold mb-4 object-center">404 - page Not Found</h1>
  </div>),
  children : [
      {
        path : "profile",
        element : <Profile/>,
      }
    ],
  },
]);





const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App