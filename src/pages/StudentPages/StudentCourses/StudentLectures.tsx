import { FaUserAlt } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { LiaBookReaderSolid } from "react-icons/lia";
import { TitlePage } from "../../../components";
import { t } from "i18next";
import { CgPlayButtonR } from "react-icons/cg";
import { PiClockCountdownBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const StudentLectures = () => {
  const navigate = useNavigate();

  const studentCoursesData = [
    {
      id: 1,
      course_name: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_desc: "مدخل الباب الاول",
      course_date: "3:36",
      course_number: 4,
    },
    {
      id: 2,
      course_name: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_desc: "مدخل الباب الاول",
      course_date: "3:36",
      course_number: 0,
    },
    {
      id: 3,
      course_name: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_desc: "مدخل الباب الاول",
      course_date: "3:36",
      course_number: 4,
    },
    {
      id: 4,
      course_name: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_desc: "مدخل الباب الاول",
      course_date: "3:36",
      course_number: 3,
    },
    {
      id: 5,
      course_name: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_desc: "مدخل الباب الاول",
      course_date: "3:36",
      course_number: 4,
    },
    {
      id: 6,
      course_name: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_desc: "مدخل الباب الاول",
      course_date: "3:36",
      course_number: 0,
    },
    {
      id: 7,
      course_name: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_desc: "مدخل الباب الاول",
      course_date: "3:36",
      course_number: 4,
    },
    {
      id: 8,
      course_name: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_desc: "مدخل الباب الاول",
      course_date: "3:36",
      course_number: 4,
    },
    {
      id: 9,
      course_name: "المحاضرة الاولي",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_desc: "مدخل الباب الاول",
      course_date: "3:36",
      course_number: 4,
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
          mainLink="/student/Courses"
          supTitle={`${t("lectures")} الفزياء`}
          icon={<LiaBookReaderSolid size={25} className="fill-mainColor" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {studentCoursesData.map((cource, index) => {
          const borderColor =
            borderColors[Math.floor(index / 3) % borderColors.length];
          return (
            <div
              key={cource.id}
              className={`border-s-[12px] ${borderColor} py-5 px-4 bg-white rounded-lg  cursor-pointer`}
              onClick={() => navigate(`/student/Courses/lecture/details/${cource.id}`)}
            >
              <div className="flex items-center gap-[6px]">
                <CgPlayButtonR size={24} className="text-mainColor" />
                <p className="font-semibold text-lg">{cource.course_name}</p>
              </div>
              <div className="flex items-center gap-[6px] my-4">
                <FaUserAlt size={24} className="text-mainColor rounded-full" />
                <p>{cource.instructor_name}</p>
              </div>
              <div className="flex items-center gap-[6px]">
                <LiaBookReaderSolid size={28} className="text-mainColor" />
                <p>{cource.course_desc}</p>
              </div>
              <div className="flex items-center gap-[6px] mt-4">
                <PiClockCountdownBold size={26} className="text-mainColor" />
                <p>{cource.course_date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentLectures;
