import React, { Fragment, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import InstructorAddFirstExam from "../../../components/InstructorComponent/InstructorExams/InstructorAddFirstExam";
import InstructorAddSecondExam from "../../../components/InstructorComponent/InstructorExams/InstructorAddSecondExam";
import { Form, Formik } from "formik";
import { t } from "i18next";
import InstructorAddLastExam from "../../../components/InstructorComponent/InstructorExams/InstructorAddLastExam";

const InstructorAddExam = () => {
  const [grades, setGrades] = useState([]);
  console.log("🚀 ~ InstructorAddExam ~ grades:", grades)
  const [steps, setSteps] = useState<number>(3);

  const stepsOption = [
    { id: 1, label: "exam information", border: true },
    { id: 2, label: "quistion review", border: true },
    { id: 3, label: "save exam", border: false },
  ];

  const initialValues = {
    course: "",
    course_code: "",
    exam_title: "",
    exam_type: "",
    instructions: "",
    exam_date: "",
    final_score: "",
    degree_success: "",
    exam_duration: "",
    grades: grades,
  };

  return (
    <div className="bg-white py-8 px-4 rounded-xl relative">
      <div className="flex items-center w-4/5 m-auto">
        {stepsOption.map((step, index) => (
          <Fragment key={index}>
            <div className="flex items-center text-mainborder-mainColor relative">
              <div
                className={`${
                  steps === step.id
                    ? "bg-mainColor text-white"
                    : "border-2 border-mainColor text-mainColor"
                } rounded-full transition duration-500 ease-in-out flex justify-center items-center h-11 w-11 font-semibold text-xl`}
              >
                {(steps === 2 && index === 0) ||
                (steps === 3 && (index === 0 || index === 1)) ? (
                  <GiCheckMark size={22} className="fill-[#4ECB71]" />
                ) : (
                  `${step.id}`
                )}
              </div>
              <div className="absolute top-0 -left-3 w-28 -ml-10 mt-12 text-sm font-semibold text-mainColor">
                {t(`${step.label}`)}
              </div>
            </div>
            {step.border && index < stepsOption.length - 1 && (
              <div
                className={`${
                  (steps === 2 && index === 0) ||
                  (steps === 3 && (index === 0 || index === 1))
                    ? "border-mainColor"
                    : "border-[#E6EAEE]"
                } flex-auto border-t-2 transition duration-500 ease-in-out`}
              ></div>
            )}
          </Fragment>
        ))}
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log("🚀 ~ InstructorAddExam ~ values:", values);
        }}
      >
        <Form>
          {steps === 1 && <InstructorAddFirstExam setSteps={setSteps} />}

          {steps === 2 && <InstructorAddSecondExam setSteps={setSteps} setGrades={setGrades} />}

          {steps === 3 && <InstructorAddLastExam setSteps={setSteps}/>}
        </Form>
      </Formik>
    </div>
  );
};

export default InstructorAddExam;
