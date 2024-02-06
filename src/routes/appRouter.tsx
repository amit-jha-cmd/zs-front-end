import App from "App";
import RouteErrorComponent from "components/routeErrorComponent";
import { Navigate, createBrowserRouter } from "react-router-dom";
import graphRoute from "./graphRoute";
import tableRoute from "./tableRoute";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorComponent />,
    children: [
      { index: true, element: <Navigate to="/graph" replace /> },
      graphRoute,
      tableRoute,
    ],
  },
]);

export default appRouter;
