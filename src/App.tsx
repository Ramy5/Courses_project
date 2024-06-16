import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Login } from "./pages";
import { useRTL } from "./hooks/useRTL";
import { useLayoutEffect } from "react";

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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
