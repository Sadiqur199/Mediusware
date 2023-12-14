import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import FirstTask from './Component/FirstTask/FirstTask.jsx'
import SecondTask from './Component/SecondTask/SecondTask.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <FirstTask></FirstTask>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);