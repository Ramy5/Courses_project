import { Button, MainRadio } from "../..";
import { t } from "i18next";
import { useFormikContext } from "formik";

const SideBarMenuColor = () => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="flex flex-col w-full gap-5 px-4 lg:px-16">
      <div className="grid items-center grid-cols-2 gap-8 lg:gap-16 xl:grid-cols-4 lg:grid-cols-3">
        <div className="flex flex-col items-center gap-2">
          <MainRadio
            label={t("color")}
            name="color"
            id="main"
            labelClassName="text-xl font-bold"
            checked={values.color === "#393D94"}
            onChange={() => {
              setFieldValue("color", "#393D94");
            }}
          />
          <label
            htmlFor="main"
            className="inline-block cursor-pointer h-10 bg-[#393D94] w-28"
          ></label>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MainRadio
            label={t("color")}
            name="color"
            id="second"
            labelClassName="text-xl font-bold"
            checked={values.color === "#144DAA"}
            onChange={() => {
              setFieldValue("color", "#144DAA");
            }}
          />
          <label
            htmlFor="second"
            className="inline-block cursor-pointer h-10 bg-[#144DAA] w-28"
          ></label>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MainRadio
            label={t("color")}
            name="color"
            id="third"
            labelClassName="text-xl font-bold"
            checked={values.color === "#1E0342"}
            onChange={() => {
              setFieldValue("color", "#1E0342");
            }}
          />
          <label
            htmlFor="third"
            className="inline-block h-10 cursor-pointer bg-[#1E0342] w-28"
          ></label>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MainRadio
            label={t("color")}
            name="color"
            id="fourth"
            labelClassName="text-xl font-bold"
            checked={values.color === "#025464"}
            onChange={() => {
              setFieldValue("color", "#025464");
            }}
          />
          <label
            htmlFor="fourth"
            className="inline-block cursor-pointer h-10 bg-[#025464] w-28"
          ></label>
        </div>
      </div>

      <div className="self-end mt-12">
        <Button className="me-5">{t("save")}</Button>
        <Button className="bg-[#E6EAEE] text-mainColor">{t("cancel")}</Button>
      </div>
    </div>
  );
};

export default SideBarMenuColor;
