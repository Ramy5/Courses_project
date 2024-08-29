import { Form, Formik } from "formik";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { BaseInput, Button, DateInputField } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../utils/constants";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/helpers";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { RiDeleteBin5Line } from "react-icons/ri";
import BaseSelect from "../../../components/UI/BaseSelect";

interface initialValues_TP {
  titleProject: string;
  titleProjectEn: string;
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

const addNewProject = async (projectData: initialValues_TP) => {
  const token = Cookies.get("token");
  const response = await axios.post(`${BASE_URL}projects`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const editProject = async (ProjectData: editObj_TP, id: number | string) => {
  const token = Cookies.get("token");
  const response = await axios.post(`${BASE_URL}projects/${id}`, ProjectData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const InstructorAddProject = ({ editObj }: { editObj?: editObj_TP }) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [courseSelect, setCourseSelect] = useState(null);
  const navigate = useNavigate();
  const { id: projectId } = useParams();

  const initialValues: initialValues_TP = {
    titleProject: editObj?.titleProject || "",
    titleProjectEn: editObj?.titleProjectEn || "",
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
    mutationKey: ["add-project"],
    mutationFn: addNewProject,
    onSuccess: (data) => {
      navigate(-1);
      toast.success(t("project has added successfully"));
    },
  });

  const { mutate: editProjectMutate, isPending: editProjectIsPending } =
    useMutation({
      mutationKey: ["edit-project"],
      mutationFn: (projectData: editObj_TP) =>
        editProject(projectData, projectId),
      onSuccess: (data) => {
        navigate(-1);
        toast.success(t("project has updated successfully"));
      },
    });

  const handleSubmit = async (values: initialValues_TP) => {
    const formattedValues: any = {
      title_ar: values.titleProject,
      title_en: values.titleProjectEn,
      desc_ar: values.description,
      desc_en: values.descriptionEn,
      instructions_ar: values.instructions,
      instructions_en: values.instructionsEn,
      attachment: files,
      course_id: courseSelect?.id,
      score: values.grade,
      start_date: formatDate(values.start_delivery),
      end_date: formatDate(values.end_delivery),
      start_delivery_time: values.start_delivery_time,
      end_delivery_time: values.end_delivery_time,
    };

    editObj
      ? await editProjectMutate(formattedValues)
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
      onSubmit={(values: initialValues_TP) => handleSubmit(values)}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className="p-6 space-y-8 bg-white rounded-xl">
            <h2 className="mb-6 text-2xl font-bold text-mainColor">
              {editObj ? t("edit project") : t("add project")}
            </h2>
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
              label={editObj ? t("edit project") : t("add project")}
              placeholder={t("course")}
              className="w-96"
            />
            <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2">
              <BaseInput
                name="titleProject"
                id="titleProject"
                type="text"
                className="text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("title project")}
                label={t("title project")}
                labelProps="!font-semibold"
              />
              <BaseInput
                name="titleProjectEn"
                id="titleProjectEn"
                type="text"
                className="text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("title project in english")}
                label={t("title project in english")}
                labelProps="!font-semibold"
              />
            </div>
            <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
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
              </div>
              <div>
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
              </div>
            </div>
            <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
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
              </div>
              <div>
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
                          // onClick={() => setManyPdfsOpen(true)}
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
              <Button loading={isPending || editProjectIsPending} type="submit">
                {editObj ? t("edit") : t("save")}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InstructorAddProject;
