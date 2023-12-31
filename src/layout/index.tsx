import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Home from "@/pages/home";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex flex-col justify-between w-full overflow-x-hidden  min-h-screen ">
      <Nav />

      <Outlet />

      <Footer />
    </div>
  );
};
