import { Form, Formik } from "formik";
import { t } from "i18next";
import Select from "react-select";
import selectStyle from "../../../utils/selectStyle";
import Schedule from "./Schedule";
import { Button } from "../..";

const StudyScheduleSecondStep = ({ setSteps }: any) => {
  const levelsOption = [
    { id: "1", value: 1, label: 1 },
    { id: "2", value: 2, label: 2 },
    { id: "3", value: 3, label: 3 },
    { id: "4", value: 4, label: 4 },
  ];

  return (
    <div>
      <div className="w-full mt-14">
        <div className="w-1/2 m-auto text-center">
          <h2 className="font-semibold text-mainColor text-2xl mb-3">
            {t("artificial intelligence programme")}
          </h2>
          <Formik initialValues={{ educational_level: "" }} onSubmit={() => {}}>
            {({ setFieldValue }) => {
              return (
                <Form className="flex items-center justify-center gap-4">
                  <label htmlFor="program_academic" className="font-bold">
                    {t("educational level")}
                  </label>
                  <Select
                    className="lg:w-[15vw] mt-2"
                    id="program_academic"
                    name="program_academic"
                    options={levelsOption}
                    placeholder="1"
                    // value={values?.level_academic}
                    onChange={(e) => {
                      setFieldValue("educational_level", e.value);
                    }}
                    styles={selectStyle}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      <Schedule />

      <div className="mt-4 flex items-center justify-end gap-5">
        <Button bordered action={() => setSteps(1)}>
          {t("Previous")}
        </Button>
        <Button action={() => setSteps(3)}>{t("Next")}</Button>
        <Button className="bg-mainRed">{t("cancel")}</Button>
      </div>
    </div>
  );
};
export default StudyScheduleSecondStep;
