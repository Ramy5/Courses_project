import { FaUserAlt } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { LiaBookReaderSolid } from "react-icons/lia";
import { Button, TitlePage } from "../../../components";
import { t } from "i18next";
import { CgPlayButtonR } from "react-icons/cg";
import { PiClockCountdownBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const InstructorLectures = () => {
  const navigate = useNavigate();

  const instructorCoursesData = [
    {
      id: 1,
      instructor_lecture: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      instructor_day: "21/4/2024",
      instructor_date: "3:36",
    },
    {
      id: 2,
      instructor_lecture: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      instructor_day: "21/4/2024",
      instructor_date: "3:36",
    },
    {
      id: 3,
      instructor_lecture: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      instructor_day: "21/4/2024",
      instructor_date: "3:36",
    },
    {
      id: 4,
      instructor_lecture: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      instructor_day: "21/4/2024",
      instructor_date: "3:36",
    },
    {
      id: 5,
      instructor_lecture: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      instructor_day: "21/4/2024",
      instructor_date: "3:36",
    },
    {
      id: 6,
      instructor_lecture: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      instructor_day: "21/4/2024",
      instructor_date: "3:36",
    },
    {
      id: 7,
      instructor_lecture: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      instructor_day: "21/4/2024",
      instructor_date: "3:36",
    },
    {
      id: 8,
      instructor_lecture: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      instructor_day: "21/4/2024",
      instructor_date: "3:36",
    },
    {
      id: 9,
      instructor_lecture: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      instructor_day: "21/4/2024",
      instructor_date: "3:36",
    },
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
          mainLink="/instructor/Courses"
          supTitle={`${t("lectures")} الفزياء`}
          icon={<LiaBookReaderSolid size={25} className="fill-mainColor" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {instructorCoursesData.map((instructor, index) => {
          const borderColor =
            borderColors[Math.floor(index / 3) % borderColors.length];
          return (
            <div
              key={instructor.id}
              className={`border-s-[12px] ${borderColor} py-5 px-4 bg-white rounded-lg  cursor-pointer`}
              onClick={() =>
                navigate(`/instructor/Courses/lecture/details/${instructor.id}`)
              }
            >
              <div className="flex items-center gap-2">
                <CgPlayButtonR size={24} className="text-mainColor" />
                <p className="font-semibold text-lg">
                  {instructor.instructor_lecture}
                </p>
              </div>
              <div className="flex items-center gap-2 my-4">
                <FaUserAlt size={24} className="text-mainColor rounded-full" />
                <p>{instructor.instructor_name}</p>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar size={27} className="text-mainColor" />
                <p>{instructor.instructor_day}</p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <PiClockCountdownBold size={26} className="text-mainColor" />
                <p>{instructor.instructor_date}</p>
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  action={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/instructor/Courses/lecture/preparation/${instructor.id}`
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
