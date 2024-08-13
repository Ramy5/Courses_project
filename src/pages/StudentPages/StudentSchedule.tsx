import { useQuery } from "@tanstack/react-query";
import Schedule from "../../components/AdminComponent/Programs/Schedule";
import customFetch from "../../utils/axios";
import Loading from "../../components/UI/Loading";
import { t } from "i18next";

const StudentSchedule = () => {
  const fetchStudentSchedule = async () => {
    const response = await customFetch(`getStudentTable`);
    return response;
  };

  const { data, isFetching, isRefetching } = useQuery({
    queryKey: ["student_schedule"],
    queryFn: fetchStudentSchedule,
  });

  const studentSchedule = data?.data?.data.lectures || [];

  return (
    <div>
      {isRefetching || isFetching ? (
        <Loading />
      ) : (
        <div className="pb-2 bg-white rounded-2xl py-8">
          {studentSchedule?.length ? (
            <div className="fade-in">
              <Schedule scheduleData={studentSchedule} />
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

export default StudentSchedule;
