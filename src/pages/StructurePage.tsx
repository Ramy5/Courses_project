import { Outlet } from "react-router-dom";
import NavBar from "../components/Bars/NavBar";
import SideBar from "../components/Bars/SideBar";
import { useEffect, useState } from "react";

const StructurePage = () => {
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(false)

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 768) {
  //       setToggleSideBar(false);
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);

  //   handleResize();

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <div className="grid h-screen grid-cols-view grid-rows-view bg-mainBg">
      <nav className="col-end-3 row-start-1 row-end-2 bg-white col-start-0">
        <NavBar toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar}/>
      </nav>

      <SideBar toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar}/>

      <main className="col-start-2 col-end-3 row-start-2 row-end-3 px-4 py-6 mb-5 overflow-y-auto lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default StructurePage;
