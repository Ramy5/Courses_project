import { FaRegEdit } from "react-icons/fa";
import DotsDropDown from "../../UI/DotsDropDown";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../..";
import { PiBookOpenTextBold } from "react-icons/pi";
import { MdOutlineDateRange } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customFetch from "../../../utils/axios";

interface InstructorProjectBox_TP {
  title: string;
  start_date: string;
  end_date: string;
  id: number;
  color: string;
}

const deleteProject = async (id: number) => {
  const response = await customFetch.delete(`/projects/${id}`);
  return response;
};

const InstructorProjectBox = (props: InstructorProjectBox_TP) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    title: projectMaterial,
    start_date: projectStartShow,
    end_date: projectEndShow,
    id: projectId,
    color,
  } = props;

  const [openRow, setOpenRow] = useState<number | null>(null);
  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["delete-project"],
    mutationFn: deleteProject,
    onSuccess: (data) => {
      toast.success(t("the project has deleted successfully"));
      queryClient.invalidateQueries(["all-projects"]);
    },
  });

  const handleDeleteProject = () => deleteMutate(projectId);

  return (
    <div
      style={{ borderColor: color }}
      className={`border-s-[15px] rounded-xl bg-white shadow-sm`}
    >
      <div className="p-4 border-b border-gray-400">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <PiBookOpenTextBold className="text-2xl text-mainColor" />
            <h2 className="w-64 text-xl font-bold truncate text-mainColor">
              {projectMaterial}
            </h2>
          </div>
          <DotsDropDown
            onFirstClick={() =>
              navigate(`/instructors/editProject/${projectId}`)
            }
            onSecondClick={() => handleDeleteProject()}
            firstName="edit"
            firstIcon={<FaRegEdit size={22} className="fill-mainColor" />}
            secondName="delete"
            secondIcon={<RiDeleteBin5Line size={22} className="fill-mainRed" />}
            isOpen={openRow == projectId}
            onToggle={() => handleToggleDropDown(projectId)}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="flex items-center gap-2">
            <span>
              <MdOutlineDateRange className="text-xl text-mainColor" />
            </span>
            <span>{projectStartShow}</span>
          </p>
          <FaArrowLeftLong className="text-mainColor" />
          <p className="flex items-center gap-2">
            <span>
              <MdOutlineDateRange className="text-xl text-mainColor" />
            </span>
            <span>{projectEndShow}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end p-4">
        <Button
          action={() => navigate(`/instructors/viewProject/${projectId}`)}
        >
          {t("watch")}
        </Button>
      </div>
    </div>
  );
};

export default InstructorProjectBox;
