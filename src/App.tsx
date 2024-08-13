import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AddStudent,
  EditStudent,
  Error,
  InstructorAddHomework,
  InstructorAddProject,
  InstructorHomework,
  InstructorProjects,
  InstructorViewAllHomeworks,
  InstructorViewAllProject,
  InstructorViewProject,
  InstructorVirtualClasses,
  InstrunctorEvaluateHomework,
  InstrunctorEvaluateProject,
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
import ProgramInformation from "./pages/AdminPages/Programs/ProgramInformation";
import ViewCourseDescription from "./pages/AdminPages/Programs/ViewCourseDescription";
import CreateProgram from "./pages/AdminPages/Programs/CreateProgram";
import StudySchedule from "./pages/AdminPages/Programs/StudySchedule";
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
import RecordAttendance from "./pages/InstructorPage/RecordAttendance";
import InstructorCourses from "./pages/InstructorPage/InstructorCourses/InstructorCourses";
import InstructorLectures from "./pages/InstructorPage/InstructorCourses/InstructorLectures";
import InstructorLectureDetails from "./pages/InstructorPage/InstructorCourses/InstructorLectureDetails";
import LecturePreparation from "./pages/InstructorPage/InstructorCourses/LecturePreparation";
import InstructorViewHomework from "./pages/InstructorPage/InstructorHomework/InstructorViewHomework";
import InstructorExams from "./pages/InstructorPage/InstructorExams/InstructorExams";
import InstructorAddExam from "./pages/InstructorPage/InstructorExams/InstructorAddExam";
import InstructorSetting from "./pages/InstructorPage/InstructorSetting";
import AddInstructor from "./components/AdminComponent/Instructors/AddInstructor";
import EditInstructor from "./components/AdminComponent/Instructors/EditInstructor";
import ViewInstructorSchedule from "./pages/AdminPages/Instructors/ViewInstructorSchedule";
import InstructorEditHomework from "./pages/InstructorPage/InstructorHomework/InstructorEditHomework";

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
          <Route
            path="/programs/StudySchedule/:id"
            element={<StudySchedule />}
          />

          {/* INSTRUCTORS */}
          <Route path="/instructors" element={<Instructors />} />
          <Route
            path="/instructors/instructorProfile/:id"
            element={<InstructorPersonalProfile />}
          />
          <Route
            path="/instructors/schedule/:id"
            element={<ViewInstructorSchedule />}
          />
          <Route path="/instructors/add" element={<AddInstructor />} />
          <Route path="/instructors/edit/:id" element={<EditInstructor />} />

          {/* STUDENTS */}
          <Route path="/students" element={<Students />} />
          <Route
            path="/students/studentProfile/:id"
            element={<StudentProfile />}
          />
          <Route path="/students/addStudent" element={<AddStudent />} />
          <Route path="/students/:id" element={<EditStudent />} />

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

          {/* INSTRUCTOR SCHEDULE */}
          <Route path="/instructor/attendance" element={<RecordAttendance />} />

          {/* INSTRUCTOR COURSES */}
          <Route path="/instructor/Courses" element={<InstructorCourses />} />

          {/* INSTRUCTOR LECTURES */}
          <Route
            path="/instructor/Courses/lectures/:id"
            element={<InstructorLectures />}
          />

          {/* INSTRUCTOR LECTURES DETAILS */}
          <Route
            path="/instructor/Courses/lecture/details/:id"
            element={<InstructorLectureDetails />}
          />

          {/* INSTRUCTOR LECTURES PREPARATION */}
          <Route
            path="/instructor/Courses/lecture/preparation/:id"
            element={<LecturePreparation />}
          />

          {/* INSTRUCTOR VIRTUAL CLASSES */}
          <Route
            path="/instructor/virtualClasses"
            element={<InstructorVirtualClasses />}
          />

          {/* INSTRUCTOR HOMEWORK */}
          <Route
            path="/instructor/homeworks"
            element={<InstructorHomework />}
          />
          <Route
            path="/instructor/homeworks/view/:id"
            element={<InstructorViewHomework />}
          />
          <Route
            path="/instructor/homeworks/edit/:id"
            element={<InstructorEditHomework />}
          />
          <Route
            path="/instructor/homeworks/viewAll/:id"
            element={<InstructorViewAllHomeworks />}
          />
          <Route
            path="/instructor/homeworks/evaluate/:id"
            element={<InstrunctorEvaluateHomework />}
          />
          <Route
            path="/instructor/homeworks/add"
            element={<InstructorAddHomework />}
          />

          {/* INSTRUCTOR PROJECT */}
          <Route
            path="/instructor/projects"
            element={<InstructorProjects />}
          />
          <Route
            path="/instructor/projects/view/:id"
            element={<InstructorViewProject />}
          />
          <Route
            path="/instructor/projects/viewAll/:id"
            element={<InstructorViewAllProject />}
          />
          <Route
            path="/instructor/projects/evaluate/:id"
            element={<InstrunctorEvaluateProject />}
          />
          <Route
            path="/instructor/projects/add"
            element={<InstructorAddProject />}
          />

          {/* INSTRUCTOR EXAMS*/}
          <Route path="/instructor/exams" element={<InstructorExams />} />

          {/* INSTRUCTOR ADD EXAM*/}
          <Route
            path="/instructor/exams/add/"
            element={<InstructorAddExam />}
          />

          {/* INSTRUCTOR GRADES */}
          <Route path="/instructor/setting" element={<InstructorSetting />} />
        </Route>

        {/* STUDENT EXAMS */}
        <Route path="/student/exam/:id" element={<StudentExam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
