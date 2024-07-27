import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { useParams } from "react-router-dom";
import Loading from "../../../components/UI/Loading";
import InstructorAddProject from "./InstructorAddProject";

const getEditProjectData = async (id: number | string) => {
  const { data } = await customFetch(`projects/${id}`);
  return data.data;
};

const InstructorEditProject = () => {
  const { id: editProjectId } = useParams();

  const { data, isLoading, isRefetching, isFetching } = useQuery({
    queryKey: ["edit-project"],
    queryFn: () => getEditProjectData(editProjectId),
  });

  if (isLoading || isFetching || isRefetching) return <Loading />;

  const editObj = {
    course_id: data?.course,
    titleProject: data?.title,
    titleProjectEn: data?.title_en,
    description: data?.desc,
    descriptionEn: data?.desc_en,
    instructions: data?.instructions,
    instructionsEn: data?.instructions_en,
    start_delivery: data?.start_date,
    end_delivery: data?.end_date,
    grade: data?.score,
    file: data?.attachment,
  };
  return <InstructorAddProject editObj={editObj} />;
};

export default InstructorEditProject;
