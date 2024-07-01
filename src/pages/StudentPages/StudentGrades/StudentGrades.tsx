import { t } from "i18next";
import React from "react";
import { IoChevronDown } from "react-icons/io5";
import { FiChevronLeft } from "react-icons/fi";
import Grades from "../../../components/StudentComponent/StudentGrades/Grades";

const StudentGrades = () => {
  const studentWorkGrade = {
    academic_year: "2023-2024",
    total_grade: 180,
    Courses: "تحليل نظم",
    assignments: [
      {
        id: 1,
        assignment_number: "الاول",
        assignment_type: "مسألة كيرشوف",
        grade: "100/75",
        isSuccess: true,
      },
      {
        id: 2,
        assignment_number: "الاول",
        assignment_type: "مسألة كيرشوف",
        grade: "100/0",
        isSuccess: false,
      },
      {
        id: 3,
        assignment_number: "الاول",
        assignment_type: "مسألة كيرشوف",
        grade: "100/75",
        isSuccess: true,
      },
    ],
  };

  const studentProjectGrade = {
    academic_year: "2023-2024",
    total_grade: 180,
    Courses: "تحليل نظم",
    assignments: [
      {
        id: 1,
        assignment_number: "الاول",
        assignment_type: "مسألة كيرشوف",
        grade: "100/75",
        isSuccess: true,
      },
      {
        id: 2,
        assignment_number: "الاول",
        assignment_type: "مسألة كيرشوف",
        grade: "100/0",
        isSuccess: false,
      },
      {
        id: 3,
        assignment_number: "الاول",
        assignment_type: "مسألة كيرشوف",
        grade: "100/75",
        isSuccess: true,
      },
    ],
  };

  const studentExamGrade = {
    academic_year: "2023-2024",
    total_grade: 180,
    Courses: "تحليل نظم",
    assignments: [
      {
        id: 1,
        assignment_number: "الاول",
        assignment_type: "مسألة كيرشوف",
        grade: "100/75",
        isSuccess: true,
      },
      {
        id: 2,
        assignment_number: "الاول",
        assignment_type: "مسألة كيرشوف",
        grade: "100/0",
        isSuccess: false,
      },
      {
        id: 3,
        assignment_number: "الاول",
        assignment_type: "مسألة كيرشوف",
        grade: "100/75",
        isSuccess: true,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-4 mb-12">{t("student grades")}</h2>

      <div>
        <Grades studentGrade={studentWorkGrade} title="assignment grades" />
      </div>

      <div className="my-8">
        <Grades studentGrade={studentProjectGrade} title="project grades" />
      </div>

      <div>
        <Grades studentGrade={studentExamGrade} title="exam grades" />
      </div>
    </div>
  );
};

export default StudentGrades;
