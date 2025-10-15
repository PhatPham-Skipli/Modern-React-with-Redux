import RegistryLayout from "../layouts/RegistryLayout";
import DetailPage from "../pages/Registry/DetailPage";
import HomePage from "../pages/Registry/HomePage";
import SearchPage from "../pages/Registry/SearchPage";

const RegistryRoutes = [
  {
    path: "/registry",
    element: <RegistryLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "detail/:name",
        element: <DetailPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
];

export default RegistryRoutes;