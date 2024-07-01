import { Form, Formik } from "formik";
import React from "react";
import { AddHomeworkDelivery } from "../../../components";

const StudentAddProject = () => {
  const initialValues = {
    brief_about_task: "",
  };

  const data = {
    startDate: "رجب ٢٥/١٤٤٢",
    endDate: "رجب ٢٥/١٤٤٢",
    startTime: "١٢ مساء",
    endTime: "١٢ مساء",
    dayValue: 3,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      {({ values }) => {
        return (
          <Form className="">
            <AddHomeworkDelivery isProject {...data} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default StudentAddProject;
