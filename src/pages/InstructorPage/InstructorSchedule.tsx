import { useQuery } from "@tanstack/react-query";
import Schedule from "../../components/AdminComponent/Programs/Schedule";
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
  console.log(
    "🚀 ~ InstructorSchedule ~ instructorSchedule:",
    instructorSchedule
  );

  return (
    <div>
      {isRefetching || isFetching ? (
        <Loading />
      ) : (
        <div className="py-8 pb-2 bg-white rounded-2xl">
          <p className="mb-5 text-2xl font-semibold text-center text-mainColor">
            {instructorSchedule?.[0]?.program_name}
          </p>
          <div className="fade-in">
            <Schedule scheduleData={instructorSchedule} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorSchedule;
