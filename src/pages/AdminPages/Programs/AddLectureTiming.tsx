import { Form, Formik } from "formik";
import { BaseInput, Button } from "../../../components";
import { t } from "i18next";
import Select from "react-select";
import selectStyle from "../../../utils/selectStyle";

const AddLectureTiming = () => {
  const initialValues = {
    day: "",
    course: "",
  };

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
        {({ setFieldValue }) => {
          return (
            <Form>
              <div className="w-full md:w-4/5">
                <h2 className="font-semibold text-xl mb-4">
                  {t("add lecture timing")}
                </h2>
                <BaseInput
                  name="day"
                  id="day"
                  type="text"
                  label={t("day")}
                  className="w-full text-lg py-1 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("day")}
                  labelProps="font-semibold text-base"
                />
                <div className="my-5">
                  <label htmlFor="course" className="font-bold">
                    {t("course")}
                  </label>
                  <Select
                    styles={selectStyle}
                    id="course"
                    name="course"
                    options={courseOption}
                    // value={values?.course}
                    onChange={(e) => {
                      setFieldValue("course", e.value);
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="section" className="font-bold">
                    {t("section")}
                  </label>
                  <Select
                    styles={selectStyle}
                    id="section"
                    name="section"
                    options={sectionOption}
                    onChange={(e) => {
                      setFieldValue("section", e.value);
                    }}
                  />
                </div>

                <div className=" my-8 ">
                  <p className="font-semibold text-base mb-4">
                    {t("lecture timing")}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                    <BaseInput
                      name="start_date"
                      id="start_date"
                      type="time"
                      label={t("start")}
                      className="w-full text-lg py-1 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("")}
                      labelProps="font-semibold text-base"
                    />
                    <BaseInput
                      name="end_date"
                      id="end_date"
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
                <Button>{t("submit")}</Button>
                <Button className="bg-mainBg text-mainColor">
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
