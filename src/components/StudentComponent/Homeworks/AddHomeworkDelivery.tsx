import { useFormikContext } from "formik";
import { t } from "i18next";
import { CiCalendarDate } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import UploadFile from "../../UI/UploadFile";
import { useState } from "react";
import { Button } from "../..";
import { useNavigate } from "react-router-dom";

const AddHomeworkDelivery = (props) => {
  const { startDate, startTime, endDate, endTime } = props;
  const { setFieldValue, values } = useFormikContext();
  const [fileUpload, setFileUpload] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="grid h-full gap-8 xl:grid-cols-3">
      {/* DELIVERY TIME  */}
      <div className="col-span-1 p-6 bg-white rounded-xl">
        <h2 className="mb-10 text-3xl font-bold text-mainColor">
          {t("delivery time")}
        </h2>

        <div className="space-y-8 text-xl">
          <div>
            <p className="mb-3 text-2xl text-mainColor">
              {t("offer start date")}
            </p>
            <div className="flex items-center gap-8 px-4 mt-4">
              <p className="flex items-center gap-2">
                <span>
                  <CiCalendarDate className="text-xl text-mainColor" />
                </span>
                <span>{startDate}</span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <IoTimeOutline className="text-xl text-mainColor" />
                </span>
                <span>{startTime}</span>
              </p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-2xl text-mainColor">
              {t("offer end date")}
            </p>

            <div className="flex items-center gap-8 px-4 mt-4">
              <p className="flex items-center gap-2">
                <span>
                  <CiCalendarDate className="text-xl text-mainColor" />
                </span>
                <span>{endDate}</span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <IoTimeOutline className="text-xl text-mainColor" />
                </span>
                <span>{endTime}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HOMEWORK */}
      <div className="col-span-2 p-6 bg-white rounded-xl">
        <h2 className="mb-10 text-3xl font-bold text-mainColor">
          <span>{t("homework")}:</span>
          <span>الخطاب الخارجي</span>
        </h2>

        <div className="mb-3">
          <label htmlFor="brief_about_task" className="font-semibold">
            {t("write your answer")}
          </label>
          <textarea
            name="brief_about_task"
            rows={5}
            id="brief_about_task"
            className="w-full px-4 py-2 mt-4 text-lg bg-white border rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("brief about task")}
            onChange={(e) => {
              setFieldValue("brief_about_task", e.target.value);
            }}
          />
        </div>

        <hr />

        <div className="flex flex-col items-start mt-8 text-center">
          <h2 className="px-6 text-xl font-bold">{t("files")}</h2>
          <UploadFile files={fileUpload} setFiles={setFileUpload} id="file" />
        </div>

        <div className="flex justify-end gap-6 mt-14">
          <Button
            className="bg-transparent border text-mainColor border-mainColor"
            action={() => navigate(-1)}
          >
            {t("cancel")}
          </Button>
          <Button action={() => navigate("/students/homeworks")}>
            {t("save")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddHomeworkDelivery;
