import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import InstructorAddHomework from "./InstructorAddHomework";
import { useParams } from "react-router-dom";
import Loading from "../../../components/UI/Loading";
import { useState } from "react";

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

  console.log(data);

  const editObj = {
    course_id: "",
    titleHomework: data?.title,
    titleHomeworkEn: "fd", // TODO:
    description: data?.desc,
    descriptionEn: "sdf", // TODO:
    instructions: data?.instructions,
    instructionsEn: "wer", // TODO:
    start_delivery: data?.start_date,
    end_delivery: data?.end_date,
    grade: data?.degree,
    file: data?.attachment,
  };
  return <InstructorAddHomework editObj={editObj} />;
};

export default InstructorEditHomework;
