import { useQuery } from "@tanstack/react-query";
import { Button, InstructorProjectBox } from "../../../components";
import { t } from "i18next";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import customFetch from "../../../utils/axios";
import Loading from "../../../components/UI/Loading";

const getAllProjects = async () => {
  const { data } = await customFetch("projects");
  return data.data;
};

const InstructorProjects = () => {
  const navigate = useNavigate();

  const {
    data: allProjects,
    isLoading: allProjectsIsLoading,
    isFetching: allProjectsIsFetching,
    isRefetching: allProjectsIsRefetching,
  } = useQuery({
    queryKey: ["all-projects"],
    queryFn: getAllProjects,
  });

  if (allProjectsIsLoading || allProjectsIsFetching || allProjectsIsRefetching)
    return <Loading />;

  return (
    <div>
      <div className="flex justify-end">
        <Button
          className="flex items-center gap-1"
          action={() => navigate("/instructor/projects/add")}
        >
          <IoMdAdd className="text-xl" />
          <span className="pb-1 border-b-2 border-mainColor">
            {t("add project")}
          </span>
        </Button>
      </div>

      {allProjects?.length ? (
        <div className="grid gap-12 mt-20 lg:grid-cols-2 xl:grid-cols-3">
          {allProjects?.map((project: any) => (
            <InstructorProjectBox key={project.projectId} {...project} />
          ))}
        </div>
      ) : (
        <div className="p-5 bg-white rounded-3xl my-8">
          <p className="text-center font-semibold text-xl text-mainColor py-8">
            {t("No projects added yet")}
          </p>
        </div>
      )}
    </div>
  );
};

export default InstructorProjects;
