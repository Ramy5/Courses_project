import { FiCalendar } from "react-icons/fi";
import { TitlePage } from "../../../components";
import { LiaBookReaderSolid } from "react-icons/lia";
import { t } from "i18next";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentCourses = () => {
  const navigate = useNavigate();

  const studentCoursesData = [
    {
      id: 1,
      course_name: "الفيزياء",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_date: "الأحد",
      course_number: 4,
    },
    {
      id: 2,
      course_name: "الفيزياء",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_date: "الأحد",
      course_number: 0,
    },
    {
      id: 3,
      course_name: "الفيزياء",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_date: "الأحد",
      course_number: 4,
    },
    {
      id: 4,
      course_name: "الفيزياء",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_date: "الأحد",
      course_number: 3,
    },
    {
      id: 5,
      course_name: "الفيزياء",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_date: "الأحد",
      course_number: 4,
    },
    {
      id: 6,
      course_name: "الفيزياء",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_date: "الأحد",
      course_number: 0,
    },
    {
      id: 7,
      course_name: "الفيزياء",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_date: "الأحد",
      course_number: 4,
    },
    {
      id: 8,
      course_name: "الفيزياء",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_date: "الأحد",
      course_number: 4,
    },
    {
      id: 9,
      course_name: "الفيزياء",
      instructor_name: "بروفيسور. عبدالله فارس ",
      course_date: "الأحد",
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
          supTitle=""
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
              className={`border-s-[12px] ${borderColor} py-5 px-4 bg-white rounded-lg cursor-pointer`}
              onClick={() => navigate(`/student/Courses/lectures/${cource.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                  <LiaBookReaderSolid size={28} className="text-mainColor" />
                  <p className="font-semibold text-lg">{cource.course_name}</p>
                </div>
                <p
                  className={`${
                    cource.course_number === 0 ? "bg-mainRed" : "bg-[#04A08B]"
                  } px-3 py-[3px] text-sm text-white rounded-md`}
                >
                  {cource.course_number} <span>{t("lecture")}</span>
                </p>
              </div>
              <div className="flex items-center gap-[6px] my-4">
                <FaUserAlt size={24} className="text-mainColor rounded-full" />
                <p>{cource.instructor_name}</p>
              </div>
              <div className="flex items-center gap-[6px]">
                <FiCalendar size={25} className="text-mainColor" />
                <p>{cource.course_date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentCourses;
