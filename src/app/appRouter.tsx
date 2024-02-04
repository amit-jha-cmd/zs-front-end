import App from "App";
import ErrorComponent from "components/ErrorComponent";
import TimeSeries from "features/graph/TimeSeries";
import AppTable from "features/table/AppTable";
import { Navigate, createBrowserRouter } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      { index: true, element: <Navigate to="/graph" replace /> },
      {
        path: "graph",
        element: <TimeSeries />,
      },
      {
        path: "table",
        element: <AppTable />,
      },
    ],
  },
]);

export default appRouter;
