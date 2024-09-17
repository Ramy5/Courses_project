import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/Bars/NavBar";
import SideBar from "../components/Bars/SideBar";
import { useEffect, useRef, useState } from "react";

const StructurePage = () => {
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(true);

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

  // Create a ref for the target element

  const { pathname } = useLocation();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <div className="grid h-screen grid-cols-view grid-rows-view bg-mainBg">
      <nav className="col-end-3 row-start-1 row-end-2 bg-white col-start-0">
        <NavBar
          toggleSideBar={toggleSideBar}
          setToggleSideBar={setToggleSideBar}
        />
      </nav>

      <SideBar
        toggleSideBar={toggleSideBar}
        setToggleSideBar={setToggleSideBar}
      />

      <main
        ref={scrollRef}
        className="col-start-2 col-end-3 row-start-2 row-end-3 px-4 py-6 mb-5 overflow-y-auto lg:px-8"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default StructurePage;
