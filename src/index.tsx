import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, Navigate} from "react-router-dom";
import TimeSeries from "./features/graph/TimeSeries";
import {RouterProvider} from "react-router";
import AppTable from "./features/table/AppTable";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <h1>Naughty Naughty</h1>,
        children: [
            { index: true, element: <Navigate to="/graph" replace /> },
            {
                path: "graph",
                element: <TimeSeries />
            },
            {
                path: "table",
                element: <AppTable />
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
