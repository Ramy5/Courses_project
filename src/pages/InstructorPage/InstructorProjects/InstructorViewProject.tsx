import React from "react";
import { Banar, StudentHomeworkDescription } from "../../../components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import customFetch from "../../../utils/axios";
import { useRTL } from "../../../hooks/useRTL";

const getProject = async (id: number | string) => {
  const { data } = await customFetch(`projects/${id}`);
  return data.data;
};

const InstructorViewProject = () => {
  const { id } = useParams();

  const {
    data: project,
    isLoading: projectIsLoading,
    isFetching: projectIsFetching,
    isRefetching: projectIsRefetching,
  } = useQuery({
    queryKey: ["view-one-project"],
    queryFn: () => getProject(id),
  });

  if (projectIsLoading || projectIsFetching || projectIsRefetching)
    return <Loading />;

  return (
    <div className="p-6 space-y-6 bg-white border rounded-3xl">
      {/* BANAR */}
      <Banar
        isProject
        banarTitle={project?.title}
        banarMaterial={project?.desc}
      />

      {/* DESCRIPTION */}
      <StudentHomeworkDescription {...project} isInstructorProject />
    </div>
  );
};

export default InstructorViewProject;
