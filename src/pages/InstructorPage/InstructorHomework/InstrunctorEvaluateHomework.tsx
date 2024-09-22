import React, { useState } from "react";
import { Button, ViewHomeworkTable } from "../../../components";
import { Form, Formik } from "formik";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import customFetch from "../../../utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../../components/UI/Loading";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const getStudentsHomeworkEvaluate = async (id: number | string) => {
  const { data } = await customFetch(`showHomeworkStudentAnswer/${id}`);
  return data.data;
};

const postStudentDegree = async (values) => {
  const token = Cookies.get("token");
  const response = await axios.post(`${BASE_URL}addDegreeForStudent`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const InstrunctorEvaluateHomework = () => {
  const [evaluateHomeworkFile, setEvaluateHomeworkFile] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const initialValues = {
    evaluate: "",
  };

  const {
    data: homeworksDataAnswer,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["get-homework-student-answers"],
    queryFn: () => getStudentsHomeworkEvaluate(id),
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
    studentName: homeworksDataAnswer?.student?.full_name,
    studentCode: homeworksDataAnswer?.student?.academicData?.Academic_code,
    assignmentTitle: homeworksDataAnswer?.homework?.title,
    instructions: homeworksDataAnswer?.homework?.instructions,
    studentAnswer: homeworksDataAnswer?.answer,
    attachedFile: homeworksDataAnswer?.homework?.attachment,
    attachedFileName: homeworksDataAnswer?.attachment,
  };

  const handleAddStudentDegree = (values: any) => {
    const formattedValues = {
      file: evaluateHomeworkFile,
      homework_id: homeworksDataAnswer?.homework?.id,
      student_id: homeworksDataAnswer?.student?.id,
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
          setEvaluateHomeworkFile={setEvaluateHomeworkFile}
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

export default InstrunctorEvaluateHomework;
