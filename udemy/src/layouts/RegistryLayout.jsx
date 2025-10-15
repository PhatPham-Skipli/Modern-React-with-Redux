import Header from "../components/registry/Header";
import { Outlet } from "react-router-dom";
import { RegistryProvider } from "../context/RegistryContext";

const RegistryLayout = () => {
  return (
    <RegistryProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </RegistryProvider>
  );
};

export default RegistryLayout;