import { t } from "i18next";
import { Fragment, useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import StudyScheduleFirstStep from "../../../components/AdminComponent/Programs/StudyScheduleFirstStep";
import StudyScheduleSecondStep from "../../../components/AdminComponent/Programs/StudyScheduleSecondStep";
import { Button } from "../../../components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customFetch from "../../../utils/axios";
import AddLectureTiming from "../../../components/AdminComponent/Programs/AddLectureTiming";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/UI/Loading";

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

const postSchedule = async (newSchedule: any) => {
  const data = await customFetch.post("/lectureTime", newSchedule);
  return data;
};

const editSchedule = async (editSchedule: any, id: number) => {
  const data = await customFetch.post(`/lectureTime/${id}`, editSchedule);
  return data;
};

const StudySchedule = () => {
  const [steps, setSteps] = useState<number>(1);

  const [scheduleData, setScheduleData] = useState({
    start_date: "",
    end_date: "",
    day: {},
    lecture_time: [],
  });

  console.log("🚀 ~ StudySchedule ~ scheduleData:", scheduleData)

  const [editStudySchedule, setEditStudySchedule] = useState({});
  const navigate = useNavigate();

  const { id: scheduleId } = useParams();

  const day = JSON.parse(localStorage.getItem("day"));

  const queryClient = useQueryClient();

  const stepsOption = [
    { id: 1, label: "schedule settings", border: true },
    { id: 2, label: "schedule view", border: true },
    { id: 3, label: "finish settings", border: false },
  ];

  const fetchInstructorSchedule = async () => {
    const response = await customFetch(`showLecture/${scheduleId}`);
    return response;
  };

  const { data, isFetching, isRefetching, isLoading, isSuccess } = useQuery({
    queryKey: ["show_lecture", scheduleId],
    queryFn: fetchInstructorSchedule,
  });

  const instructorScheduleData = data?.data?.data || [];
  console.log(
    "🚀 ~ StudySchedule ~ instructorScheduleData:",
    instructorScheduleData
  );

  // const filterScheduleData = instructorScheduleData?.filter(
  //   (schedule) => schedule.day.id === day?.id
  // );

  const lectureTimeData = instructorScheduleData?.map((schedule) => ({
    id: schedule.id,
    day_id: schedule?.day?.id,
    group: schedule.group,
    level: schedule.level,
    start_time: schedule.start_time.split(":").slice(0, 2).join(":"),
    end_time: schedule.end_time.split(":").slice(0, 2).join(":"),
    program_id: schedule?.program.id,
    program_name: schedule?.program.program_name,
    course_name: schedule?.course.course_name,
    course_id: schedule?.course.id,
    group_name: schedule.group,
    teacher_id: schedule.teacher?.id,
    teacher_name: schedule.teacher?.full_name,
  }));
  
  useEffect(() => {
    if (data) {
      setScheduleData({
        day: day,
        start_date: instructorScheduleData[0]?.program?.start_date,
        end_date: instructorScheduleData[0]?.program?.end_date,
        lecture_time: lectureTimeData || [],
      });
    }
  }, [isSuccess]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-schedule"],
    mutationFn: postSchedule,
    onSuccess: (data) => {
      queryClient.invalidateQueries("schedule");
      toast.success(t("study schedule has been added successfully"));
      navigate("/programs");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0]?.email[0];
      toast.error(errorMessage);
    },
  });

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationKey: ["edit-schedule"],
    mutationFn: (editScheduleData: any) =>
      editSchedule(editScheduleData, Number(instructorScheduleData[0]?.id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries("schedule");
      toast.success(t("study schedule has been edited successfully"));
      navigate("/programs");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  const handleAddSchedule = async (values: AddSchedule_TP) => {
    const newSchedule = {
      end_date: values.end_date,
      lecture_times: values.lecture_time,
      start_date: values.start_date,
    };
    console.log("🚀 ~ handleAddSchedule ~ newSchedule:", newSchedule);

    instructorScheduleData?.length
      ? await editMutate(newSchedule)
      : await mutate(newSchedule);
  };

  if (isFetching || isRefetching || isLoading) return <Loading />;

  return (
    <div>
      {steps !== 4 && (
        <div className="relative px-4 py-8 bg-white rounded-xl">
          <div className="flex items-center w-4/5 m-auto">
            {stepsOption.map((step, index) => (
              <Fragment key={index}>
                <div className="relative flex items-center text-mainborder-mainColor">
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
                  <div className="absolute top-0 mt-12 -ml-10 text-sm font-semibold -left-3 w-28 text-mainColor">
                    {t(`${step.label}`)}
                  </div>
                </div>
                {step.border && index < stepsOption.length - 1 && (
                  <div
                    className={`${
                      (steps === 2 && index === 0) ||
                      (steps === 3 && (index === 0 || index === 1))
                        ? "border-mainColor"
                        : "border-lightGray"
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
              isFetching={isFetching}
              isRefetching={isRefetching}
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
                  className="py-3 mt-20 text-xl font-semibold rounded-2xl"
                  action={() => {
                    handleAddSchedule(scheduleData);
                    localStorage.removeItem("day")
                  }}
                  loading={isPending || editIsPending}
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
