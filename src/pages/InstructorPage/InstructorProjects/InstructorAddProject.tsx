import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { BaseInput, Button, DateInputField } from "../../../components";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const InstructorAddProject = () => {
  const [sortOption, setSortOption] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    titleHomework: "",
    description: "",
    instructions: "",
    start_delivery: "",
    end_delivery: "",
    grade: "",
  };

  const sortOptions = [
    { value: "none", label: t("none") },
    { value: "asc", label: t("ascending") },
    { value: "desc", label: t("descending") },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        navigate(-1);
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className="p-6 space-y-4 bg-white rounded-xl">
            <h2 className="mb-6 text-2xl font-bold text-mainColor">
              {t("add project")}
            </h2>
            <Select
              value={sortOption}
              onChange={setSortOption}
              options={sortOptions}
              placeholder={t("sort by : none")}
              className="w-96"
            />
            <div>
              <BaseInput
                name="titleHomework"
                id="titleHomework"
                type="text"
                className="w-96 text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("title homework")}
                label={t("title homework")}
                labelProps="!font-semibold"
              />
            </div>
            <div>
              <label htmlFor="description" className="font-semibold">
                {t("description")}
              </label>
              <textarea
                name="description"
                id="description"
                className="w-full text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("description")}
                value={values.description}
                onChange={(e) => {
                  setFieldValue("description", e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="instructions" className="font-semibold">
                {t("instructions")}
              </label>
              <textarea
                name="instructions"
                id="instructions"
                className="w-full text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("instructions")}
                value={values.instructions}
                onChange={(e) => {
                  setFieldValue("instructions", e.target.value);
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <DateInputField
                label={`${t("start delivery")}`}
                placeholder={`${t("start delivery")}`}
                name="start_delivery"
                className="w-44"
                labelProps={{ className: "mb-2" }}
              />
              <DateInputField
                label={`${t("end delivery")}`}
                placeholder={`${t("end delivery")}`}
                name="end_delivery"
                className="w-44"
                labelProps={{ className: "mb-2" }}
              />
            </div>

            <div>
              <BaseInput
                name="grade"
                id="grade"
                type="text"
                className="w-96 text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("grade")}
                label={t("grade")}
                labelProps="!font-semibold"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">{t("save")}</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InstructorAddProject;
