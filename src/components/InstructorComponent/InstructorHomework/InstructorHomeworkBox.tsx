import { FaRegEdit } from "react-icons/fa";
import DotsDropDown from "../../UI/DotsDropDown";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { t } from "i18next";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Button } from "../..";
import { useNavigate } from "react-router-dom";
import customFetch from "../../../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const deleteHomework = async (id: number) => {
  const response = await customFetch.delete(`/homework/${id}`);
  return response;
};

interface InstructorHomeworkBox_TP {
  desc: string;
  title: string;
  start_date: string;
  end_date: string;
  countOfHomeworkDeployed: number;
  countOfRestHomework: number;
  performancePercentage: number;
  id: number;
  homeworkIsFinished: boolean;
}

const InstructorHomeworkBox = (props: InstructorHomeworkBox_TP) => {
  const {
    desc: homeworkTitle,
    title: homeworkMaterial,
    start_date: homeworkStartShow,
    end_date: homeworkEndShow,
    countOfHomeworkDeployed = 0, // TODO:
    countOfRestHomework = 0, // TODO:
    performancePercentage = 0, // TODO:
    id: homeworkId,
    homeworkIsFinished, // TODO:
  } = props;

  const [openRow, setOpenRow] = useState<number | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["delete-homework"],
    mutationFn: deleteHomework,
    onSuccess: (data) => {
      toast.success(t("the homework has deleted successfully"));
      queryClient.invalidateQueries(["all-homework"]);
    },
  });

  const handleDeleteHomework = async () => deleteMutate(homeworkId);

  return (
    <div
      className={`border-s-[15px] rounded-xl bg-white shadow-sm ${
        homeworkIsFinished ? "border-mainRed" : "border-green-600"
      }`}
    >
      <div className="p-4 border-b border-gray-400">
        <div className="flex items-center justify-between gap-2">
          <h2 className="w-64 text-xl truncate text-mainColor">
            {homeworkTitle}
          </h2>
          <DotsDropDown
            onFirstClick={() =>
              navigate(`/instructor/homeworks/edit/${homeworkId}`)
            }
            onSecondClick={() => handleDeleteHomework()}
            firstName="edit"
            firstIcon={<FaRegEdit size={22} className="fill-mainColor" />}
            secondName="delete"
            secondIcon={<RiDeleteBin5Line size={22} className="fill-mainRed" />}
            isOpen={openRow == homeworkId}
            onToggle={() => handleToggleDropDown(homeworkId)}
          />
        </div>
        <p className="mb-1 text-xl font-bold">{homeworkMaterial}</p>
        <p className="flex items-center gap-2">
          <span>{t("start show")}: </span>
          <span>{homeworkStartShow}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>{t("end show")}: </span>
          <span>{homeworkEndShow}</span>
        </p>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="flex items-center gap-2">
              <span>{t("homework deployed")}: </span>
              <span>{countOfHomeworkDeployed}</span>
            </p>
            <p className="flex items-center gap-2">
              <span>{t("rest homework")}: </span>
              <span>{countOfRestHomework}</span>
            </p>
          </div>

          <div>
            <CircularProgressbar
              className="grid w-16 text-xl font-bold"
              value={performancePercentage}
              text={`${performancePercentage}%`}
              strokeWidth={9}
              styles={buildStyles({
                textColor: "#000",
                pathColor: "#3F51B5",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <p
          className={`text-xl font-bold ${
            homeworkIsFinished ? "text-mainRed" : "text-green-600"
          }`}
        >
          {homeworkIsFinished ? t("finished") : t("current")}
        </p>
        <Button
          action={() => navigate(`/instructor/homeworks/view/${homeworkId}`)}
        >
          {t("watch")}
        </Button>
      </div>
    </div>
  );
};

export default InstructorHomeworkBox;
