import { t } from "i18next";
import React, { useEffect } from "react";
import { Button } from "../../../components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

const StudentExamResults = () => {
  const navigate = useNavigate();

  const examResults = {
    resut_number: 100,
    correct_answers: 40,
    wrong_answers: 50,
    unanswered_questions: 10,
    total_grade: 140,
    your_grade: 70,
  };

  const percentage = (examResults.your_grade / examResults.total_grade) * 100;
  console.log("🚀 ~ StudentExamResults ~ percentage:", percentage);

  return (
    <div className="flex justify-center items-center pt-12">
      <div className="bg-white rounded-xl relative w-3/4 px-12 pb-4">
        <h2 className="absolute bg-mainColor py-4 px-20 font-medium text-lg text-white rounded-xl -top-6 left-1/2 -translate-x-1/2">
          {t("results")}
        </h2>

        <div className="flex justify-center flex-col gap-2 text-center">
          <div className="mt-24">
            <CircularProgressbar
              className="grid text-base font-semibold w-32 m-auto"
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
            <p className="font-medium text-lg">
              {t("grade")} : <span>{examResults.your_grade}</span> {t("out of")}{" "}
              <span>{examResults.total_grade}</span>
            </p>
          </div>
        </div>
        <div className="mt-8">
          <ul className="flex flex-col gap-4 font-medium text-lg">
            <li>
              {t("number of questions")} :{" "}
              <span>{examResults.resut_number}</span>
            </li>
            <li>
              {t("correct answers")} :{" "}
              <span>{examResults.correct_answers}</span>
            </li>
            <li>
              {t("wrong answers")} : <span>{examResults.wrong_answers}</span>
            </li>
            <li>
              {t("unanswered questions")} :{" "}
              <span>{examResults.unanswered_questions}</span>
            </li>
          </ul>

          <div className="flex justify-center my-5">
            <Button className="bg-[#369252]" action={() => navigate("/student/exams", { replace: true })}>
              {t("finish")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentExamResults;
