import React, { useState } from "react";
import { Button, ViewHomeworkTable } from "../../../components";
import { Form, Formik } from "formik";
import Back from "../../../components/UI/Back";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

const InstrunctorEvaluateHomework = () => {
  const [evaluateHomeworkFile, setEvaluateHomeworkFile] = useState([]);
  const navigate = useNavigate();

  const data = {
    studentName: "فراس يحيى سعيد الزهراني",
    studentCode: "13345577",
    assignmentTitle: "كيرشوف",
    instructions:
      "تتطلب مناقشة العلاقة بين اللغة و الخطاب النظر في مجموعة من العلاقات، كعلاقة اللغة بالسلطة و الإيديولوجية و الثقافة، و طرح جملة من المستويات النظرية و المشاكل المعرفية، كأصل اللغة، و سلطة اللغة، و السلط المساندة لها، و التمييز الذي تقيمه اللسانيات بين اللغة و الكلام و الخطاب، و الوحدات",
    studentAnswer:
      "تتطلب مناقشة العلاقة بين اللغة و الخطاب النظر في مجموعة من العلاقات، كعلاقة اللغة بالسلطة و الإيديولوجية و الثقافة، و طرح جملة من المستويات النظرية و المشاكل المعرفية، كأصل اللغة، و سلطة اللغة، و السلط المساندة لها، و التمييز الذي تقيمه اللسانيات بين اللغة و الكلام و الخطاب، و الوحدات",
    attachedFile: "/path/to/الواجب.pdf",
    attachedFileName: "الواجب.pdf",
  };

  const initialValues = {
    evaluate: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        navigate(-1);
      }}
    >
      <Form>
        <ViewHomeworkTable
          data={data}
          isInstructor
          setEvaluateHomeworkFile={setEvaluateHomeworkFile}
        />

        <div className="flex items-center justify-end w-full gap-4 mt-6">
          <Button type="submit">{t("save")}</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default InstrunctorEvaluateHomework;
