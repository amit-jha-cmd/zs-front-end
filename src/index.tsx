import React from "react";
import ReactDOM from "react-dom/client";
import "index.css";
import reportWebVitals from "reportWebVitals";
import { RouterProvider } from "react-router";
import appRouter from "routes/appRouter";
import {Provider} from "react-redux";
import {store} from "lib/dao/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
    <RouterProvider router={appRouter} />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your lib, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
