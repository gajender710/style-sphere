import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import mainRoutes, { RouteOption } from "./routes";
import NotFound from "./pages/NotFound";

function App() {
  const routes: RouteObject[] = mainRoutes.map((mainRoute: RouteOption) => {
    function getRoute(route: RouteOption): RouteObject {
      if (route.redirect) {
        return {
          path: route.path,
          element: <Navigate replace to={route.pathTo} />,
        };
      }
      const Component = route.component;
      return {
        path: route.path,
        element: <Component />,
        children: route.subRoutes ? route.subRoutes.map(getRoute) : [],
      };
    }
    return getRoute(mainRoute);
  });

  const router = createBrowserRouter(
    [...routes, { path: "*", element: <NotFound /> }],
    {}
  );

  return <RouterProvider router={router} />;
}

export default App;
