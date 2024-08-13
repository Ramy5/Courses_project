import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import InstructorAddHomework from "./InstructorAddHomework";
import { useParams } from "react-router-dom";
import Loading from "../../../components/UI/Loading";

const getEditHomeworkData = async (id: number | string) => {
  const { data } = await customFetch(`showHomework/${id}`);
  return data.data;
};

const InstructorEditHomework = () => {
  const { id: editHomeworkId } = useParams();

  const { data, isLoading, isRefetching, isFetching } = useQuery({
    queryKey: ["edit-homework"],
    queryFn: () => getEditHomeworkData(editHomeworkId),
  });

  if (isLoading || isFetching || isRefetching) return <Loading />;

  const editObj = {
    course_id: data?.corse,
    titleHomework: data?.title,
    titleHomeworkEn: data?.title_en,
    description: data?.desc,
    descriptionEn: data?.desc_en,
    instructions: data?.instructions,
    instructionsEn: data?.instructions_en,
    start_delivery: data?.start_date,
    end_delivery: data?.end_date,
    grade: data?.degree,
    file: data?.attachment,
  };
  return <InstructorAddHomework editObj={editObj} />;
};

export default InstructorEditHomework;
