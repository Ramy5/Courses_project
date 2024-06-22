import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AddStudent,
  Dashboard,
  Login,
  StudentProfile,
  Students,
} from "./pages";
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

  // const fakeStudentData = {
  //   email_login: "student@example.com",
  //   password_login: "password123",
  //   confirm_password_login: "password123",
  //   fullName_personal: "John Doe",
  //   nationality_personal: "American",
  //   id_number_personal: "123456789",
  //   country_residence_personal: "United States",
  //   educational_qualification_personal: "High School Diploma",
  //   address_personal: "1234 Elm Street, Springfield, IL 62704",
  //   date_birth_personal: new Date("2005-06-15"),
  //   type_personal: "male",
  //   image_upload_personal: [],
  //   fullName_father: "Richard Roe",
  //   email_father: "richard.roe@example.com",
  //   phone_father: "9876543210",
  //   country_father: "United States",
  //   address_father: "5678 Maple Avenue, Springfield, IL 62704",
  //   number_academic: "2023-001",
  //   program_academic: "Computer Science",
  //   level_academic: "Undergraduate",
  //   division_number_academic: "101",
  //   join_date_academic: new Date("2023-09-01"),
  // };

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
          <Route path="/students/addStudent" element={<AddStudent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
