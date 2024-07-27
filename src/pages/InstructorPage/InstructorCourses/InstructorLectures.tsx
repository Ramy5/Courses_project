import { FaUserAlt } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { LiaBookReaderSolid } from "react-icons/lia";
import { Button, TitlePage } from "../../../components";
import { t } from "i18next";
import { CgPlayButtonR } from "react-icons/cg";
import { PiClockCountdownBold } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ConvertNumberToWord from "../../../components/UI/ConvertNumberToWord";

const InstructorLectures = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const numbers = ConvertNumberToWord();
  console.log("🚀 ~ InstructorLectures ~ numbers:", numbers)

  const fetchInstructorSchedule = async () => {
    const response = await customFetch(`getCourses?course_id=${id}`);
    return response;
  };

  const { data, isFetching, isRefetching } = useQuery({
    queryKey: ["teacher_course"],
    queryFn: fetchInstructorSchedule,
  });

  const instructorCoursesData = data?.data?.data.lectures || [];
  console.log(
    "🚀 ~ InstructorLectures ~ instructorCoursesData:",
    instructorCoursesData
  );

  const borderColors = [
    "border-s-[#369252]",
    "border-s-mainColor",
    "border-s-[#025464]",
  ];

  if (isFetching || isRefetching) return <Loading />;

  return (
    <div>
      <div>
        <TitlePage
          mainTitle="Courses"
          mainLink="/instructor/Courses"
          supTitle={`${t("lectures")} ${
            instructorCoursesData[0]?.course?.course_name
          }`}
          icon={<LiaBookReaderSolid size={25} className="fill-mainColor" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {instructorCoursesData.map((instructor, index) => {
          const borderColor =
            borderColors[Math.floor(index / 3) % borderColors.length];
          const showCourse = {
            id: instructor?.course?.id,
            index: index,
            course_name: instructor?.course?.course_name,
          };
          return (
            <div
              key={instructor.id}
              className={`border-s-[12px] ${borderColor} py-5 px-4 bg-white rounded-lg  cursor-pointer`}
              onClick={() => {
                if (!!instructor?.lecture_data) {
                  navigate(
                    `/instructor/Courses/lecture/details/${instructor?.lecture_data.id}`,
                    { state: showCourse }
                  );
                } else {
                  toast.info(t("the lecture must be prepared first"));
                }
              }}
            >
              <div className="flex items-center gap-2">
                <CgPlayButtonR size={24} className="text-mainColor" />
                <p className="font-semibold text-lg">{`${t("Lecture")} ${numbers[index]}`}</p>
              </div>
              <div className="flex items-center gap-2 my-4">
                <FaUserAlt size={24} className="text-mainColor rounded-full" />
                <p>{instructor?.teacher.full_name}</p>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar size={27} className="text-mainColor" />
                <p>{instructor.date}</p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <PiClockCountdownBold size={26} className="text-mainColor" />
                <p>
                  ({instructor.start_time.split(":").splice(0, 2).join(":")})
                </p>
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  action={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/instructor/Courses/lecture/preparation/${instructor.id}`,
                      { state: instructor.lecture_data }
                    );
                  }}
                >
                  {t("lecture preparation")}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InstructorLectures;
