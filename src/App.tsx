import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Login } from "./pages";
import { Home, StructurePage } from "./pages";
import { useRTL } from "./hooks/useRTL";
import { useLayoutEffect } from "react";
import InformationPanel from "./pages/AdminPages/InformationPanel";
import Programs from "./pages/AdminPages/Programs";
import Instructors from "./pages/AdminPages/Instructors/Instructors";
import InstructorPersonalProfile from "./pages/AdminPages/Instructors/InstructorPersonalProfile";
import InstructorEditProfile from "./pages/AdminPages/Instructors/InstructorEditProfile";

function App() {
  const isRTL = useRTL();

  useLayoutEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = isRTL ? "ar" : "en";
  }, [isRTL]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<StructurePage />}>
          <Route path="/informationPanel" element={<InformationPanel />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/instructorProfile/:id" element={<InstructorPersonalProfile />} />
          <Route path="/instructorEdit/:id" element={<InstructorEditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
