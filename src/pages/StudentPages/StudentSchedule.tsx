import { useQuery } from "@tanstack/react-query";
import Schedule from "../../components/AdminComponent/Programs/Schedule";
import customFetch from "../../utils/axios";
import Loading from "../../components/UI/Loading";

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
          <div className="fade-in">
            <Schedule scheduleData={studentSchedule} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSchedule;
