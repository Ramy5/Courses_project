import { Form, Formik } from "formik";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { BaseInput, Button, DateInputField } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { BASE_URL } from "../../../utils/constants";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/helpers";

interface initialValues_TP {
  course_id: number | string;
  titleProject: string;
  titleProjectEn: string;
  description: string;
  descriptionEn: string;
  instructions: string;
  instructionsEn: string;
  start_delivery: string | Date;
  end_delivery: string | Date;
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
  const response = await axios.post(
    `${BASE_URL}updateProject/${id}`,
    ProjectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

const InstructorAddProject = ({ editObj }: { editObj: editObj_TP }) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id: projectId } = useParams();

  const initialValues: initialValues_TP = {
    course_id: editObj?.course_id || "",
    titleProject: editObj?.titleProject || "",
    titleProjectEn: editObj?.titleProjectEn || "",
    description: editObj?.description || "",
    descriptionEn: editObj?.descriptionEn || "",
    instructions: editObj?.instructions || "",
    instructionsEn: editObj?.instructionsEn || "",
    start_delivery: editObj?.start_delivery || "",
    end_delivery: editObj?.end_delivery || "",
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
      queryClient.invalidateQueries(["all-project"]);
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
        queryClient.invalidateQueries(["all-project"]);
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
      course_id: values.course_id,
      degree: values.grade,
      start_date: formatDate(values.start_delivery),
      end_date: formatDate(values.end_delivery),
    };

    editObj
      ? await editProjectMutate(formattedValues)
      : await mutate(formattedValues);
  };

  useEffect(() => {
    setFiles(editObj?.file);
  }, []);

  const handleFileChange = (event) => setFiles(event.target.files[0]);
  const handleFileDelete = () => setFiles(null);

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
