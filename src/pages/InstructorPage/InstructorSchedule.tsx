import { useQuery } from "@tanstack/react-query";
import Schedule from "../../components/AdminComponent/Programs/Schedule";
import { useAppSelector } from "../../hooks/reduxHooks";
import customFetch from "../../utils/axios";
import Loading from "../../components/UI/Loading";

const InstructorSchedule = () => {

  const fetchInstructorSchedule = async () => {
    const response = await customFetch(`getLectures`);
    return response;
  };

  const { data, isFetching, isRefetching } = useQuery({
    queryKey: ["lecture_schedule"],
    queryFn: fetchInstructorSchedule,
  });

  const instructorSchedule = data?.data?.data.lectures || [];
  console.log("🚀 ~ InstructorSchedule ~ instructorSchedule:", instructorSchedule)

  return (
    <div>
      {isRefetching || isFetching ? (
        <Loading />
      ) : (
        <div className="pb-2 bg-white rounded-2xl py-8">
          <p className="mb-5 text-mainColor font-semibold text-2xl text-center">
            ذكاء اصطناعي
          </p>
          <Schedule scheduleData={instructorSchedule} />
        </div>
      )}
    </div>
  );
};

export default InstructorSchedule;
