import { t } from "i18next";
import { Button } from "../../../components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import { useEffect, useState } from "react";

const StudentExamResults = () => {
  const navigate = useNavigate();
  console.log("🚀 ~ StudentExamResults ~ navigate:", navigate);
  const location = useLocation();
  const param = useParams();
  console.log("🚀 ~ StudentExamResults ~ param:", param);
  console.log("🚀 ~ StudentExamResults ~ location:", location);
  const hasPreviousPage = window.history
  console.log("🚀 ~ StudentExamResults ~ hasPreviousPage:", hasPreviousPage)

  const fetchStudentExamResult = async () => {
    const response = await customFetch(`/getExamDetails/${location.state}`);
    return response;
  };

  const { data, isFetching, isRefetching, isLoading } = useQuery({
    queryKey: ["student_ExamData"],
    queryFn: fetchStudentExamResult,
  });

  const studentExamResult = data && data?.data?.data;
  console.log(
    "🚀 ~ StudentExamResults ~ studentExamResult:",
    studentExamResult
  );

  const examResults = {
    totalQuestions: studentExamResult?.totalQuestions,
    correctAnswers: studentExamResult?.correctAnswers,
    wrongAnswers: studentExamResult?.wrongAnswers,
    unansweredQuestions: studentExamResult?.unansweredQuestions,
    totalDegree: studentExamResult?.totalDegree,
    studentDegree: studentExamResult?.degree,
  };
  console.log("🚀 ~ StudentExamResults ~ examResults:", examResults);

  const percentage =
    (examResults?.studentDegree / examResults?.totalDegree) * 100;
  console.log("🚀 ~ StudentExamResults ~ percentage:", percentage);

  if (isFetching || isRefetching || isLoading) return <Loading />;

  return (
    <div className="flex items-center justify-center pt-12">
      <div className="relative w-3/4 px-12 pb-4 bg-white rounded-xl">
        <h2 className="absolute px-20 py-4 text-lg font-medium text-white -translate-x-1/2 bg-mainColor rounded-xl -top-6 left-1/2">
          {t("results")}
        </h2>

        <div className="flex flex-col justify-center gap-2 text-center">
          <div className="mt-24">
            <CircularProgressbar
              className="grid w-32 m-auto text-base font-semibold"
              value={Number(percentage.toFixed(2))}
              text={`${Number(percentage.toFixed(2))}%`}
              strokeWidth={8}
              styles={buildStyles({
                textColor: "#D42828",
                pathColor: "#46BD84",
                trailColor: "#D42828",
              })}
            />
          </div>
          <div>
            <p className="text-lg font-medium">
              {t("grade")} : <span>{examResults.studentDegree}</span>{" "}
              {t("out of")} <span>{examResults.totalDegree}</span>
            </p>
          </div>
        </div>
        <div className="mt-8">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            <li>
              {t("number of questions")} :{" "}
              <span>{examResults.totalQuestions}</span>
            </li>
            <li>
              {t("correct answers")} : <span>{examResults.correctAnswers}</span>
            </li>
            <li>
              {t("wrong answers")} : <span>{examResults.wrongAnswers}</span>
            </li>
            <li>
              {t("unanswered questions")} :{" "}
              <span>{examResults.unansweredQuestions}</span>
            </li>
          </ul>

          <div className="flex justify-center my-5">
            <Button
              className="bg-[#369252]"
              action={() => navigate("/student/exams")}
            >
              {t("finish")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentExamResults;
