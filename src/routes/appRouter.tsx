import React from 'react';
import App from 'App';
import RouteErrorComponent from 'components/routeErrorComponent';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import graphRoute from 'routes/graphRoute';
import tableRoute from 'routes/tableRoute';

const appRouter = createBrowserRouter([
  {
    path: '/',
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
