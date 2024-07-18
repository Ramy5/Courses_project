import { Form, Formik } from "formik";
import BaseInput from "../../UI/BaseInput";
import { t } from "i18next";
import selectStyle from "../../../utils/selectStyle";
import { Button } from "../..";
import Select from "react-select";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const AddLectureTiming = ({
  setSteps,
  scheduleData,
  setScheduleData,
  scheduleId,
  editStudySchedule,
  setEditStudySchedule,
}) => {
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

  const fetchTeacherData = async () => {
    const response = await customFetch(`/allTeachers`);
    return response;
  };

  const { data } = useQuery({
    queryKey: ["teacher_data"],
    queryFn: fetchTeacherData,
  });

  const teachersData = data && data?.data?.data.teachers;

  const teachersOption = teachersData?.map((teacher) => ({
    id: teacher.id,
    value: teacher.full_name,
    label: teacher.full_name,
  }));

  const fetchCoursesData = async () => {
    const response = await customFetch(`/courses`);
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

  return (
    <div className="p-6 bg-white rounded-xl">
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, setFieldValue }) => {
          console.log("🚀 ~ AddLectureTiming ~ values:", values);

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
                      console.log("🚀 ~ AddLectureTiming ~ e:", e);
                      setFieldValue("course_id", e.id);
                      setFieldValue("course_name", e.value);
                      setCoursesSelect({
                        id: e.id,
                        label: e.value,
                        value: e.value,
                      });
                    }}
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
                  />
                </div>

                <div className="flex justify-between flex-col sm:flex-row mt-5 gap-y-4">
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
                    />
                  </div>
                </div>

                <div className=" my-8 ">
                  <p className="font-semibold text-base mb-4">
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
                  type="button"
                  action={() => {
                    // setScheduleData((prevState) => ({
                    //   ...prevState,
                    //   lecture_time: [...prevState.lecture_time, values],
                    // }));
                    setScheduleData((prevState) => {
                      // Find the index of the item to be edited
                      const index = prevState.lecture_time.findIndex(
                        (item) => item.id === values.id
                      );

                      if (index !== -1) {
                        // Replace the old item with the new one
                        const updatedLectureTime = [...prevState.lecture_time];
                        updatedLectureTime[index] = values;

                        return {
                          ...prevState,
                          lecture_time: updatedLectureTime,
                        };
                      } else {
                        // If the item is not found, add it as a new item
                        return {
                          ...prevState,
                          lecture_time: [...prevState.lecture_time, values],
                        };
                      }
                    });
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
