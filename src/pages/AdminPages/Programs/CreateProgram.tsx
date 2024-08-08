import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import CreateProgramInputs from "../../../components/AdminComponent/Programs/CreateProgramInputs";
import CreateCoursesInputs from "../../../components/AdminComponent/Programs/CreateCoursesInputs";
import customFetch from "../../../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { t } from "i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { changeSidebarRoute } from "../../../features/dirty/dirtySlice";
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

const postInstructorLogin = async (newProgram: any) => {
  const data = await customFetch.post("programs", newProgram);
  return data;
};

const CreateProgram = () => {
  const [step, setStep] = useState<number>(1);
  const [coursesData, setCoursesData] = useState([]);
  const [editCoursesData, setEditCoursesData] = useState({});
  const [editFinishedCoursesData, setEditFinishedCoursesData] = useState({});
  const queryClient = useQueryClient();
  const nanigate = useNavigate();
  const location = useLocation();
  const dataReceived = location.state;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dataReceived) {
      setEditFinishedCoursesData(dataReceived);
      setStep(2);
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
      toast.success(t("program has been added successfully"));
      nanigate("/programs");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  const handleAddProgram = async (values: AddProgram_TP) => {
    const newProgram = {
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

    await mutate(newProgram);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema=""
        onSubmit={(values) => handleAddProgram(values)}
      >
        {({ dirty, isSubmitting }) => {
          useEffect(() => {
            dispatch(changeSidebarRoute(dirty && !isSubmitting));
          }, [dirty]);
          return (
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
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateProgram;
