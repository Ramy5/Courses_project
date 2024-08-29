import { Form, Formik } from "formik";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { BaseInput, Button, DateInputField } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../utils/constants";
import { formatDate } from "../../../utils/helpers";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormikError } from "../../../components/UI/FormikError";
import BaseSelect from "../../../components/UI/BaseSelect";

const validationSchema = Yup.object().shape({
  course_id: Yup.string().required("Course is required"),
  titleHomework: Yup.string().required("Title in Arabic is required"),
  titleHomeworkEn: Yup.string().required("Title in English is required"),
  description: Yup.string().required("Description in Arabic is required"),
  descriptionEn: Yup.string().required("Description in English is required"),
  instructions: Yup.string().required("Instructions in Arabic are required"),
  instructionsEn: Yup.string().required("Instructions in English are required"),
  start_delivery: Yup.date()
    .required("Start delivery date is required")
    .nullable(),
  end_delivery: Yup.date().required("End delivery date is required").nullable(),
  grade: Yup.number()
    .required("Grade is required")
    .positive("Grade must be positive")
    .integer("Grade must be an integer"),
});
interface initialValues_TP {
  course_id: string;
  titleHomework: string;
  titleHomeworkEn: string;
  description: string;
  descriptionEn: string;
  instructions: string;
  instructionsEn: string;
  start_delivery: string | Date;
  end_delivery: string | Date;
  start_delivery_time: string;
  end_delivery_time: string;
  grade: string;
}

interface editObj_TP extends initialValues_TP {
  file: string;
}

const getCourses = async () => {
  const { data } = await customFetch("TeacherCourseLecture");
  return data.data.course;
};

