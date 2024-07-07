import { FaRegEdit } from "react-icons/fa";
import DotsDropDown from "../../UI/DotsDropDown";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { t } from "i18next";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Button } from "../..";
import { useNavigate } from "react-router-dom";

interface InstructorHomeworkBox_TP {
  homeworkTitle: string;
  homeworkMaterial: string;
  homeworkStartShow: string;
  homeworkEndShow: string;
  countOfHomeworkDeployed: number;
  countOfRestHomework: number;
  performancePercentage: number;
  homeworkId: number;
  homeworkIsFinished: boolean;
}

const InstructorHomeworkBox = (props: InstructorHomeworkBox_TP) => {
  const {
    homeworkTitle,
    homeworkMaterial,
    homeworkStartShow,
    homeworkEndShow,
    countOfHomeworkDeployed,
    countOfRestHomework,
    performancePercentage,
    homeworkId,
    homeworkIsFinished,
  } = props;

  const [openRow, setOpenRow] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

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
            instructorId={homeworkId}
            instructorRoute="/instructors/addHomework"
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
          action={() => navigate(`/instructors/viewHomework/${homeworkId}`)}
        >
          {t("watch")}
        </Button>
      </div>
    </div>
  );
};

export default InstructorHomeworkBox;
