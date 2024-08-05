import { Form, Formik } from "formik";
import { AddHomeworkDelivery } from "../../../components";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { useParams } from "react-router-dom";
import Loading from "../../../components/UI/Loading";

const getHomework = async (id: number | string) => {
  const { data } = await customFetch(`showHomeworkStudent/${id}`);
  return data.data;
};

const StudentAddHomework = () => {
  const { id } = useParams();

  const initialValues = {
    brief_about_task: "",
  };

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["get-all-homeworks"],
    queryFn: () => getHomework(id),
  });

  const customData = {
    startDate: data?.start_date,
    endDate: data?.end_date,
    title: data?.title,
    startTime: "١٢ مساء",
    endTime: "١٢ مساء",
    dayValue: 3,
  };

  if (isLoading || isFetching || isRefetching) return <Loading />;

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      {({ values }) => {
        return (
          <Form className="">
            <AddHomeworkDelivery {...customData} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default StudentAddHomework;
