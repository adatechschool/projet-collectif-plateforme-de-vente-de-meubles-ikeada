import React from 'react';
import ReactDOM from 'react-dom/client'
import { App, loader as rootLoader } from "./routes/App.jsx";
import ErrorPage from './ErrorPage.jsx';
import CardList from './routes/CardList.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "CardList/",
        element: <CardList />,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
