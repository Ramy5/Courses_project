import { Form, Formik } from "formik";
import React from "react";
import { AddHomeworkDelivery } from "../../../components";
import customFetch from "../../../utils/axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";

const getHomework = async (id: number | string) => {
  const { data } = await customFetch(`showProjectStudent/${id}`);
  return data.data;
};

const StudentAddProject = () => {
  const { id } = useParams();

  const initialValues = {
    brief_about_task: "",
  };

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-project"],
    queryFn: () => getHomework(id),
  });

  const customData = {
    startDate: data?.start_date,
    endDate: data?.end_date,
    title: data?.title,
    endTime: data?.end_delivery_time,
    dayValue: data?.days_left,
    timeLeft: data?.time_left,
  };

  if (isLoading || isFetching || isRefetching) return <Loading />;

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      {({ values }) => {
        return (
          <Form className="">
            <AddHomeworkDelivery isProject {...customData} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default StudentAddProject;
