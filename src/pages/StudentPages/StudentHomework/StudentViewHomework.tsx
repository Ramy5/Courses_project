import { useQuery } from "@tanstack/react-query";
import { TitlePage, ViewHomeworkTable } from "../../../components";
import { t } from "i18next";
import { SlBookOpen } from "react-icons/sl";
import Loading from "../../../components/UI/Loading";
import customFetch from "../../../utils/axios";
import { useParams } from "react-router-dom";

const getHomework = async (id: number | string) => {
  const { data } = await customFetch(`showHomeWorkAnswer/${id}`);
  return data.data;
};

const StudentViewHomework = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-all-homeworks"],
    queryFn: () => getHomework(id),
  });

  const customData = {
    studentName: data?.student?.full_name,
    studentCode: data?.student?.academicData?.Academic_code,
    assignmentTitle: data?.homework?.title,
    instructions: data?.homework?.instructions,
    studentAnswer: data?.answer,
    attachedFile: data?.homework?.attachment,
    attachedFileName: data?.attachment,
  };

  if (isLoading || isFetching || isRefetching) return <Loading />;

  return (
    <div>
      <TitlePage
        mainTitle={t("homeworks")}
        mainLink="/students/homeworks"
        supTitle={customData?.studentName}
        icon={<SlBookOpen className="text-xl text-mainColor" />}
      />

      <div>
        <ViewHomeworkTable data={customData} />
      </div>
    </div>
  );
};

export default StudentViewHomework;
