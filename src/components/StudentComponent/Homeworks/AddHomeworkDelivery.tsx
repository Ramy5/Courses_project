import { useFormikContext } from "formik";
import { t } from "i18next";
import { CiCalendarDate } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Button } from "../..";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import {
  convertTimeToDaysHoursMinutes,
  formatDeliveryTime,
  timeStringToSeconds,
} from "../../../utils/helpers";

const addNewHomework = async (homeworkData: any) => {
  const token = Cookies.get("token");
  const response = await axios.post(
    `${BASE_URL}homeWorkAnswers`,
    homeworkData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

const addNewProject = async (projectData: any) => {
  const token = Cookies.get("token");
  const response = await axios.post(`${BASE_URL}projectAnswers`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const AddHomeworkDelivery = (props) => {
  const {
    startDate,
    startTime,
    endDate,
    endTime,
    isProject,
    dayValue,
    timeLeft,
  } = props;
  const [timeLeftData, setTimeLeftData] = useState(
    timeStringToSeconds(timeLeft)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeftData((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { days, hours, minutes, seconds } = formatDeliveryTime(timeLeftData);

  const { setFieldValue, values } = useFormikContext();
  const [files, setFiles] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  // const percentageDays = (timeData.daysCompleted / timeData.daysInWeek) * 100;
  // const totalSecondsCompleted =
  //   timeData.hoursCompleted * 3600 +
  //   timeData.minutesCompleted * 60 +
  //   timeData.secondsCompleted;
  // const percentageTime =
  //   (totalSecondsCompleted / timeData.totalSecondsInDay) * 100;

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-student-homework"],
    mutationFn: addNewHomework,
    onSuccess: (data) => {
      toast.success(t("homework has added successfully"));
      queryClient.invalidateQueries(["get-all-homeworks"]);
      navigate("/students/homeworks");
    },
  });

  const { mutate: mutateProject, isPending: isPendingProject } = useMutation({
    mutationKey: ["add-student-project"],
    mutationFn: addNewProject,
    onSuccess: (data) => {
      toast.success(t("project has added successfully"));
      queryClient.invalidateQueries(["get-all-projects"]);
      navigate("/students/projects");
    },
  });

  const handleSubmit = async () => {
    const formattedHomeworkValues: any = {
      homework_id: id,
      answer: values.brief_about_task,
      attachment: files,
    };

    const formattedProjectValues: any = {
      project_id: id,
      answer: values.brief_about_task,
      attachment: files,
    };

    isProject
      ? await mutateProject(formattedProjectValues)
      : await mutate(formattedHomeworkValues);
  };

  const handleFileChange = (event) => setFiles(event.target.files[0]);
  const handleFileDelete = () => setFiles(null);

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
              // value={percentageDays}
              text={`${days} ${t("days")}`}
              strokeWidth={9}
              styles={buildStyles({
                textColor: "#000",
                pathColor: "#46BD84",
                trailColor: "#d6d6d6",
              })}
            />
            <CircularProgressbar
              className="text-lg w-28 lg:w-32 lg:text-xl"
              // value={percentageTime}
              text={`${hours}:${minutes}:${seconds}`}
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
          <span>{props.title}</span>
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

          <div className="">
            <div className="flex flex-col items-center gap-8 sm:flex-row">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <div className="relative px-12 py-6 text-center border-2 border-dashed cursor-pointer border-mainColor">
                <label
                  htmlFor="file-upload"
                  className="absolute top-0 bottom-0 left-0 right-0 w-full h-full cursor-pointer"
                ></label>
                <AiOutlineCloudUpload
                  size={150}
                  className="fill-[#E6EAEE] m-auto"
                />
                <p>{t("drag or click to add a file")}</p>
              </div>
              {files && (
                <div className="flex items-center gap-5">
                  <div className="flex flex-col justify-center gap-1">
                    <span className="text-sm font-medium text-center text-gray-700">
                      الملفات
                    </span>
                    <div className="relative p-1 rounded-md bg-mainBg">
                      <div
                        // onClick={() => setManyPdfsOpen(true)}
                        className="flex items-center justify-center p-2 cursor-pointer "
                      >
                        <span className="absolute flex items-center justify-center w-6 h-6 text-sm font-medium text-white rounded-full -top-1 -right-3 bg-mainColor">
                          1
                        </span>
                        <HiMiniFolderArrowDown
                          className="fill-mainColor"
                          size={35}
                        />
                      </div>
                    </div>
                  </div>
                  <RiDeleteBin5Line
                    size={35}
                    className="cursor-pointer fill-mainRed"
                    onClick={handleFileDelete}
                  />
                </div>
              )}
            </div>
          </div>
          {/* <UploadFile files={fileUpload} setFiles={setFileUpload} id="file" /> */}
        </div>

        <div className="flex justify-end gap-6 mt-14">
          <Button
            className="bg-transparent border text-mainColor border-mainColor"
            action={() => navigate(-1)}
          >
            {t("cancel")}
          </Button>
          <Button loading={isPending || isPendingProject} action={handleSubmit}>
            {t("save")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddHomeworkDelivery;
