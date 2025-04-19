import App from "@/pages";
import Dashboard from "@/pages/dashboard/dashboard";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    Component: App,
    children: [{
      path: "/",
      element: <Dashboard />,
      errorElement: <div>error</div>,
    }]
  },
]);

export default router;