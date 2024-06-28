import { FiCalendar } from "react-icons/fi";
import { TitlePage } from "../../../components";
import { LiaBookReaderSolid } from "react-icons/lia";

const StudentCourses = () => {
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
  ];
  return (
    <div>
      <div>
        <TitlePage
          mainTitle="Courses"
          supTitle=""
          icon={<LiaBookReaderSolid size={22} className="fill-mainColor" />}
        />
      </div>

      <div>
        {studentCoursesData.map((cource) => {
          return (
            <div key={cource.id} className="border-s-2 border-s-mainColor ">
              <div className="flex items-center justify-between">
                <div>
                  <LiaBookReaderSolid size={28} className="text-mainColor" />
                  <p>{cource.course_name}</p>
                </div>
                <p>{cource.course_number}</p>
              </div>
              <div>
                <p>{cource.instructor_name}</p>
              </div>
              <div>
                <FiCalendar size={28} className="text-mainColor" />
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
