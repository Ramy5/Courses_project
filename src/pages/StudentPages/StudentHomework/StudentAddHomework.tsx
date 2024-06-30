import { Form, Formik } from "formik";
import { AddHomeworkDelivery } from "../../../components";

const StudentAddHomework = () => {
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
            <AddHomeworkDelivery {...data} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default StudentAddHomework;
