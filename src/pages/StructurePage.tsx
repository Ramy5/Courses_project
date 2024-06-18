import { Outlet } from "react-router-dom";
import NavBar from "../components/Bars/NavBar";
import SideBar from "../components/Bars/SideBar";

const StructurePage = () => {
  return (
    <div className="grid h-screen grid-cols-view grid-rows-view bg-mainBg">
      <nav className="col-end-3 row-start-1 row-end-2 bg-white col-start-0">
        <NavBar />
      </nav>

      <SideBar />

      <main className="col-start-2 col-end-3 row-start-2 row-end-3 px-2 py-6 mb-10 overflow-y-auto lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default StructurePage;
