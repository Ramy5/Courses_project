import React, { useState } from "react";
import { Button, ViewHomeworkTable } from "../../../components";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import customFetch from "../../../utils/axios";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import Cookies from "js-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../../components/UI/Loading";

const getStudentsProjectEvaluate = async (id: number | string) => {
  const { data } = await customFetch(`showProjectStudentAnswer/${id}`);
  return data.data;
};

const postStudentDegree = async (values) => {
  const token = Cookies.get("token");
  const response = await axios.post(`${BASE_URL}addDegreeForProject`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const InstrunctorEvaluateProject = () => {
  const [evaluateProjectFile, setEvaluateProjectFile] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const initialValues = {
    evaluate: "",
  };

  const {
    data: projectsDataAnswer,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["get-project-student-answers"],
    queryFn: () => getStudentsProjectEvaluate(id),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-student-degree"],
    mutationFn: postStudentDegree,
    onSuccess: (data) => {
      navigate(-1);
      toast.success(t("student degree has successfully added"));
    },
  });

  const data = {
    studentName: projectsDataAnswer?.student?.full_name,
    studentCode: projectsDataAnswer?.student?.academicData?.Academic_code,
    assignmentTitle: projectsDataAnswer?.project?.title,
    instructions: projectsDataAnswer?.project?.instructions,
    studentAnswer: projectsDataAnswer?.answer,
    attachedFile: projectsDataAnswer?.project?.attachment,
    attachedFileName: projectsDataAnswer?.attachment,
  };

  const handleAddStudentDegree = (values: any) => {
    const formattedValues = {
      file: evaluateProjectFile,
      project_id: projectsDataAnswer?.project?.id,
      student_id: projectsDataAnswer?.student?.id,
      degree: +values.evaluate,
    };

    mutate(formattedValues);
  };

  if (isLoading || isFetching || isRefetching) return <Loading />;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleAddStudentDegree(values)}
    >
      <Form>
        <ViewHomeworkTable
          data={data}
          isInstructor
          setEvaluateHomeworkFile={setEvaluateProjectFile}
        />

        <div className="flex items-center justify-end w-full gap-4 mt-6">
          <Button loading={isPending} type="submit">
            {t("save")}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default InstrunctorEvaluateProject;
