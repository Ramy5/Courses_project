import { useQuery } from "@tanstack/react-query";
import Schedule from "../../components/AdminComponent/Programs/Schedule";
import customFetch from "../../utils/axios";
import Loading from "../../components/UI/Loading";
import { t } from "i18next";

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

  return (
    <div>
      {isRefetching || isFetching ? (
        <Loading />
      ) : (
        <div className="py-8 pb-2 bg-white rounded-2xl">
          <p className="mb-5 text-2xl font-semibold text-center text-mainColor">
            {instructorSchedule?.[0]?.program_name}
          </p>
          {instructorSchedule?.length ? (
            <div className="fade-in">
              <Schedule scheduleData={instructorSchedule} />
            </div>
          ) : (
            <div className="pb-5 bg-white rounded-3xl">
              <p className="text-center font-semibold text-xl text-mainColor py-8">
                {t("No school schedule added yet")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorSchedule;
