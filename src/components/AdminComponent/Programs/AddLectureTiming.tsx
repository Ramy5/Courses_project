import { Form, Formik } from "formik";
import BaseInput from "../../UI/BaseInput";
import { t } from "i18next";
import selectStyle from "../../../utils/selectStyle";
import { Button } from "../..";
import Select from "react-select";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingIndicator from "../../UI/LoadingIndicator";
import { toast } from "react-toastify";

const AddLectureTiming = ({
  setSteps,
  scheduleData,
  setScheduleData,
  scheduleId,
  editStudySchedule,
  setEditStudySchedule,
}) => {
  console.log("🚀 ~ scheduleData:", scheduleData);
  const [coursesSelect, setCoursesSelect] = useState(null);
  const [groupSelect, setGroupSelect] = useState(null);
  const [teacherSelect, setTeacherSelect] = useState(null);
  const [levelSelect, setLevelSelect] = useState(null);

  const initialValues = {
    day_id:
      editStudySchedule?.day_id ||
      JSON.parse(localStorage.getItem("day"))?.id ||
      0,
    program_id: editStudySchedule?.program_id || scheduleId,
    id: editStudySchedule?.id || crypto.randomUUID(),
    course_id: editStudySchedule?.course_id || 0,
    course_name: editStudySchedule?.course_name || "",
    start_time: editStudySchedule?.start_time || "",
    end_time: editStudySchedule?.end_time || "",
    group: editStudySchedule?.group || "",
    group_name: editStudySchedule?.group_name || "",
    teacher_id: editStudySchedule?.teacher_id || 0,
    teacher_name: editStudySchedule?.teacher_name || "",
    level: editStudySchedule?.level || "",
  };

  const fetchCoursesData = async () => {
    const response = await customFetch(`/courses?per_page=10000`);
    return response;
  };

  const { data: courses } = useQuery({
    queryKey: ["coueses_data"],
    queryFn: fetchCoursesData,
  });

  const coursesData = courses && courses?.data?.data.courses;

  const courseOption = coursesData?.map((teacher) => ({
    id: teacher.id,
    value: teacher.course_name,
    label: teacher.course_name,
  }));

  const fetchTeacherData = async () => {
    const response = await customFetch(
      `/allTeachers?course_id=${coursesSelect?.id}?per_page=10000`
    );
    return response;
  };

  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ["teacher_data"],
    queryFn: fetchTeacherData,
  });

  const teachersData = data && data?.data?.data.teachers;

  const teachersOption = teachersData?.map((teacher) => ({
    id: teacher.id,
    value: teacher.full_name,
    label: teacher.full_name,
  }));

  const levelsOption = [
    {
      label: `${t("level")} 1`,
      value: "level 1",
      id: 1,
    },
    {
      label: `${t("level")} 2`,
      value: "level 2",
      id: 2,
    },
    {
      label: `${t("level")} 3`,
      value: "level 3",
      id: 3,
    },
    {
      label: `${t("level")} 4`,
      value: "level 4",
      id: 4,
    },
  ];

  const groupNumberOption = [
    {
      label: `1`,
      value: "1",
      id: 1,
    },
    {
      label: `2`,
      value: "2",
      id: 2,
    },
  ];

  useEffect(() => {
    if (editStudySchedule) {
      const editLevel = {
        id: editStudySchedule?.level || "",
        label: editStudySchedule?.level || t("level"),
        value: editStudySchedule?.level || "",
      };

      const editGroup = {
        id: editStudySchedule?.group || "",
        label: editStudySchedule?.group_name || t("branch"),
        value: editStudySchedule?.group_name || "",
      };

      const editTeacher = {
        id: editStudySchedule?.teacher_id || "",
        label: editStudySchedule?.teacher_name || t("lecturer"),
        value: editStudySchedule?.teacher_name || "",
      };

      const editCourses = {
        id: editStudySchedule?.course_id || "",
        label: editStudySchedule?.course_name || t("course"),
        value: editStudySchedule?.course_name || "",
      };

      setLevelSelect(editLevel);
      setGroupSelect(editGroup);
      setTeacherSelect(editTeacher);
      setCoursesSelect(editCourses);
    }
  }, [editStudySchedule]);

  useEffect(() => {
    refetch();
  }, [coursesSelect]);

  return (
    <div className="p-6 bg-white rounded-xl">
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, setFieldValue }) => {
          console.log("🚀 ~ values:", values);
          return (
            <Form>
              <div className="w-full md:w-4/5">
                <h2 className="mb-4 text-xl font-semibold">
                  {t("add lecture timing")}
                </h2>
                <BaseInput
                  name="day"
                  id="day"
                  value={scheduleData?.day?.day}
                  type="text"
                  label={t("day")}
                  className="w-full text-lg py-1 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("day")}
                  labelProps="font-semibold text-base"
                  disabled={true}
                />
                <div className="my-5">
                  <label htmlFor="course" className="font-bold">
                    {t("course")}
                  </label>
                  <Select
                    styles={selectStyle}
                    id="course_id"
                    name="course_id"
                    placeholder={t("course")}
                    options={courseOption}
                    value={coursesSelect}
                    onChange={(e) => {
                      setFieldValue("course_id", e.id);
                      setFieldValue("course_name", e.value);
                      setCoursesSelect({
                        id: e.id,
                        label: e.value,
                        value: e.value,
                      });
                    }}
                    isLoading={isLoading || isFetching}
                    components={{ LoadingIndicator }}
                  />
                </div>

                <div>
                  <label htmlFor="section" className="font-bold">
                    {t("branch")}
                  </label>
                  <Select
                    styles={selectStyle}
                    id="group"
                    name="group"
                    placeholder={t("branch")}
                    options={groupNumberOption}
                    value={groupSelect}
                    onChange={(e) => {
                      setFieldValue("group", e.id);
                      setFieldValue("group_name", e.value);
                      setGroupSelect({
                        id: e.id,
                        label: e.value,
                        value: e.value,
                      });
                    }}
                    isLoading={isLoading || isFetching}
                    components={{ LoadingIndicator }}
                  />
                </div>

                <div className="flex flex-col justify-between mt-5 sm:flex-row gap-y-4">
                  <div className="w-full sm:w-3/5">
                    <label htmlFor="section" className="font-bold">
                      {t("lecturer")}
                    </label>
                    <Select
                      styles={selectStyle}
                      id="teacher_id"
                      name="teacher_id"
                      placeholder={t("lecturer")}
                      options={teachersOption}
                      value={teacherSelect}
                      onChange={(e) => {
                        setFieldValue("teacher_id", e.id);
                        setFieldValue("teacher_name", e.value);
                        setTeacherSelect({
                          id: e.id,
                          label: e.value,
                          value: e.value,
                        });
                      }}
                      isLoading={isLoading || isFetching}
                      components={{ LoadingIndicator }}
                    />
                  </div>
                  <div className="w-full sm:w-[30%]">
                    <label htmlFor="section" className="font-bold">
                      {t("level")}
                    </label>
                    <Select
                      styles={selectStyle}
                      id="level"
                      name="level"
                      placeholder={t("level")}
                      options={levelsOption}
                      value={levelSelect}
                      onChange={(e) => {
                        setFieldValue("level", e.id);
                        setLevelSelect({
                          id: e.id,
                          label: e.value,
                          value: e.value,
                        });
                      }}
                      isLoading={isLoading || isFetching}
                      components={{ LoadingIndicator }}
                    />
                  </div>
                </div>

                <div className="my-8 ">
                  <p className="mb-4 text-base font-semibold">
                    {t("lecture timing")}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                    <BaseInput
                      name="start_time"
                      id="start_time"
                      type="time"
                      label={t("start")}
                      className="w-full text-lg py-1 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("")}
                      labelProps="font-semibold text-base"
                    />
                    <BaseInput
                      name="end_time"
                      id="end_time"
                      type="time"
                      label={t("end")}
                      className="w-full text-lg py-1 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("")}
                      labelProps="font-semibold text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-5 mt-12">
                <Button
                  type="button"
                  action={() => {
                    const isAppointmentBooked =
                      scheduleData?.lecture_time?.some((lecture) => {
                        const { day_id, start_time, end_time } = lecture;
                        const valueStartTime = values.start_time;
                        const valueEndTime = values.end_time;

                        return (
                          valueStartTime < end_time &&
                          valueEndTime > start_time &&
                          day_id == values.day_id
                        );
                      });

                    const index = scheduleData?.lecture_time?.findIndex(
                      (item) => item.id === values.id
                    );

                    if (values?.start_time == values?.end_time) {
                      toast.info(
                        "the beginning of the timing cannot coincide with the end"
                      );
                      return;
                    }

                    if (values?.start_time > values?.end_time) {
                      toast.info(
                        "the end time cannot be earlier than the start time"
                      );
                      return;
                    }

                    if (isAppointmentBooked && index === -1) {
                      toast.info("this appointment has been booked");
                      return;
                    }

                    const updatedLectureTime = [...scheduleData.lecture_time];

                    updatedLectureTime[index] = values;

                    if (index !== -1) {
                      setScheduleData((prevState) => ({
                        ...prevState,
                        lecture_time: updatedLectureTime,
                      }));
                    } else {
                      setScheduleData((prevState) => ({
                        ...prevState,
                        lecture_time: [...prevState.lecture_time, values],
                      }));
                    }

                    setEditStudySchedule({});
                    setSteps(1);
                  }}
                >
                  {t("submit")}
                </Button>
                <Button
                  type="button"
                  className="bg-mainBg text-mainColor"
                  action={() => setSteps(1)}
                >
                  {t("cancel")}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddLectureTiming;

// setScheduleData((prevState) => {
//   const index = prevState?.lecture_time?.findIndex(
//     (item) => item.id === values.id
//   );

//   if (index !== -1) {
//     const updatedLectureTime = [...prevState.lecture_time];
//     updatedLectureTime[index] = values;

//     return {
//       ...prevState,
//       lecture_time: updatedLectureTime,
//     };
//   } else {
//     if (appointmentBooked) {
//       console.log("🚀 ~ setScheduleData ~ error:", "error");
//       return false;
//     } else {
//       return {
//         ...prevState,
//         lecture_time: [...prevState.lecture_time, values],
//       };
//     }
//   }
// });
