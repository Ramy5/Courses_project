import React, { Fragment, useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import InstructorAddFirstExam from "../../../components/InstructorComponent/InstructorExams/InstructorAddFirstExam";
import InstructorAddSecondExam from "../../../components/InstructorComponent/InstructorExams/InstructorAddSecondExam";
import { Form, Formik } from "formik";
import { t } from "i18next";
import InstructorAddLastExam from "../../../components/InstructorComponent/InstructorExams/InstructorAddLastExam";
import ConvertNumberToWord from "../../../components/UI/ConvertNumberToWord";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../../../components/UI/Loading";
import { toast } from "react-toastify";

const getExam = async (id) => {
  const response = await customFetch(`exams/${id}`);
  return response;
};

const InstructorAddExam = () => {
  const [grades, setGrades] = useState([]);
  console.log("🚀 ~ InstructorAddExam ~ grades:", grades);
  const [steps, setSteps] = useState<number>(1);
  const [fileExam, setFileExam] = useState([]);
  console.log("🚀 ~ InstructorAddExam ~ fileExam:", fileExam);
  const numbers = ConvertNumberToWord();
  const [file, setFile] = useState();
  const location = useLocation();
  const locationID = location?.state;

  const stepsOption = [
    { id: 1, label: "exam information", border: true },
    { id: 2, label: "quistion review", border: true },
    { id: 3, label: "save exam", border: false },
  ];

  const { data, isLoading, error, isFetching, isSuccess } = useQuery({
    queryKey: ["edit_exam"],
    queryFn: () => getExam(locationID),
    enabled: !!locationID,
  });

  const editExamData = data?.data?.data?.exam || null;
  console.log("🚀 ~ InstructorAddExam ~ editExamData:", editExamData);

  const editGrade = editExamData?.questions?.map((grade) => ({
    grade: grade?.questions_degrees,
    id: grade?.id,
  }));

  // useEffect(() => {
  //   setGrades(editGrade);
  // }, [isSuccess]);

  const initialValues = {
    course_id: editExamData?.course?.id || "",
    course_name: editExamData?.course?.course_name || "",
    title_ar: editExamData?.title_ar || "",
    title_en: editExamData?.title_en || "",
    course_code: editExamData?.course?.course_code || "",
    exam_type: editExamData?.exam_type || "",
    instructions_ar: editExamData?.instructions_ar || "",
    instructions_en: editExamData?.instructions_en || "",
    start_time: editExamData?.start_time || "",
    date: editExamData?.date || "",
    score: editExamData?.score || "",
    passing_score: editExamData?.passing_score || "",
    duration: editExamData?.duration || "",
    grades: editGrade || grades,
  };

  const questionExam = fileExam?.map((item, index) => {
    const matchingGrade = grades?.find((grade) => grade.id === index + 1);
    const answers = [
      item.a && { answer: item.a, is_true: item.a === item.answer ? 1 : 0 },
      item.b && { answer: item.b, is_true: item.b === item.answer ? 1 : 0 },
      item.c && { answer: item.c, is_true: item.c === item.answer ? 1 : 0 },
      item.d && { answer: item.d, is_true: item.d === item.answer ? 1 : 0 },
    ].filter(Boolean);

    return {
      id: index + 1,
      questions_number: numbers[index],
      questions_degrees: matchingGrade ? matchingGrade.grade : 0,
      question: item.Question,
      answers,
    };
  });

  console.log("🚀 ~ questionExam ~ questionExam:", questionExam);

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="relative px-4 py-8 bg-white rounded-xl">
      <div className="flex items-center w-4/5 m-auto">
        {stepsOption.map((step, index) => (
          <Fragment key={index}>
            <div className="relative flex items-center text-mainborder-mainColor">
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
              <div className="absolute top-0 mt-12 -ml-10 text-sm font-semibold -left-3 w-28 text-mainColor">
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

      <Formik initialValues={initialValues} onSubmit={(values) => {}}>
        <Form>
          {steps === 1 && (
            <InstructorAddFirstExam
              setSteps={setSteps}
              fileExam={fileExam}
              setFileExam={setFileExam}
              file={file}
              setFile={setFile}
              editExamData={editExamData}
            />
          )}

          {steps === 2 && (
            <InstructorAddSecondExam
              setSteps={setSteps}
              grades={grades}
              setGrades={setGrades}
              fileExam={fileExam}
              questionExam={questionExam}
              editExamData={editExamData}
            />
          )}

          {steps === 3 && (
            <InstructorAddLastExam
              setSteps={setSteps}
              fileExam={fileExam}
              questionExam={questionExam}
              file={file}
              editExamData={editExamData}
              grades={grades}
            />
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default InstructorAddExam;
