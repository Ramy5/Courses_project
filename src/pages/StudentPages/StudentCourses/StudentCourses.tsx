import { FiCalendar } from "react-icons/fi";
import { TitlePage } from "../../../components";
import { LiaBookReaderSolid } from "react-icons/lia";
import { t } from "i18next";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";

const getStudentCourses = async () => {
  const { data } = await customFetch("getStudentCourses");
  return data.data.courses;
};

const StudentCourses = () => {
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-courses"],
    queryFn: getStudentCourses,
  });

  const borderColors = [
    "border-s-[#369252]",
    "border-s-mainColor",
    "border-s-[#025464]",
  ];

  if (isLoading || isFetching || isRefetching) return <Loading />;

  return (
    <div>
      <div>
        <TitlePage
          mainTitle="Courses"
          supTitle=""
          icon={<LiaBookReaderSolid size={25} className="fill-mainColor" />}
        />
      </div>

      {data?.length ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((cource, index) => {
            const borderColor =
              borderColors[Math.floor(index / 3) % borderColors.length];

            return (
              <div
                key={cource.id}
                className={`border-s-[12px] ${borderColor} py-5 px-4 bg-white rounded-lg cursor-pointer`}
                onClick={() =>
                  navigate(`/student/Courses/lectures/${cource.id}`)
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px]">
                    <LiaBookReaderSolid size={28} className="text-mainColor" />
                    <p className="text-lg font-semibold">
                      {cource.course_name}
                    </p>
                  </div>
                  <p
                    className={`${
                      cource.lecture_count === 0 ? "bg-mainRed" : "bg-[#04A08B]"
                    } px-3 py-[3px] text-sm text-white rounded-md`}
                  >
                    {cource.lecture_count} <span>{t("lecture")}</span>
                  </p>
                </div>
                <div className="flex items-center gap-[6px] my-4">
                  <FaUserAlt
                    size={24}
                    className="rounded-full text-mainColor"
                  />
                  <div className="">
                    {cource.teachers.map((teacher: any, i: number) => {
                      return <p key={teacher.id}>{teacher.full_name}</p>;
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-[6px]">
                  <FiCalendar size={25} className="text-mainColor" />
                  <p>{cource.day}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-5 bg-white rounded-3xl my-8">
          <p className="text-center font-semibold text-xl text-mainColor py-8">
            {t("No courses added yet")}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
