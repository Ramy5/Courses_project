import { t } from "i18next";
import React from "react";
import { IoChevronDown } from "react-icons/io5";
import { FiChevronLeft } from "react-icons/fi";
import Grades from "../../../components/StudentComponent/StudentGrades/Grades";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import ConvertNumberToWord from "../../../components/UI/ConvertNumberToWord";

const getHomeworkDegree = async () => {
  const { data } = await customFetch("getStudentHomeworkDegrees");
  return data.data;
};

const getProjectDegree = async () => {
  const { data } = await customFetch("getStudentProjectDegrees");
  return data.data;
};

const getExamsDegree = async () => {
  const { data } = await customFetch("getStudentExamDegrees");
  return data.data;
};

const StudentGrades = () => {
  const numbers = ConvertNumberToWord();

  const {
    data: homeworkData,
    isLoading: homeworkIsLoading,
    isFetching: homeworkIsFetching,
    isRefetching: homeworkIsRefetching,
  } = useQuery({
    queryKey: ["homework-degree"],
    queryFn: getHomeworkDegree,
  });
  console.log("🚀 ~ StudentGrades ~ homeworkData:", homeworkData);

  const {
    data: projectData,
    isLoading: projectIsLoading,
    isFetching: projectIsFetching,
    isRefetching: projectIsRefetching,
  } = useQuery({
    queryKey: ["project-degree"],
    queryFn: getProjectDegree,
  });
  console.log("🚀 ~ StudentGrades ~ projectData:", projectData);

  const {
    data: examsData,
    isLoading: examsIsLoading,
    isFetching: examsIsFetching,
    isRefetching: examsIsRefetching,
  } = useQuery({
    queryKey: ["exams-degree"],
    queryFn: getExamsDegree,
  });
  console.log("🚀 ~ Studentexams ~ examsData:", examsData);

  const studentWorkGrade = {
    academic_year: "2023-2024",
    total_grade: homeworkData?.total_homework_score,
    Courses: homeworkData?.homWorks?.[0]?.course_name,
    assignments: homeworkData?.homWorks?.map((homework: any, index: number) => {
      return {
        id: index,
        assignment_number: index + 1,
        assignment_type: homework?.homework,
        grade: `${homework?.homework_score}/${homework?.degree}`,
        isSuccess: homework?.status === "Delivered" ? true : false,
      };
    }),
  };

  const studentProjectGrade = {
    academic_year: "2023-2024",
    total_grade: projectData?.total_project_score,
    Courses: projectData?.projects?.[0]?.course_name,
    assignments: projectData?.projects?.map((project: any, index: number) => {
      return {
        id: index,
        assignment_number: index + 1,
        assignment_type: project?.project,
        grade: `${project?.project_score}/${project?.degree}`,
        isSuccess: project?.status === "Delivered" ? true : false,
      };
    }),
  };

  const studentExamGrade = {
    academic_year: "2023-2024",
    total_grade: examsData?.total_exam_score,
    Courses: examsData?.exams?.[0]?.course_name,
    assignments: examsData?.exams?.map((exam: any, index: number) => {
      return {
        id: index,
        assignment_number: index + 1,
        assignment_type: exam?.exam_name,
        grade: `${exam?.exam_score}/${exam?.degree}`,
      };
    }),
  };

  if (
    homeworkIsLoading ||
    homeworkIsFetching ||
    homeworkIsRefetching ||
    projectIsFetching ||
    projectIsLoading ||
    projectIsRefetching ||
    examsIsFetching ||
    examsIsLoading ||
    examsIsRefetching
  )
    return <Loading />;

  return (
    <div>
      <h2 className="mt-4 mb-12 text-xl font-semibold">
        {t("student grades")}
      </h2>

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