const addNewHomework = async (homeworkData: initialValues_TP) => {
  const token = Cookies.get("token");
  const response = await axios.post(`${BASE_URL}storeHomework`, homeworkData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const editHomework = async (homeworkData: editObj_TP, id: number | string) => {
  const token = Cookies.get("token");
  const response = await axios.post(
    `${BASE_URL}updateHomework/${id}`,
    homeworkData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

const InstructorAddHomework = ({ editObj }: { editObj?: editObj_TP }) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [courseSelect, setCourseSelect] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id: homeworkId } = useParams();

  const initialValues: initialValues_TP = {
    course_id: editObj?.course_id || "",
    titleHomework: editObj?.titleHomework || "",
    titleHomeworkEn: editObj?.titleHomeworkEn || "",
    description: editObj?.description || "",
    descriptionEn: editObj?.descriptionEn || "",
    instructions: editObj?.instructions || "",
    instructionsEn: editObj?.instructionsEn || "",
    start_delivery: editObj?.start_delivery || "",
    end_delivery: editObj?.end_delivery || "",
    start_delivery_time: editObj?.start_delivery_time || "",
    end_delivery_time: editObj?.end_delivery_time || "",
    grade: editObj?.grade || "",
  };

  const {
    data: coursesOption,
    isLoading: coursesOptionIsLoading,
    isFetching: coursesOptionIsFetching,
    isRefetching: coursesOptionIsRefetching,
  } = useQuery({
    queryKey: ["courses-option"],
    queryFn: getCourses,
    select: (data) =>
      data?.map((course: any) => {
        return {
          id: course.course_id,
          label: course.course.course_name,
          value: course.course_id,
        };
      }),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-homework"],
    mutationFn: addNewHomework,
    onSuccess: (data) => {
      navigate(-1);
      queryClient.invalidateQueries(["all-homework"]);
      toast.success(t("homework has added successfully"));
    },
  });

  const { mutate: editHomeworkMutate, isPending: editHomeworkIsPending } =
    useMutation({
      mutationKey: ["edit-homework"],
      mutationFn: (homeworkData: editObj_TP) =>
        editHomework(homeworkData, homeworkId),
      onSuccess: (data) => {
        navigate(-1);
        queryClient.invalidateQueries(["all-homework"]);
        toast.success(t("homework has updated successfully"));
      },
    });

  const handleSubmit = async (values: initialValues_TP) => {
    const formattedValues: any = {
      title_ar: values.titleHomework,
      title_en: values.titleHomeworkEn,
      desc_ar: values.description,
      desc_en: values.descriptionEn,
      instructions_ar: values.instructions,
      instructions_en: values.instructionsEn,
      attachment: files,
      course_id: courseSelect?.id,
      degree: values.grade,
      start_date: formatDate(values.start_delivery),
      end_date: formatDate(values.end_delivery),
      start_delivery_time: values.start_delivery_time,
      end_delivery_time: values.end_delivery_time,
    };

    editObj
      ? await editHomeworkMutate(formattedValues)
      : await mutate(formattedValues);
  };

  useEffect(() => {
    const editCourses = {
      id: editObj?.course_id?.id || "",
      label: editObj?.course_id?.course_name || t("course"),
      value: editObj?.course_id?.course_name || "",
    };

    setCourseSelect(editCourses);
    setFiles(editObj?.file);
  }, []);

  const handleFileChange = (event) => setFiles(event.target.files[0]);
  const handleFileDelete = () => setFiles(null);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className="p-6 space-y-8 bg-white rounded-xl">
            <h2 className="mb-6 text-2xl font-bold text-mainColor">
              {editObj ? t("edit homework") : t("add homework")}
            </h2>
            <div className="relative">
              <BaseSelect
                onChange={(e) => {
                  setFieldValue("course_id", e!.value);
                  setCourseSelect({
                    id: e!.id,
                    label: e!.label,
                    value: e!.id,
                  });
                }}
                options={coursesOption}
                name="course_id"
                value={courseSelect}
                isDisabled={
                  coursesOptionIsFetching ||
                  coursesOptionIsLoading ||
                  coursesOptionIsRefetching
                }
                isLoading={coursesOptionIsLoading}
                id="course_id"
                placeholder={t("course")}
                label={t("course")}
                className="mt-1 w-96"
              />
            </div>
            <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2">
              <BaseInput
                name="titleHomework"
                id="titleHomework"
                type="text"
                className="text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("title homework")}
                label={t("title homework")}
                labelProps="!font-semibold"
              />
              <BaseInput
                name="titleHomeworkEn"
                id="titleHomeworkEn"
                type="text"
                className="text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("title homework in english")}
                label={t("title homework in english")}
                labelProps="!font-semibold"
              />
            </div>
            <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="relative">
                <label htmlFor="description" className="font-semibold">
                  {t("description")}
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="w-full text-lg py-2 px-4 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("description")}
                  value={values.description}
                  onChange={(e) => {
                    setFieldValue("description", e.target.value);
                  }}
                />
                <FormikError
                  name="description"
                  className="absolute whitespace-nowrap"
                />
              </div>
              <div className="relative">
                <label htmlFor="descriptionEn" className="font-semibold">
                  {t("description in english")}
                </label>
                <textarea
                  name="descriptionEn"
                  id="descriptionEn"
                  className="w-full text-lg py-2 px-4 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("description in english")}
                  value={values.descriptionEn}
                  onChange={(e) => {
                    setFieldValue("descriptionEn", e.target.value);
                  }}
                />
                <FormikError
                  name="descriptionEn"
                  className="absolute whitespace-nowrap"
                />
              </div>
            </div>
            <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="relative">
                <label htmlFor="instructions" className="font-semibold">
                  {t("instructions")}
                </label>
                <textarea
                  name="instructions"
                  id="instructions"
                  className="w-full text-lg py-2 px-4 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("instructions")}
                  value={values.instructions}
                  onChange={(e) => {
                    setFieldValue("instructions", e.target.value);
                  }}
                />
                <FormikError
                  name="instructions"
                  className="absolute whitespace-nowrap"
                />
              </div>
              <div className="relative">
                <label htmlFor="instructionsEn" className="font-semibold">
                  {t("instructions in english")}
                </label>
                <textarea
                  name="instructionsEn"
                  id="instructionsEn"
                  className="w-full text-lg py-2 px-4 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("instructions in english")}
                  value={values.instructionsEn}
                  onChange={(e) => {
                    setFieldValue("instructionsEn", e.target.value);
                  }}
                />
                <FormikError
                  name="instructionsEn"
                  className="absolute whitespace-nowrap"
                />
              </div>
            </div>

            <div className="">
              <h2 className="mb-3 font-semibold">{t("file attachment")}</h2>
              <div className="flex flex-col items-center gap-8 sm:flex-row">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <div className="relative px-12 py-6 text-center border-2 border-dashed cursor-pointer border-mainColor">
                  <label
                    htmlFor="file-upload"
                    className="absolute top-0 bottom-0 left-0 right-0 w-full h-full cursor-pointer"
                  ></label>
                  <AiOutlineCloudUpload
                    size={150}
                    className="fill-[#E6EAEE] m-auto"
                  />
                  <p>{t("drag or click to add a file")}</p>
                </div>
                {files && (
                  <div className="flex items-center gap-5">
                    <div className="flex flex-col justify-center gap-1">
                      <span className="text-sm font-medium text-center text-gray-700">
                        الملفات
                      </span>
                      <div className="relative p-1 rounded-md bg-mainBg">
                        <div
                          className="flex items-center justify-center p-2 cursor-pointer "
                        >
                          <span className="absolute flex items-center justify-center w-6 h-6 text-sm font-medium text-white rounded-full -top-1 -right-3 bg-mainColor">
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
                      className="cursor-pointer fill-mainRed"
                      onClick={handleFileDelete}
                    />
                  </div>
                )}
              </div>
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
              <BaseInput
                name="start_delivery_time"
                id="start_delivery_time"
                type="time"
                className="w-44 text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("start delivery time")}
                label={t("start delivery time")}
                labelProps="!font-semibold"
              />
              <BaseInput
                name="end_delivery_time"
                id="end_delivery_time"
                type="time"
                className="w-44 text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("end delivery time")}
                label={t("end delivery time")}
                labelProps="!font-semibold"
              />
            </div>

            <div>
              <BaseInput
                name="grade"
                id="grade"
                type="number"
                className="w-96 text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("grade")}
                label={t("grade")}
                labelProps="!font-semibold"
              />
            </div>

            <div className="flex items-center justify-end gap-6">
              <Button
                className="border bg-mainColor/5 text-mainColor border-mainColor"
                action={() => navigate(-1)}
              >
                {t("back")}
              </Button>
              <Button
                loading={isPending || editHomeworkIsPending}
                type="submit"
              >
                {editObj ? t("edit") : t("save")}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InstructorAddHomework;
