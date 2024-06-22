import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Login, StudentProfile, Students } from "./pages";
import { Home, StructurePage } from "./pages";
import { useRTL } from "./hooks/useRTL";
import { useLayoutEffect } from "react";
import InformationPanel from "./pages/AdminPages/InformationPanel";
import Programs from "./pages/AdminPages/Programs/Programs";
import Instructors from "./pages/AdminPages/Instructors/Instructors";
import InstructorPersonalProfile from "./pages/AdminPages/Instructors/InstructorPersonalProfile";
import InstructorEditProfile from "./pages/AdminPages/Instructors/InstructorEditProfile";
import ProgramInformation from "./pages/AdminPages/Programs/ProgramInformation";
import ViewCourseDescription from "./pages/AdminPages/Programs/ViewCourseDescription";
import CreateProgram from "./pages/AdminPages/Programs/CreateProgram";
import CreateCourses from "./pages/AdminPages/Programs/CreateCourses";

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
          {/* INFORMATION PANEL */}
          <Route path="/informationPanel" element={<InformationPanel />} />

          {/* PROGRAMMES */}
          <Route path="/programs" element={<Programs />} />
          <Route
            path="/programs/programInfo/:id"
            element={<ProgramInformation />}
          />
          <Route
            path="/programs/courseDescription/:id"
            element={<ViewCourseDescription />}
          />
          <Route path="/programs/create" element={<CreateProgram />} />
          <Route path="/programs/courses/create" element={<CreateCourses />} />

          {/* INSTRUCTORS */}
          <Route path="/instructors" element={<Instructors />} />
          <Route
            path="/instructors/instructorProfile/:id"
            element={<InstructorPersonalProfile />}
          />
          <Route
            path="/instructors/instructorEdit/:id"
            element={<InstructorEditProfile />}
          />

          {/* STUDENTS */}
          <Route path="/students" element={<Students />} />
          <Route path="/studentProfile/:id" element={<StudentProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
