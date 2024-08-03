import { useParams } from "react-router-dom";
import { Banar, StudentHomeworkDescription } from "../../../components";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";

const getHomework = async (id: number | string) => {
  const { data } = await customFetch(`showHomework/${id}`);
  return data.data;
};

const InstructorViewHomework = () => {
  const { id } = useParams();

  const {
    data: homework,
    isLoading: homeworkIsLoading,
    isFetching: homeworkIsFetching,
    isRefetching: homeworkIsRefetching,
  } = useQuery({
    queryKey: ["view-one-homework"],
    queryFn: () => getHomework(id),
  });

  if (homeworkIsLoading || homeworkIsFetching || homeworkIsRefetching)
    return <Loading />;

  return (
    <div className="p-6 space-y-6 bg-white border rounded-3xl">
      {/* BANAR */}
      <Banar banarTitle={homework?.title} banarMaterial={homework?.desc} />

      {/* DESCRIPTION */}
      <StudentHomeworkDescription isInstructotHomework {...homework} />
    </div>
  );
};

export default InstructorViewHomework;
