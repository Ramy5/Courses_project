import { FiCalendar } from "react-icons/fi";
import { Button, TitlePage } from "../../../components";
import { LiaBookReaderSolid } from "react-icons/lia";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SlBookOpen } from "react-icons/sl";
import { PiStudentBold } from "react-icons/pi";
import { t } from "i18next";
import { useState } from "react";

const InstructorCourses = () => {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState<number>(1);

  const instructorCoursesData = [
    {
      id: 1,
      course_name: "الفيزياء",
      level: "المستوي الرابع",
      specialty: "علوم الحاسب",
      students_number: 500,
    },
    {
      id: 2,
      course_name: "الفيزياء",
      level: "المستوي الرابع",
      specialty: "علوم الحاسب",
      students_number: 500,
    },
    {
      id: 3,
      course_name: "الفيزياء",
      level: "المستوي الرابع",
      specialty: "علوم الحاسب",
      students_number: 500,
    },
    {
      id: 4,
      course_name: "الفيزياء",
      level: "المستوي الرابع",
      specialty: "علوم الحاسب",
      students_number: 500,
    },
    {
      id: 5,
      course_name: "الفيزياء",
      level: "المستوي الرابع",
      specialty: "علوم الحاسب",
      students_number: 500,
    },
    {
      id: 6,
      course_name: "الفيزياء",
      level: "المستوي الرابع",
      specialty: "علوم الحاسب",
      students_number: 500,
    },
    {
      id: 7,
      course_name: "الفيزياء",
      level: "المستوي الرابع",
      specialty: "علوم الحاسب",
      students_number: 500,
    },
    {
      id: 8,
      course_name: "الفيزياء",
      level: "المستوي الرابع",
      specialty: "علوم الحاسب",
      students_number: 500,
    },
    {
      id: 9,
      course_name: "الفيزياء",
      level: "المستوي الرابع",
      specialty: "علوم الحاسب",
      students_number: 500,
    },
  ];

  const buttons = [
    { id: 1, label: "tests today" },
    { id: 2, label: "upcoming tests" },
  ];

  const borderColors = [
    "border-s-[#369252]",
    "border-s-mainColor",
    "border-s-[#025464]",
  ];

  return (
    <div>
      <div>
        <TitlePage
          mainTitle="Courses"
          supTitle=""
          icon={<LiaBookReaderSolid size={25} className="fill-mainColor" />}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 md:gap-8 bg-[#F9F9F9] rounded-3xl py-5 px-8 main_shadow mb-8">
        {buttons.map((button) => (
          <Button
            key={button.id}
            className={`px-2 md:px-4 font-medium md:semibold w-full sm:w-1/3 md:w-[26%] m-auto sm:m-0 ${
              tabs === button.id
                ? "bg-mainColor text-white"
                : "bg-transparent text-black"
            }`}
            action={() => setTabs(button.id)}
          >
            {t(button.label)}
          </Button>
        ))}
      </div>

      {tabs === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {instructorCoursesData.map((instructor, index) => {
            const borderColor =
              borderColors[Math.floor(index / 3) % borderColors.length];

            return (
              <div
                key={instructor.id}
                className={`border-s-[12px] ${borderColor} py-5 px-4 bg-white rounded-lg cursor-pointer`}
                onClick={() =>
                  navigate(`/instructor/Courses/lectures/${instructor.id}`)
                }
              >
                <div className="flex items-center gap-2">
                  <LiaBookReaderSolid size={28} className="text-mainColor" />
                  <p className="font-semibold text-lg">
                    {instructor.course_name}
                  </p>
                </div>
                <div className="flex items-center gap-2 my-4">
                  <FaUserAlt
                    size={24}
                    className="text-mainColor rounded-full"
                  />
                  <p>{instructor.level}</p>
                </div>
                <div className="flex items-center gap-2">
                  <SlBookOpen size={23} className="text-mainColor" />
                  <p>{instructor.specialty}</p>
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <PiStudentBold size={26} className="text-mainColor" />
                  <p>{instructor.students_number}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tabs === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {instructorCoursesData.map((instructor, index) => {
            const borderColor =
              borderColors[Math.floor(index / 3) % borderColors.length];

            return (
              <div
                key={instructor.id}
                className={`border-s-[12px] ${borderColor} py-5 px-4 bg-white rounded-lg cursor-pointer`}
                onClick={() =>
                  navigate(`/instructor/Courses/lectures/${instructor.id}`)
                }
              >
                <div className="flex items-center gap-2">
                  <LiaBookReaderSolid size={28} className="text-mainColor" />
                  <p className="font-semibold text-lg">
                    {instructor.course_name}
                  </p>
                </div>
                <div className="flex items-center gap-2 my-4">
                  <FaUserAlt
                    size={24}
                    className="text-mainColor rounded-full"
                  />
                  <p>{instructor.level}</p>
                </div>
                <div className="flex items-center gap-2">
                  <SlBookOpen size={23} className="text-mainColor" />
                  <p>{instructor.specialty}</p>
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <PiStudentBold size={26} className="text-mainColor" />
                  <p>{instructor.students_number}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;
