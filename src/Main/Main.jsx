import { Outlet } from "react-router-dom";
import NavBar from "../Shared/Navbar.jsx";
import Footer from "../pages/Footer/Footer";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
