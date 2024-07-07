import { t } from "i18next";
import React, { useState } from "react";
import { Button, MainPopup } from "../..";
import { useNavigate } from "react-router-dom";
import { PiCheckCircle, PiCheckCircleThin } from "react-icons/pi";

const InstructorAddLastExam = ({ setSteps }: any) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const examInformation = {
    number_boolean_questions: 20,
    number_multiple_choice: 20,
    total_number_questions: 40,
    total_score: 100,
  };
  return (
    <div className="w-full sm:w-4/5 m-auto relative">
      <div className="border-2 border-[#E7F0FB] rounded-2xl mt-20 overflow-hidden">
        <div className="flex border-b-2 border-b-[#E7F0FB] font-semibold text-center">
          <h2 className="px-6 py-4 w-40 bg-[#E7F0FB]">{t("exam name")}</h2>
          <p className="px-5 py-4 flex items-center">
            {examInformation.number_boolean_questions}
          </p>
        </div>
        <div className="flex border-b-2 border-b-[#E7F0FB] font-semibold text-center">
          <h2 className=" px-5 py-4 w-40 bg-[#E7F0FB]">{t("duration")}</h2>
          <p className="px-5 py-4 flex items-center">
            {examInformation.number_multiple_choice}
          </p>
        </div>
        <div className="flex border-b-2 border-b-[#E7F0FB] font-semibold text-center">
          <h2 className="px-5 py-4 w-40 bg-[#E7F0FB]">
            {t("total questions")}
          </h2>
          <p className="px-5 py-4 flex items-center">
            {examInformation.total_number_questions}
          </p>
        </div>
        <div className="flex border-b-2 border-b-[#E7F0FB] font-semibold text-center">
          <h2 className="px-5 py-4 w-40 bg-[#E7F0FB]">{t("total score")}</h2>
          <p className="px-5 py-4 flex items-center">
            {examInformation.total_score}
          </p>
        </div>
        <div className="flex border-b-2 border-b-[#E7F0FB] font-semibold text-center">
          <h2 className="px-5 py-4 w-40 bg-[#E7F0FB]">
            {t("degree of success")}
          </h2>
          <p className="px-5 py-4 flex items-center">
            {examInformation.total_score}
          </p>
        </div>
        <div className="flex border-b-2 border-b-[#E7F0FB] font-semibold text-center">
          <h2 className="px-5 py-4 w-40 bg-[#E7F0FB]">{t("exam date")}</h2>
          <p className="px-5 py-4 flex items-center">
            {examInformation.total_score}
          </p>
        </div>
      </div>

      {showModal && (
        <MainPopup
          onClose={() => setShowModal(false)}
          className="bg-white w-[90vw] sm:w-[60vw] lg:w-[50vw] xl:w-[50vw]"
        >
          <div className="text-center py-12">
            <PiCheckCircleThin size={120} className="fill-mainColor m-auto" />
            <p className="text-mainColor font-semibold text-2xl my-7">
              {t("the test structure has been completed")}
            </p>

            <Button action={() => navigate("/instructor/exams", {replace: true})}>{t("ok")}</Button>
          </div>
        </MainPopup>
      )}

      <div className="flex justify-end items-center gap-5 mt-8">
        <Button bordered action={() => setSteps(2)}>
          {t("Previous")}
        </Button>
        <Button action={() => setShowModal(true)}>{t("submit")}</Button>
      </div>
    </div>
  );
};

export default InstructorAddLastExam;
