import Header from "../components/video/Header";
import Sidebar from "../components/video/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { RegistryProvider } from "../context/RegistryContext";

const VideoLayout = () => {
  const location = useLocation();
  const isDetailPage =
    location.pathname.startsWith("/video/") &&
    location.pathname !== "/video" &&
    !location.pathname.startsWith("/video/search") &&
    !location.pathname.startsWith("/video/like") &&
    !location.pathname.startsWith("/video/subscriptions");


  return (
    <RegistryProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          {!isDetailPage && <Sidebar />}
          <div className={isDetailPage ? "flex-1" : "flex-1 ml-64"}>
            <Outlet />
          </div>
        </div>
      </div>
    </RegistryProvider>
  );
};

export default VideoLayout