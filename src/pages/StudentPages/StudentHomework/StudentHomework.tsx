import { Form, Formik } from "formik";
import { HomeworksTabs, TitlePage } from "../../../components";
import { t } from "i18next";
import { SlBookOpen } from "react-icons/sl";

const StudentHomework = () => {
  const initialValues = {};

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {}}>
      {({ values }) => {
        return (
          <Form>
            <TitlePage
              mainTitle={t("homeworks")}
              icon={<SlBookOpen className="text-xl text-mainColor" />}
            />

            {/* TABS */}
            <HomeworksTabs />
          </Form>
        );
      }}
    </Formik>
  );
};

export default StudentHomework;
