import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import CreateProgramInputs from "../../../components/AdminComponent/Programs/CreateProgramInputs";
import { postProgramData } from "../../../features/programs/programSlice";
import CreateCoursesInputs from "../../../components/AdminComponent/Programs/CreateCoursesInputs";
import customFetch from "../../../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { t } from "i18next";
import { useLocation } from "react-router-dom";
interface AddProgram_TP {
  program_name: string;
  program_type: boolean;
  program_code: string;
  specialization: string;
  academic_levels: string;
  number_classes: string;
  vision: string;
  message: string;
  excellence: string;
  very_good: string;
  good: string;
  acceptable: string;
}
interface programAdd_TP {
  editObj?: AddProgram_TP;
  setActiveTab: (activeTab: string) => void;
  setInstructorID: (id: number) => void;
}

const postInstructorLogin = async (newProgram: any) => {
  const data = await customFetch.post("programs", newProgram);
  return data;
};

const editInstructorLogin = async (editInstructor: any, id: number) => {
  const data = await customFetch.post(
    `updateStudentLoginData/${id}`,
    editInstructor
  );
  return data;
};

const CreateProgram = ({ editObj }: programAdd_TP) => {
  const [step, setStep] = useState<number>(1);
  const [coursesData, setCoursesData] = useState([]);
  const [editCoursesData, setEditCoursesData] = useState({});
  const [editFinishedCoursesData, setEditFinishedCoursesData] = useState({});
  console.log("🚀 ~ CreateProgram ~ editFinishedCoursesData:", editFinishedCoursesData)
  const queryClient = useQueryClient();
  const location = useLocation();
  const dataReceived = location.state;
  useEffect(() => {
    if (dataReceived) {
      setEditFinishedCoursesData(dataReceived)
      setStep(2)
    }
  }, [dataReceived]);

  const initialValues = {
    program_name: "",
    program_type: false,
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

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-program"],
    mutationFn: postInstructorLogin,
    onSuccess: (data) => {
      queryClient.invalidateQueries("program");
      toast.success(
        t("instructor login information has been added successfully")
      );
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error[0]?.email[0] ||
        error?.response?.data?.error[0]?.password[0];
      toast.error(errorMessage);
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationKey: ["edit_program"],
    mutationFn: (editInstructor: any) =>
      editInstructorLogin(editInstructor, Number(editObj?.id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries("program");
      toast.success(
        t("instructor login information has been added successfully")
      );
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error[0]?.email[0] ||
        error?.response?.data?.error[0]?.password[0];
      toast.error(errorMessage);
    },
  });

  const handleAddProgram = async (values: AddProgram_TP) => {
    const newInstructor = {
      program_name: values.program_name,
      program_type: values.program_type,
      program_code: values.program_code,
      specialization: values.specialization,
      academic_levels: values.academic_levels,
      number_classes: values.number_classes,
      vision: values.vision,
      message: values.message,
      excellence: values.excellence,
      very_good: values.very_good,
      good: values.good,
      acceptable: values.acceptable,
      courses: coursesData,
    };

    editObj ? await editMutate(newInstructor) : await mutate(newInstructor);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema=""
        onSubmit={(values) => handleAddProgram(values)}
      >
        <Form>
          {step === 1 && (
            <CreateProgramInputs
              setStep={setStep}
              coursesData={coursesData}
              setCoursesData={setCoursesData}
              setEditCoursesData={setEditCoursesData}
              isPending={isPending}
            />
          )}
          {step === 2 && (
            <CreateCoursesInputs
              setStep={setStep}
              setCoursesData={setCoursesData}
              coursesData={coursesData}
              editCoursesData={editCoursesData}
              setEditCoursesData={setEditCoursesData}
              editFinishedCoursesData={editFinishedCoursesData}
              setEditFinishedCoursesData={setEditFinishedCoursesData}
            />
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default CreateProgram;
