import { t } from "i18next";
import { Fragment, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import StudyScheduleFirstStep from "../../../components/AdminComponent/Programs/StudyScheduleFirstStep";
import StudyScheduleSecondStep from "../../../components/AdminComponent/Programs/StudyScheduleSecondStep";
import { Button } from "../../../components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customFetch from "../../../utils/axios";
import AddLectureTiming from "../../../components/AdminComponent/Programs/AddLectureTiming";
import { useNavigate, useParams } from "react-router-dom";

interface AddSchedule_TP {
  program_name: string;
  program_type: boolean;
  program_code: string;
  specialization: string;
  academic_levels: string;
  number_classes: string;
  vision: string;
  message: string;
  excellence: string;
  very_good: string;
  good: string;
  acceptable: string;
}
interface scheduleAdd_TP {
  editObj?: AddSchedule_TP;
  setActiveTab: (activeTab: string) => void;
  setInstructorID: (id: number) => void;
}

const postSchedule = async (newSchedule: any) => {
  const data = await customFetch.post("/lectureTime", newSchedule);
  return data;
};

const StudySchedule = () => {
  const [steps, setSteps] = useState<number>(1);
  const [scheduleData, setScheduleData] = useState({
    day: {},
    start_date: "",
    end_date: "",
    lecture_time: [],
  });
  console.log("🚀 ~ StudySchedule ~ scheduleData:", scheduleData);
  const [editStudySchedule, setEditStudySchedule] = useState({});
  console.log("🚀 ~ StudySchedule ~ editStudySchedule:", editStudySchedule);
  const navigate = useNavigate();

  const { id: scheduleId } = useParams();
  console.log("🚀 ~ StudySchedule ~ scheduleId:", scheduleId);

  const queryClient = useQueryClient();

  const stepsOption = [
    { id: 1, label: "schedule settings", border: true },
    { id: 2, label: "schedule view", border: true },
    { id: 3, label: "finish settings", border: false },
  ];

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-program"],
    mutationFn: postSchedule,
    onSuccess: (data) => {
      queryClient.invalidateQueries("schedule");
      toast.success(t("study schedule has been added successfully"));
      navigate("/programs");
    },
    onError: (error) => {
      console.log("🚀 ~ error:", error);
      const errorMessage =
        error?.response?.data?.error[0]?.email[0] ||
        error?.response?.data?.error[0]?.password[0];
      toast.error(errorMessage);
    },
  });

  const handleAddSchedule = async (values: AddSchedule_TP) => {
    const newSchedule = {
      end_date: values.end_date,
      lecture_times: values.lecture_time,
      start_date: values.start_date,
    };

    await mutate(newSchedule);
  };

  // const { mutate: editMutate } = useMutation({
  //   mutationKey: ["edit_program"],
  //   mutationFn: (editInstructor: any) =>
  //     editInstructorLogin(editInstructor, Number(editObj?.id)),
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries("program");
  //     toast.success(
  //       t("instructor login information has been added successfully")
  //     );
  //   },
  //   onError: (error) => {
  //     const errorMessage =
  //       error?.response?.data?.error[0]?.email[0] ||
  //       error?.response?.data?.error[0]?.password[0];
  //     toast.error(errorMessage);
  //   },
  // });

  return (
    <div>
      {steps !== 4 && (
        <div className="bg-white py-8 px-4 rounded-xl relative">
          <div className="flex items-center w-4/5 m-auto">
            {stepsOption.map((step, index) => (
              <Fragment key={index}>
                <div className="flex items-center text-mainborder-mainColor relative">
                  <div
                    className={`${
                      steps === step.id
                        ? "bg-mainColor text-white"
                        : "border-2 border-mainColor text-mainColor"
                    } rounded-full transition duration-500 ease-in-out flex justify-center items-center h-11 w-11 font-semibold text-xl`}
                  >
                    {(steps === 2 && index === 0) ||
                    (steps === 3 && (index === 0 || index === 1)) ? (
                      <GiCheckMark size={22} className="fill-[#4ECB71]" />
                    ) : (
                      `${step.id}`
                    )}
                  </div>
                  <div className="absolute top-0 -left-3 w-28 -ml-10 mt-12 text-sm font-semibold text-mainColor">
                    {t(`${step.label}`)}
                  </div>
                </div>
                {step.border && index < stepsOption.length - 1 && (
                  <div
                    className={`${
                      (steps === 2 && index === 0) ||
                      (steps === 3 && (index === 0 || index === 1))
                        ? "border-mainColor"
                        : "border-[#E6EAEE]"
                    } flex-auto border-t-2 transition duration-500 ease-in-out`}
                  ></div>
                )}
              </Fragment>
            ))}
          </div>

          {steps === 1 && (
            <StudyScheduleFirstStep
              setSteps={setSteps}
              scheduleData={scheduleData}
              setScheduleData={setScheduleData}
              setEditStudySchedule={setEditStudySchedule}
            />
          )}

          {steps === 2 && (
            <StudyScheduleSecondStep
              setSteps={setSteps}
              scheduleData={scheduleData}
              handleAddSchedule={handleAddSchedule}
            />
          )}

          {steps === 3 && (
            <div className="w-full h-[480px] flex">
              <div className="w-3/5 m-auto text-center">
                <h1 className="text-[#073051] opacity-100 font-semibold text-2xl">
                  {t(
                    "program schedule settings for the selected study period have been completed. Click “Save Schedule” to complete the setup process."
                  )}
                </h1>
                <Button
                  className="font-semibold text-xl py-3 rounded-2xl mt-20"
                  action={() => {
                    handleAddSchedule(scheduleData);
                  }}
                  loading={isPending}
                >
                  {t("save table")}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {steps === 4 && (
        <AddLectureTiming
          setSteps={setSteps}
          setScheduleData={setScheduleData}
          scheduleData={scheduleData}
          scheduleId={scheduleId}
          editStudySchedule={editStudySchedule}
          setEditStudySchedule={setEditStudySchedule}
        />
      )}
    </div>
  );
};

export default StudySchedule;
