import { useFormikContext } from "formik";
import { t } from "i18next";
import { CiCalendarDate } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import UploadFile from "../../UI/UploadFile";
import { useEffect, useState } from "react";
import { Button } from "../..";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AddHomeworkDelivery = (props) => {
  const { startDate, startTime, endDate, endTime, isProject } = props;
  const { setFieldValue, values } = useFormikContext();
  const [fileUpload, setFileUpload] = useState(null);
  const navigate = useNavigate();

  const [timeData, setTimeData] = useState({
    daysInWeek: 7,
    hoursInDay: 24,
    totalSecondsInDay: 24 * 3600, // 24 * 60 * 60
    daysCompleted: 3,
    hoursCompleted: 3,
    minutesCompleted: 30,
    secondsCompleted: 30,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeData((prevData) => {
        const newSeconds =
          prevData.secondsCompleted > 0 ? prevData.secondsCompleted - 1 : 59;
        const newMinutes =
          newSeconds === 59
            ? prevData.minutesCompleted > 0
              ? prevData.minutesCompleted - 1
              : 59
            : prevData.minutesCompleted;
        const newHours =
          newMinutes === 59 && newSeconds === 59
            ? prevData.hoursCompleted > 0
              ? prevData.hoursCompleted - 1
              : 23
            : prevData.hoursCompleted;
        const newDays =
          newHours === 23 && newMinutes === 59 && newSeconds === 59
            ? prevData.daysCompleted > 0
              ? prevData.daysCompleted - 1
              : prevData.daysInWeek - 1
            : prevData.daysCompleted;

        return {
          ...prevData,
          daysCompleted: newDays,
          hoursCompleted: newHours,
          minutesCompleted: newMinutes,
          secondsCompleted: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const percentageDays = (timeData.daysCompleted / timeData.daysInWeek) * 100;
  const totalSecondsCompleted =
    timeData.hoursCompleted * 3600 +
    timeData.minutesCompleted * 60 +
    timeData.secondsCompleted;
  const percentageTime =
    (totalSecondsCompleted / timeData.totalSecondsInDay) * 100;

  return (
    <div className="grid h-full gap-8 xl:grid-cols-3">
      {/* DELIVERY TIME  */}
      <div className="col-span-2 p-6 bg-white lg:col-span-1 rounded-xl">
        <h2 className="mb-10 text-3xl font-bold text-mainColor">
          {t("delivery time")}
        </h2>

        <div className="space-y-8 text-xl">
          <div>
            <p className="mb-3 text-2xl text-mainColor">
              {t("offer start date")}
            </p>
            <div className="flex items-center gap-8 px-4 mt-4">
              <p className="flex items-center gap-2">
                <span>
                  <CiCalendarDate className="text-xl text-mainColor" />
                </span>
                <span>{startDate}</span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <IoTimeOutline className="text-xl text-mainColor" />
                </span>
                <span>{startTime}</span>
              </p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-2xl text-mainColor">
              {t("offer end date")}
            </p>

            <div className="flex items-center gap-8 px-4 mt-4">
              <p className="flex items-center gap-2">
                <span>
                  <CiCalendarDate className="text-xl text-mainColor" />
                </span>
                <span>{endDate}</span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <IoTimeOutline className="text-xl text-mainColor" />
                </span>
                <span>{endTime}</span>
              </p>
            </div>
          </div>

          <div className="grid items-center justify-center grid-cols-2">
            <CircularProgressbar
              className="text-lg w-28 lg:w-32 lg:text-xl"
              value={percentageDays}
              text={`${timeData.daysCompleted} ${t("days")}`}
              strokeWidth={9}
              styles={buildStyles({
                textColor: "#000",
                pathColor: "#46BD84",
                trailColor: "#d6d6d6",
              })}
            />
            <CircularProgressbar
              className="text-lg w-28 lg:w-32 lg:text-xl"
              value={percentageTime}
              text={`${timeData.hoursCompleted}:${timeData.minutesCompleted}:${timeData.secondsCompleted}`}
              strokeWidth={9}
              styles={buildStyles({
                textColor: "#000",
                pathColor: "#46BD84",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
        </div>
      </div>

      {/* HOMEWORK */}
      <div className="col-span-2 p-6 bg-white rounded-xl">
        <h2 className="mb-10 text-3xl font-bold text-mainColor">
          <span>{isProject ? t("project") : t("homework")}: </span>
          <span>الخطاب الخارجي</span>
        </h2>

        <div className="mb-3">
          <label htmlFor="brief_about_task" className="font-semibold">
            {t("write your answer")}
          </label>
          <textarea
            name="brief_about_task"
            rows={5}
            id="brief_about_task"
            className="w-full px-4 py-2 mt-4 text-lg bg-white border rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("brief about task")}
            onChange={(e) => {
              setFieldValue("brief_about_task", e.target.value);
            }}
          />
        </div>

        <hr />

        <div className="flex flex-col items-start mt-8 text-center">
          <h2 className="px-6 text-xl font-bold">{t("files")}</h2>
          <UploadFile files={fileUpload} setFiles={setFileUpload} id="file" />
        </div>

        <div className="flex justify-end gap-6 mt-14">
          <Button
            className="bg-transparent border text-mainColor border-mainColor"
            action={() => navigate(-1)}
          >
            {t("cancel")}
          </Button>
          <Button
            action={() =>
              navigate(isProject ? "/students/projects" : "/students/homeworks")
            }
          >
            {t("save")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddHomeworkDelivery;
