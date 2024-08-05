import { t } from "i18next";
import { IoMdAdd } from "react-icons/io";
import { Button, InstructorHomeworkBox } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import Loading from "../../../components/UI/Loading";

const getAllHomework = async () => {
  const { data } = await customFetch("homeWorks");
  return data.data;
};

const InstructorHomework = () => {
  const navigate = useNavigate();

  const {
    data: allHomeworks,
    isLoading: allHomeworksIsLoading,
    isFetching: allHomeworksIsFetching,
    isRefetching: allHomeworksIsRefetching,
  } = useQuery({
    queryKey: ["all-homework"],
    queryFn: getAllHomework,
  });

  if (
    allHomeworksIsLoading ||
    allHomeworksIsFetching ||
    allHomeworksIsRefetching
  )
    return <Loading />;

  return (
    <div>
      <div className="flex justify-end">
        <Button
          className="flex items-center gap-1"
          action={() => navigate("/instructors/addHomeworks")}
        >
          <IoMdAdd className="text-xl" />
          <span className="pb-1 border-b-2 border-mainColor">
            {t("add homework")}
          </span>
        </Button>
      </div>

      <div className="grid gap-12 mt-20 lg:grid-cols-2 xl:grid-cols-3">
        {allHomeworks?.map((homework: any) => (
          <InstructorHomeworkBox key={homework.id} {...homework} />
        ))}
      </div>
    </div>
  );
};

export default InstructorHomework;
