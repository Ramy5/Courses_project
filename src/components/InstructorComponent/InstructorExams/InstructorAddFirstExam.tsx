import { t } from "i18next";
import BaseInput from "../../UI/BaseInput";
import { useFormikContext } from "formik";
import { DateInputField } from "../../UI/DateInputField";
import { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { Button } from "../..";
import * as XLSX from "xlsx";
import customFetch from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import selectStyle from "../../../utils/selectStyle";
import LoadingIndicator from "../../UI/LoadingIndicator";
import { useNavigate } from "react-router-dom";

const InstructorAddFirstExam = ({
  setSteps,
  fileExam,
  setFileExam,
  setFile,
  editExamData,
}: any) => {
  const [coursesSelect, setCoursesSelect] = useState();
  const navigate = useNavigate();
  const [examTypeSelect, setExamTypeSelect] = useState();
  const { values, setFieldValue } = useFormikContext();
  console.log("🚀 ~ values:", values)

  const fetchCoursesData = async () => {
    const response = await customFetch(`TeacherCourseLecture`);
    return response;
  };

  const {
    data: courseOption,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["coueses_Exam"],
    queryFn: fetchCoursesData,
    select: (courseData) => {
      return courseData?.data?.data.course?.map((data) => {
        return {
          id: data?.course.id,
          value: data?.course.course_name,
          label: data?.course.course_name || `${t("course")}`,
          course_code: data?.course.course_code,
        };
      });
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);

      const cleanString = (str) => {
        if (typeof str === "string") {
          return str.trim().replace(/\r\n/g, "");
        }
        return str;
      };

      jsonData = jsonData.map((item) => {
        const newItem = {};
        Object.keys(item).forEach((key) => {
          newItem[key] = cleanString(item[key]);
        });
        return newItem;
      });

      setFileExam(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleExport = () => {
    const data = [{ Question: "", a: "", b: "", c: "", d: "", answer: "" }];

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "templateExam.xlsx");
  };

  const handleDeleteFile = () => {
    setFileExam(null);
  };

  const examTypeOption = [
    { id: 1, value: "firstSemester", label: "firstSemester" },
    { id: 2, value: "secondSemester", label: "secondSemester" },
  ];

  useEffect(() => {
    if (editExamData) {
      const editCourse = {
        id: editExamData?.course?.course_id,
        label: editExamData?.course?.course_name,
        value: editExamData?.course?.course_name,
      };

      const editExamType = {
        id: editExamData?.exam_type,
        label: editExamData?.exam_type,
        value: editExamData?.exam_type,
      };

      setCoursesSelect(editCourse);
      setExamTypeSelect(editExamType);
    }
  }, [editExamData]);

  return (
    <div className="flex gap-y-5 flex-col mt-8">
      <div>
        <label htmlFor="course_id" className="font-bold block mb-2">
          {t("course")}
        </label>
        <Select
          styles={selectStyle}
          id="course_id"
          name="course_id"
          placeholder={t("courses")}
          options={courseOption}
          value={coursesSelect}
          onChange={(e) => {
            setFieldValue("course_id", e.id);
            setFieldValue("course_name", e.value);
            setFieldValue("course_code", e.course_code);
            setCoursesSelect({
              id: e.id,
              label: e.value || `${t("course")}`,
              value: e.value || `${t("course")}`,
              course_code: e.course_code,
            });
          }}
          isLoading={isLoading}
          isDisabled={!isSuccess}
          components={{ LoadingIndicator }}
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
          value={coursesSelect?.course_code}
          disabled
          labelProps="!font-semibold"
        />
      </div>
      <div className="flex gap-5">
        <div className="w-full">
          <BaseInput
            name="title_ar"
            id="title_ar"
            type="text"
            className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("exam title")}
            label={`${t("exam title")} (${t("arabic")})`}
            labelProps="!font-semibold"
          />
        </div>
        <div className="w-full">
          <BaseInput
            name="title_en"
            id="title_en"
            type="text"
            className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("exam title")}
            label={`${t("exam title")} (${t("english")})`}
            labelProps="!font-semibold"
          />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="exam_type" className="font-bold block mb-2">
            {t("exam type")}
          </label>
          <Select
            styles={selectStyle}
            id="exam_type"
            name="exam_type"
            placeholder={t("exam type")}
            options={examTypeOption}
            value={examTypeSelect}
            onChange={(e) => {
              setFieldValue("exam_type", e.value);
              setExamTypeSelect({
                id: e.id,
                label: e.value || `${t("exam type")}`,
                value: e.value,
              });
            }}
            isLoading={isLoading}
            isDisabled={!isSuccess}
            components={{ LoadingIndicator }}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-full">
          <label htmlFor="instructions_ar" className="font-semibold">
            {t("instructions")} ({t("arabic")})
          </label>
          <textarea
            name="instructions_ar"
            id="instructions_ar"
            className="w-full text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("instructions")}
            value={values?.instructions_ar}
            onChange={(e) => {
              setFieldValue("instructions_ar", e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <label htmlFor="instructions_en" className="font-semibold">
            {t("instructions")} ({t("english")})
          </label>
          <textarea
            name="instructions_en"
            id="instructions_en"
            className="w-full text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("instructions")}
            value={values?.instructions_en}
            onChange={(e) => {
              setFieldValue("instructions_en", e.target.value);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-36">
        <div>
          <DateInputField
            label={`${t("exam date")}`}
            placeholder={`${t("exam date")}`}
            name="date"
            className="w-full"
            labelProps={{ className: "!mb-2 !font-bold" }}
          />
        </div>
        <div>
          <BaseInput
            name="start_time"
            id="start_time"
            type="time"
            label={t("start")}
            className="w-full text-lg py-1 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("")}
            labelProps="font-semibold text-base"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-36">
        <div>
          <BaseInput
            name="score"
            id="score"
            type="number"
            className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
            placeholder={t("final score")}
            label={t("final score")}
            labelProps="!font-semibold"
          />
        </div>
        <div>
          <BaseInput
            name="passing_score"
            id="passing_score"
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
            name="duration"
            id="duration"
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
        <h2 className="mb-3 font-semibold text-xl text-mainColor">
          {t("files")}
        </h2>
        <div className="flex flex-col lg:flex-row gap-y-8 items-start lg:items-center justify-around">
          <div className="flex items-start lg:items-center flex-col md:flex-row gap-x-12 lg:gap-x-16 gap-y-5">
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
            <div className="w-full md:w-1/5 m-auto block">
              {fileExam?.length || editExamData?.attachment ? (
                <div className="flex items-center gap-5 justify-center">
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
              ) : (
                ""
              )}
            </div>
          </div>
          <Button className="h-20 px-5 m-auto block" action={handleExport}>
            {t("download the test template")}
          </Button>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
        <Button bordered action={() => navigate(-1)}>
          {t("cancel")}
        </Button>
        <Button action={() => setSteps(2)}>{t("next")}</Button>
      </div>
    </div>
  );
};

export default InstructorAddFirstExam;
