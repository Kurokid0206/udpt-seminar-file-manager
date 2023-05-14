import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import AppBar from "./TopBar";

const Home: React.FC = () => {
  return (
    <div className="layout-container w-full h-screen overflow-hidden flex flex-col gap-2">
      <div className="top-bar-container w-full drop-shadow-lg">
        <AppBar />
      </div>
      <div className="main-container flex-1">
        <Outlet />
      </div>
      <div className="footer-container w-full">
        <Footer></Footer>
      </div>
    </div>
  );
};
export default Home;
