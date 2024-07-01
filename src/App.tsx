import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AddStudent,
  Error,
  LectureManagement,
  Login,
  Reports,
  Settings,
  StudentAddHomework,
  StudentAddProject,
  StudentHomework,
  StudentHomeworkPage,
  StudentProfile,
  StudentProjectPage,
  StudentProjects,
  StudentViewHomework,
  StudentViewProjects,
  StudentVirtualClasses,
  Students,
  TestApproved,
  TestManagement,
  VirtualClasses,
} from "./pages";
import { StructurePage } from "./pages";
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
import StudySchedule from "./pages/AdminPages/Programs/StudySchedule";
import AddLectureTiming from "./pages/AdminPages/Programs/AddLectureTiming";
import StudentInformationPanel from "./pages/StudentPages/StudentInformationPanel";
import PersonlyProfile from "./pages/StudentPages/PersonlyProfile";
import StudentSchedule from "./pages/StudentPages/StudentSchedule";
import StudentCourses from "./pages/StudentPages/StudentCourses/StudentCourses";
import StudentLectures from "./pages/StudentPages/StudentCourses/StudentLectures";
import StudentLecturesDetails from "./pages/StudentPages/StudentCourses/StudentLecturesDetails";
import StudentExams from "./pages/StudentPages/StudentExams/StudentExams";
import StudentExamDetails from "./pages/StudentPages/StudentExams/StudentExamDetails";
import StudentExam from "./pages/StudentPages/StudentExams/StudentExam";
import StudentExamResults from "./pages/StudentPages/StudentExams/StudentExamResults";
import StudentGrades from "./pages/StudentPages/StudentGrades/StudentGrades";
import StudentSetting from "./pages/StudentPages/StudentSetting";
import InstructorInformationPanel from "./pages/InstructorPage/InstructorInformationPanel";
import InstructorProfile from "./pages/InstructorPage/InstructorProfile";
import InstructorSchedule from "./pages/InstructorPage/InstructorSchedule";

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
          <Route
            path="/programs/StudySchedule/:id"
            element={<StudySchedule />}
          />
          <Route path="/programs/LectureTime" element={<AddLectureTiming />} />

          {/* INSTRUCTORS */}
          <Route path="/instructors" element={<Instructors />} />
          <Route
            path="/instructors/instructorProfile/:id"
            element={<InstructorPersonalProfile />}
          />
          <Route
            path="/instructors/instructorEdit/:id?"
            element={<InstructorEditProfile />}
          />

          {/* STUDENTS */}
          <Route path="/students" element={<Students />} />
          <Route
            path="/students/studentProfile/:id"
            element={<StudentProfile />}
          />
          <Route path="/students/addStudent" element={<AddStudent />} />

          {/* LECTURE MANAGEMENT */}
          <Route path="/lectureManagement" element={<LectureManagement />} />

          {/* VIRTUAL CLASSES */}
          <Route path="/virtualClasses" element={<VirtualClasses />} />

          {/* TEST MANAGEMENT */}
          <Route path="/testManagement" element={<TestManagement />} />
          <Route
            path="/testManagement/testApproved/:id"
            element={<TestApproved />}
          />

          {/* REPORTS */}
          <Route path="/reports" element={<Reports />} />

          {/* SETTINGS */}
          <Route path="/settings" element={<Settings />} />

          {/* STUDENT INFORMATION PANEL */}
          <Route
            path="/student/informationPanel"
            element={<StudentInformationPanel />}
          />

          {/* STUDENT PERSONLY PROFILE */}
          <Route
            path="/student/PersonlyProfile"
            element={<PersonlyProfile />}
          />

          {/* STUDENT SCHEDULE */}
          <Route path="/student/schedule" element={<StudentSchedule />} />

          {/* STUDENT COURSES */}
          <Route path="/student/Courses" element={<StudentCourses />} />

          {/* STUDENT LECTURES */}
          <Route
            path="/student/Courses/lectures/:id"
            element={<StudentLectures />}
          />

          {/* STUDENT LECTURES */}
          <Route
            path="/student/Courses/lecture/details/:id"
            element={<StudentLecturesDetails />}
          />

          {/* STUDENT EXAMS */}
          <Route path="/student/exams" element={<StudentExams />} />
          <Route
            path="/student/exams/details/:id"
            element={<StudentExamDetails />}
          />
          <Route
            path="/student/exams/result"
            element={<StudentExamResults />}
          />
          {/* STUDENT VIRTUAL CLASSES */}
          <Route
            path="/students/virtualClasses"
            element={<StudentVirtualClasses />}
          />

          {/* STUDENT GRADES */}
          <Route path="/students/grades" element={<StudentGrades />} />

          {/* STUDENT GRADES */}
          <Route path="/students/setting" element={<StudentSetting />} />
          {/* STUDENT HOMEWORK */}
          <Route path="/students/homeworks" element={<StudentHomework />} />
          <Route
            path="/students/homeworks/:id"
            element={<StudentHomeworkPage />}
          />
          <Route
            path="/students/addHomeworks/:id"
            element={<StudentAddHomework />}
          />
          <Route
            path="/students/viewHomework/:id"
            element={<StudentViewHomework />}
          />

          {/* STUDENT PROJECTS */}
          <Route path="/students/projects" element={<StudentProjects />} />
          <Route
            path="/students/projects/:id"
            element={<StudentProjectPage />}
          />
          <Route
            path="/students/addProjects/:id"
            element={<StudentAddProject />}
          />
          <Route
            path="/students/viewProjects/:id"
            element={<StudentViewProjects />}
          />

          {/* ERROR PAGE */}
          <Route path="*" element={<Error />} />

          {/* INSTRUCTOR INFORMATION PANEL */}
          <Route
            path="/instructor/informationPanel"
            element={<InstructorInformationPanel />}
          />

          {/* INSTRUCTOR PROFILE */}
          <Route path="/instructor/profile" element={<InstructorProfile />} />

          {/* INSTRUCTOR SCHEDULE */}
          <Route path="/instructor/schedule" element={<InstructorSchedule />} />
        </Route>

        {/* STUDENT EXAMS */}
        <Route path="/student/exam/:id" element={<StudentExam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
