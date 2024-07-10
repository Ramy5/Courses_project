import { t } from "i18next";
import BaseInput from "../../UI/BaseInput";
import { useFormikContext } from "formik";
import { DateInputField } from "../../UI/DateInputField";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { Button } from "../..";

const InstructorAddFirstExam = ({setSteps} : any) => {
  const [file, setFile] = useState(null);

  const { values, setFieldValue } = useFormikContext();

  const handleFileChange = (event) => {
    setFile(event.target.files);
  };

  const handleDeleteFile = () => {
    setFile(null);
  };
  return (
    <div className="flex gap-y-5 flex-col mt-8">
      <div>
        <BaseInput
          name="course"
          id="course"
          type="text"
          className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
          placeholder={t("course")}
          label={t("course")}
          labelProps="!font-semibold"
        />
      </div>
      <div>
        <BaseInput
          name="course_code"
          id="course_code"
          type="text"
          className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
          placeholder={t("course code")}
          label={t("course code")}
          labelProps="!font-semibold"
        />
      </div>
      <div>
        <BaseInput
          name="exam_title"
          id="exam_title"
          type="text"
          className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
          placeholder={t("exam title")}
          label={t("exam title")}
          labelProps="!font-semibold"
        />
      </div>
      <div>
        <BaseInput
          name="exam_type"
          id="exam_type"
          type="text"
          className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
          placeholder={t("exam type")}
          label={t("exam type")}
          labelProps="!font-semibold"
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
          onChange={(e) => {
            setFieldValue("instructions", e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <DateInputField
          label={`${t("exam date")}`}
          placeholder={`${t("exam date")}`}
          name="exam_date"
          className="w-full md:w-1/4"
          labelProps={{ className: "!mb-2 !font-bold" }}
        />
      </div>
      <div className="grid grid-cols-3 gap-36">
        <div>
          <BaseInput
            name="final_score"
            id="final_score"
            type="number"
            className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("final score")}
            label={t("final score")}
            labelProps="!font-semibold"
          />
        </div>
        <div>
          <BaseInput
            name="degree_success"
            id="degree_success"
            type="number"
            className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("degree of success")}
            label={t("degree of success")}
            labelProps="!font-semibold"
          />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="flex gap-4 items-end">
          <BaseInput
            name="exam_duration"
            id="exam_duration"
            type="number"
            className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("duration")}
            label={t("duration")}
            labelProps="!font-semibold"
          />
          <p className="mb-3 font-medium">{t("minute")}</p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-semibold text-xl text-mainColor">{t("files")}</h2>
        <div className="flex  flex-col md:flex-row gap-x-24 lg:gap-x-28 gap-y-5">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <div>
            <p className="font-semibold mb-2">{t("upload the test file")}</p>
            <div className="cursor-pointer border-2 py-10 px-12 text-center border-dashed border-[#B1BFD0] relative bg-white">
              <label
                htmlFor="file-upload"
                className="absolute top-0 bottom-0 left-0 right-0 w-full h-full cursor-pointer"
              ></label>
              <div className="bg-mainColor rounded-full w-20 h-20 flex justify-center items-center m-auto mb-3">
                <AiOutlineCloudUpload className="fill-[#E6EAEE] w-12 h-12" />
              </div>
              <p>{t("drag or click to add a file")}</p>
            </div>
          </div>
          <div className="w-full md:w-2/4 ">
            {file && (
              <div className="flex items-center gap-5">
                <div className="flex flex-col  gap-1 justify-center">
                  <span className="text-sm font-medium text-gray-700 text-center">
                    الملفات
                  </span>
                  <div className="bg-mainBg rounded-md p-1 relative">
                    <div
                      // onClick={() => setManyPdfsOpen(true)}
                      className="cursor-pointer flex items-center justify-center p-2 "
                    >
                      <span className="absolute -top-1 -right-3 bg-mainColor w-6 h-6 flex justify-center items-center text-sm font-medium rounded-full text-white">
                        1
                      </span>
                      <HiMiniFolderArrowDown
                        className="fill-mainColor"
                        size={35}
                      />
                    </div>
                  </div>
                </div>
                <RiDeleteBin5Line
                  size={35}
                  className="fill-mainRed cursor-pointer"
                  onClick={handleDeleteFile}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-8">
        <Button bordered>{t("cancel")}</Button>
        <Button action={() => setSteps(2)}>{t("Next")}</Button>
      </div>
    </div>
  );
};

export default InstructorAddFirstExam;
