import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { BookProvider } from "../context/BookContext";

const HomePageLayout = () => {
  return (
    <BookProvider>  <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
    </div></BookProvider>

  );
};

export default HomePageLayout;