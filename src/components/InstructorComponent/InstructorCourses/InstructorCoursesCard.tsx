import { t } from "i18next";
import React from "react";
import { HiOutlineChartBar } from "react-icons/hi";
import { LiaBookReaderSolid } from "react-icons/lia";
import { PiStudentBold } from "react-icons/pi";
import { SlBookOpen } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const InstructorCoursesCard = ({ instructorCoursesData }) => {
  const navigate = useNavigate();

  const borderColors = [
    "border-s-[#369252]",
    "border-s-mainColor",
    "border-s-[#025464]",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {instructorCoursesData.map((instructor, index) => {
        const borderColor =
          borderColors[Math.floor(index / 3) % borderColors.length];

        return (
          <div
            key={instructor.id}
            className={`border-s-[12px] ${borderColor} py-5 px-4 bg-white rounded-lg cursor-pointer`}
            onClick={() =>
              navigate(`/instructor/Courses/lectures/${instructor?.id}`, {
                state: instructorCoursesData?.lectures,
              })
            }
          >
            <div className="flex items-center gap-2">
              <LiaBookReaderSolid size={28} className="text-mainColor" />
              <p className="font-semibold text-lg">{instructor?.course_name}</p>
            </div>
            <div className="flex items-center gap-2 my-4">
              <HiOutlineChartBar
                size={24}
                className="text-mainColor rounded-full"
              />
              <p>
                <span>{t("level")} </span>
                {instructor?.level}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <SlBookOpen size={23} className="text-mainColor" />
              <p>{instructor?.program?.specialization}</p>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <PiStudentBold size={26} className="text-mainColor" />
              <p>
                <span>{t("student")} </span> {instructor?.students_number}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InstructorCoursesCard;
