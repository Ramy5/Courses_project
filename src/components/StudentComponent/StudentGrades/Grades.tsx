import { t } from "i18next";
import { useState } from "react";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRTL } from "../../../hooks/useRTL";

interface Grades_TP {
  studentGrade: any;
  title: string;
}

const Grades = ({ studentGrade, title }: Grades_TP) => {
  const [isOpen, setIsOpen] = useState(false);

  const isRTL = useRTL();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div>
        <div
          className="flex items-center justify-between p-5 bg-mainColor rounded-t-xl"
          onClick={toggleAccordion}
        >
          <h1 className="text-lg font-semibold text-white opacity-100">
            {t(title)}
          </h1>
          {isOpen ? (
            <FiChevronDown size={28} className="text-white" />
          ) : (
            <>
              {isRTL ? (
                <FiChevronLeft size={28} className="text-white" />
              ) : (
                <FiChevronRight size={28} className="text-white" />
              )}
            </>
          )}
        </div>
        <div
          className={`bg-white rounded-b-xl overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="py-6 px-5 border-b border-dashed border-[#222222] text-center sm:text-start">
            <div className="flex flex-col mb-8 sm:flex-row gap-y-8 gap-x-24">
              <p className="font-medium text-xl text-[##000000b3]">
                {t("academic year")} :{" "}
                <span className="text-mainColor">
                  {studentGrade.academic_year}
                </span>
              </p>
              <p className="font-medium text-xl text-[##000000b3]">
                {t("total grade")} :{" "}
                <span className="text-mainColor">
                  {studentGrade.total_grade}
                </span>
              </p>
            </div>
            <p className="font-medium text-xl text-[##000000b3]">
              {t("Courses")} :{" "}
              <span className="text-mainColor">{studentGrade.Courses}</span>
            </p>
          </div>
          <div className="flex flex-col gap-4 px-5 py-8">
            {studentGrade?.assignments?.map((assignment) => (
              <div className="flex justify-between items-center bg-[#F9F9F9] rounded-xl py-8 px-5 flex-col sm:flex-row gap-y-5">
                <div className="flex flex-col items-center md:items-center sm:items-start md:flex-row gap-y-4">
                  <h2 className="text-[#073051] font-medium text-lg border-e-0 md:border-e-2 pe-2">
                    {title === "exam grades"
                      ? `${t("exam")} `
                      : title === "project grades"
                      ? `${t("project")} `
                      : `${t("homework")} `}{" "}
                    <span>{assignment.assignment_number}</span> :{" "}
                    <span>{assignment.assignment_type}</span>
                  </h2>
                  <p className="ps-0 md:ps-3 font-medium text-lg text-[#22222280]">
                    {t("grade")} :{" "}
                    <span className="px-3 py-2 bg-white rounded-2xl">
                      {assignment.grade}
                    </span>
                  </p>
                </div>
                {title !== "exam grades" && (
                  <div
                    className={`${
                      assignment.isSuccess
                        ? "bg-[#369252] px-4"
                        : "bg-mainRed px-6"
                    } text-white font-medium text-lg  py-2 rounded-2xl`}
                  >
                    {assignment.isSuccess
                      ? `${t("delivered")}`
                      : `${t("not delivered")}`}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;
