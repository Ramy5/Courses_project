import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "@reduxjs/toolkit/query";
import CreateProgramInputs from "../../../components/AdminComponent/Programs/CreateProgramInputs";
import { postProgramData } from "../../../features/programs/programSlice";
import CreateCourses from "./CreateCourses";
import CreateCoursesInputs from "../../../components/AdminComponent/Programs/CreateCoursesInputs";

const CreateProgram = () => {
  const [step, setStep] = useState<number>(1);
  const [coursesData, setCoursesData] = useState([]);
  console.log("🚀 ~ CreateProgram ~ coursesData:", coursesData);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.program);

  const initialValues = {
    program_name: "",
    program_type: "",
    program_code: "",
    specialization: "",
    academic_levels: "",
    number_classes: "",
    vision: "",
    message: "",
    excellence: "",
    very_good: "",
    good: "",
    acceptable: "",
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema=""
        onSubmit={(values) => {
          console.log("🚀 ~ CreateProgram ~ values:", {...values, courses: coursesData,});
          dispatch(postProgramData({...values, courses: coursesData}));
        }}
      >
        <Form>
          {step === 1 && (
            <CreateProgramInputs setStep={setStep} coursesData={coursesData} />
          )}
          {step === 2 && (
            <CreateCoursesInputs
              setStep={setStep}
              setCoursesData={setCoursesData}
            />
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default CreateProgram;
