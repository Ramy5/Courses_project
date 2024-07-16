import { Form, Formik } from "formik";
import BaseInput from "../../UI/BaseInput";
import { t } from "i18next";
import selectStyle from "../../../utils/selectStyle";
import { Button } from "../..";
import Select from "react-select";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";

const AddLectureTiming = ({ setSteps, scheduleData, setScheduleData }) => {
  const initialValues = {
    day_id: JSON.parse(localStorage.getItem("day"))?.id || 0,
    course_id: 0,
    course_name: "",
    start_time: "",
    end_time: "",
    group: "",
    group_name: "",
    teacher_id: 0,
    teacher_name: "",
    level: "",
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
  console.log("🚀 ~ teachersOption:", teachersOption);

  const levelsOption = [
    { id: 1, value: 1, label: 1 },
    { id: 2, value: 2, label: 2 },
    { id: 3, value: 3, label: 3 },
    { id: 4, value: 4, label: 4 },
  ];

  const courseOption = [
    {
      id: 1,
      value: "ذكاء اصطناعي",
      label: "ذكاء اصطناعي",
    },
    {
      id: 2,
      value: "حاسبات ومعلومات",
      label: "حاسبات ومعلومات",
    },
    {
      id: 3,
      value: "نظم ومعلومات",
      label: "نظم ومعلومات",
    },
  ];

  const sectionOption = [
    {
      id: 1,
      value: "شعبة - 1",
      label: "شعبة - 1",
    },
    {
      id: 2,
      value: "شعبة - 2",
      label: "شعبة - 2",
    },
    {
      id: 3,
      value: "شعبة - 3",
      label: "شعبة - 3",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, setFieldValue }) => {
          console.log("🚀 ~ AddLectureTiming ~ values:", values);

          return (
            <Form>
              <div className="w-full md:w-4/5">
                <h2 className="font-semibold text-xl mb-4">
                  {t("add lecture timing")}
                </h2>
                <BaseInput
                  name="day"
                  id="day"
                  value={scheduleData.day.day}
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
                    onChange={(e) => {
                      console.log("🚀 ~ AddLectureTiming ~ e:", e);
                      setFieldValue("course_id", e.id);
                      setFieldValue("course_name", e.value);
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
                    options={sectionOption}
                    onChange={(e) => {
                      setFieldValue("group", e.id);
                      setFieldValue("group_name", e.value);
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
                      onChange={(e) => {
                        setFieldValue("teacher_id", e.id);
                        setFieldValue("teacher_name", e.value);
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
                      onChange={(e) => {
                        setFieldValue("level", e.id);
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

              <div className="mt-12 flex items-center justify-end gap-5">
                <Button
                  type="button"
                  action={() => {
                    setScheduleData((prevState) => ({
                      ...prevState,
                      lecture_time: [...prevState.lecture_time, values],
                    }));
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
