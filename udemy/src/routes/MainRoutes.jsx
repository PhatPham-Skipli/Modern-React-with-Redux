import MainLayout from "../layouts/MainLayout";
import CompLayout from "../layouts/CompLayout";
import RegistryLayout from "../layouts/RegistryLayout";
import AnimalPage from "../pages/AnimalPage";
import BookPage from "../pages/BookPage";
import HomePage from "../pages/HomePage";
import ImagePage from "../pages/ImagePage";
import ProfileCardPage from "../pages/ProfileCardPage";
import CompRoutes from "./CompRoutes";
import CounterPage from "../pages/CounterPage";
import MapPage from "../pages/MapPage";
import TranslatePage from "../pages/TranslatePage";
import CalculationPage from "../pages/CalculationPage";
import WeatherDashboard from "../pages/WeatherDashboard";

const HomePageRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "image",
        element: <ImagePage />,
      },
      {
        path: "profile-card",
        element: <ProfileCardPage />,
      },
      {
        path: "animal",
        element: <AnimalPage />,
      },
      {
        path: "book",
        element: <BookPage />,
      },
      {
        path: "comp",
        element: <CompLayout />,
        children: CompRoutes,
      },
      {
        path: "counter",
        element: <CounterPage />,
      },
      {
        path: "map",
        element: <MapPage />,
      },
      {
        path: "translate",
        element: <TranslatePage />,
      },
      {
        path: "calculation",
        element: <CalculationPage />,
      },
      {
        path: "weather",
        element: <WeatherDashboard />,
      }
    ],
  },
];

export default HomePageRoutes;