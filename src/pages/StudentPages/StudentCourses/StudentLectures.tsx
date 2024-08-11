import { FaUserAlt } from "react-icons/fa";
import { LiaBookReaderSolid } from "react-icons/lia";
import { TitlePage } from "../../../components";
import { t } from "i18next";
import { CgPlayButtonR } from "react-icons/cg";
import { PiClockCountdownBold } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import customFetch from "../../../utils/axios";
import Loading from "../../../components/UI/Loading";
import { useQuery } from "@tanstack/react-query";
import ConvertNumberToWord from "../../../components/UI/ConvertNumberToWord";

const getStudentCourses = async (id: number | string) => {
  const { data } = await customFetch(`getStudentCourses?course_id=${id}`);
  return data.data.lectures;
};

const StudentLectures = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const numbers = ConvertNumberToWord();

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-lectures"],
    queryFn: () => getStudentCourses(id),
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
          mainLink="/student/Courses"
          supTitle={`${t("lectures")} ${data?.[0]?.lecture_data?.course_name}`}
          icon={<LiaBookReaderSolid size={25} className="fill-mainColor" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((cource, index) => {
          const borderColor =
            borderColors[Math.floor(index / 3) % borderColors.length];
          return (
            <div
              key={cource.id}
              className={`border-s-[12px] ${borderColor} py-5 px-4 bg-white rounded-lg  cursor-pointer`}
              onClick={() =>
                navigate(
                  `/student/Courses/lecture/details/${cource?.lecture_data?.id}`
                )
              }
            >
              <div className="flex items-center gap-[6px]">
                <CgPlayButtonR size={24} className="text-mainColor" />
                <p className="text-lg font-semibold">
                  {t("lecture")} {numbers?.[index]}
                </p>
              </div>
              <div className="flex items-center gap-[6px] my-4">
                <FaUserAlt size={24} className="rounded-full text-mainColor" />
                <p>{cource?.teacher?.full_name}</p>
              </div>
              <div className="flex items-center gap-[6px]">
                <LiaBookReaderSolid size={28} className="text-mainColor" />
                <p>{cource?.lecture_data?.title}</p>
              </div>
              <div className="flex items-center gap-[6px] mt-4">
                <PiClockCountdownBold size={26} className="text-mainColor" />
                <p>({cource?.start_time})</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentLectures;
