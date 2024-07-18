import { Form, Formik } from "formik";
import { t } from "i18next";
import Select from "react-select";
import selectStyle from "../../../utils/selectStyle";
import Schedule from "./Schedule";
import { Button } from "../..";
import { useState, useEffect } from "react";
import Loading from "../../UI/Loading";

const StudyScheduleSecondStep = ({ setSteps, scheduleData }: any) => {
  console.log("🚀 ~ StudyScheduleSecondStep ~ scheduleData:", scheduleData);

  const [levelSelect, setLevelSelect] = useState(1);
  const [loading, setLoading] = useState(false);

  const filterScheduleData = scheduleData?.lecture_time?.filter(
    (schedule) => schedule.level === levelSelect
  );

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [levelSelect]);

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
                    className="lg:w-[15vw] mt-2 z-50"
                    id="program_academic"
                    name="program_academic"
                    options={levelsOption}
                    placeholder="1"
                    onChange={(e) => {
                      setFieldValue("educational_level", e.value);
                      setLevelSelect(e.id);
                    }}
                    styles={selectStyle}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          {levelSelect === 1 && <Schedule scheduleData={filterScheduleData} />}
          {levelSelect === 2 && <Schedule scheduleData={filterScheduleData} />}
          {levelSelect === 3 && <Schedule scheduleData={filterScheduleData} />}
          {levelSelect === 4 && <Schedule scheduleData={filterScheduleData} />}
        </>
      )}

      <div className="mt-4 flex items-center justify-end gap-5">
        <Button bordered action={() => setSteps(1)}>
          {t("previous")}
        </Button>
        <Button
          action={() => {
            setSteps(3);
          }}
        >
          {t("next")}
        </Button>
        <Button className="bg-mainRed">{t("cancel")}</Button>
      </div>
    </div>
  );
};
export default StudyScheduleSecondStep;
