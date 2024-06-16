import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Login } from "./pages";
import { Home, StructurePage } from "./pages";
import { useRTL } from "./hooks/useRTL";
import { useLayoutEffect } from "react";
import InformationPanel from "./pages/InformationPanel";
import Lecturers from "./pages/Lecturers";
import Programs from "./pages/Programs";

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
          <Route path="lecturers" element={<Lecturers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
