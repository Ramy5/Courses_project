import { useQuery } from "@tanstack/react-query";
import { TitlePage, ViewHomeworkTable } from "../../../components";
import { t } from "i18next";
import { IoBulbOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import customFetch from "../../../utils/axios";
import Loading from "../../../components/UI/Loading";

const getProject = async (id: number | string) => {
  const { data } = await customFetch(`showProjectAnswer/${id}`);
  return data.data;
};

const StudentViewProjects = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-project-answer"],
    queryFn: () => getProject(id),
  });

  const customData = {
    studentName: data?.student?.full_name,
    studentCode: data?.student?.academicData?.Academic_code,
    assignmentTitle: data?.project?.title,
    instructions: data?.project?.instructions,
    studentAnswer: data?.answer,
    attachedFileName: data?.project?.attachment,
    attachedFile: data?.attachment,
    isProject: true,
  };

  if (isLoading || isFetching || isRefetching) return <Loading />;

  return (
    <div>
      <TitlePage
        mainTitle={t("projects")}
        mainLink="/students/projects"
        supTitle={customData?.studentName}
        icon={<IoBulbOutline className="text-xl text-mainColor" />}
      />

      <div>
        <ViewHomeworkTable data={customData} />
      </div>
    </div>
  );
};

export default StudentViewProjects;
