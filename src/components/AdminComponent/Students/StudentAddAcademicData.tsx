import { t } from "i18next";
import BaseInput from "../../UI/BaseInput";
import { Button, DateInputField } from "../..";
import Select from "react-select";
import { useFormikContext } from "formik";

const StudentAddAcademicData = () => {
  const { values, setFieldValue } = useFormikContext();

  const option = [
    {
      label: "test 1",
      value: "test 1",
      id: 1,
    },
    {
      label: "test 2",
      value: "test 2",
      id: 2,
    },
  ];

  return (
    <div className="flex flex-col w-full gap-5 px-4 lg:px-16 md:w-3/4">
      <BaseInput
        name="number_academic"
        id="number_academic"
        type="text"
        className="lg:w-[35vw] text-lg py-2 bg-[#E6EAEE] rounded-lg main_shadow text-slate-800 focus-within:outline-none"
        placeholder={t("academic number")}
        label={t("academic number")}
        labelProps="!font-semibold"
      />

      <div>
        <label htmlFor="program_academic" className="font-bold">
          {t("program")}
        </label>
        <Select
          className="lg:w-[35vw] mt-2"
          id="program_academic"
          name="program_academic"
          options={option}
          // value={values?.level_academic}
          onChange={(e) => {
            setFieldValue("program_academic", e.value);
          }}
        />
      </div>

      <div>
        <label htmlFor="level_academic" className="font-bold">
          {t("level")}
        </label>
        <Select
          className="lg:w-[35vw] mt-2"
          id="level_academic"
          name="level_academic"
          options={option}
          // value={values?.level_academic}
          onChange={(e) => {
            setFieldValue("level_academic", e.value);
          }}
        />
      </div>

      <div>
        <label htmlFor="division_number_academic" className="font-bold">
          {t("division number")}
        </label>
        <Select
          className="lg:w-[35vw] mt-2"
          id="division_number_academic"
          name="division_number_academic"
          options={option}
          onChange={(e) => {
            setFieldValue("division_number_academic", e.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <DateInputField
          label={`${t("joining date")}`}
          placeholder={`${t("joining date")}`}
          name="join_date_academic"
          className="w-full md:w-1/2"
          labelProps={{ className: "mb-2  !font-bold" }}
        />
      </div>

      <div className="mt-8">
        <Button className="me-5">{t("confirm")}</Button>
        <Button className="bg-[#E6EAEE] text-mainColor">{t("cancel")}</Button>
      </div>
    </div>
  );
};

export default StudentAddAcademicData;
