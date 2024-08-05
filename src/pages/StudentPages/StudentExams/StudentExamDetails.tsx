import { t } from "i18next";
import React from "react";
import { Button } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import Loading from "../../../components/UI/Loading";

const StudentExamDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchStudentExam = async () => {
    const response = await customFetch(`/getStudentExams?exam_id=${id}`);
    return response;
  };

  const { data, isFetching, isRefetching, isLoading } = useQuery({
    queryKey: ["student_ExamData"],
    queryFn: fetchStudentExam,
  });

  const studentExamData = data && data?.data?.data?.exam;
  console.log("🚀 ~ StudentExamDetails ~ studentExamData:", studentExamData);

  const examDetails = {
    id: studentExamData?.id,
    exam_name: studentExamData?.course?.course_name,
    exam_title: studentExamData?.title,
    exam_type: studentExamData?.exam_type,
    instructions: studentExamData?.instructions,
    exam_mark: studentExamData?.score,
    degree_success: studentExamData?.passing_score,
    exam_date: studentExamData?.date,
    exam_duration: studentExamData?.duration,
  };

  if (isFetching || isRefetching || isLoading) return <Loading />;

  return (
    <div className="bg-white py-10 px-8 rounded-3xl">
      <h2 className="text-2xl font-semibold text-mainColor text-center sm:text-start">
        {t("exam")} <span>{examDetails.exam_name}</span>
      </h2>
      <div className="flex my-6 flex-col sm:flex-row gap-8 sm:gap-24 text-center sm:text-start">
        <div>
          <h2 className="text-xl font-medium text-mainColor">
            {t("exam title")}
          </h2>
          <p className="font-medium">{examDetails.exam_title}</p>
        </div>
        <div>
          <h2 className="text-xl font-medium text-mainColor">
            {t("exam type")}
          </h2>
          <p className="font-medium">{examDetails.exam_type}</p>
        </div>
      </div>

      <div className="mb-12  text-center sm:text-start">
        <h2 className="text-xl font-medium text-mainColor">
          {t("instructions")}
        </h2>
        <p className="font-medium">{examDetails.instructions}</p>
      </div>

      <div className="flex my-10 flex-col sm:flex-row gap-8 sm:gap-24 text-center sm:text-start">
        <div>
          <h2 className="text-xl font-medium text-mainColor">
            {t("exam mark:")}{" "}
            <span className="font-medium text-black">
              {examDetails.exam_mark}
            </span>
          </h2>
        </div>
        <div>
          <h2 className="text-xl font-medium text-mainColor">
            {t("degree of success:")}{" "}
            <span className="font-medium text-black">
              {examDetails.degree_success}
            </span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 sm:gap-24 text-center sm:text-start">
        <div>
          <h2 className="text-xl font-medium text-mainColor">
            {t("exam date:")}{" "}
            <span className="font-medium text-black">
              {examDetails.exam_date}
            </span>
          </h2>
        </div>
        <div>
          <h2 className="text-xl font-medium text-mainColor">
            {t("exam duration:")}{" "}
            <span className="font-medium text-black">
              {examDetails.exam_duration} <span>{t("minute")}</span>
            </span>
          </h2>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button bordered action={() => navigate("/student/exams")}>
          {t("retreat")}
        </Button>
        <Button action={() => navigate(`/student/exam/${examDetails.id}`)}>
          {t("start exam")}
        </Button>
      </div>
    </div>
  );
};

export default StudentExamDetails;
