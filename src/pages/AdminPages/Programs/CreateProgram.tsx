import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import CreateProgramInputs from "../../../components/AdminComponent/Programs/CreateProgramInputs";
import CreateCoursesInputs from "../../../components/AdminComponent/Programs/CreateCoursesInputs";
import customFetch from "../../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { t } from "i18next";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loading from "../../../components/UI/Loading";
interface AddProgram_TP {
  program_name: string;
  program_type: string;
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
  price: string;
}

const validationSchema = Yup.object({
  program_name: Yup.string().required("program name is required"),
  program_code: Yup.string().required("program code is required"),
  program_type: Yup.string().required("program code is required"),
  specialization: Yup.string().required("specialization is required"),
  academic_levels: Yup.string().required("academic levels are required"),
  number_classes: Yup.string().required("number of classes is required"),
  vision: Yup.string().required("vision is required"),
  message: Yup.string().required("message is required"),
  price: Yup.number().required("price is required"),
  excellence: Yup.number()
    .required("Grade is required")
    .min(90, "Grade must be at least 90")
    .max(100, "Grade cannot exceed 100"),
  very_good: Yup.number()
    .required("Grade is required")
    .min(80, "Grade must be at least 80")
    .max(89, "Grade cannot exceed 89"),
  good: Yup.number()
    .required("Grade is required")
    .min(65, "Grade must be at least 65")
    .max(79, "Grade cannot exceed 79"),
  acceptable: Yup.number()
    .required("Grade is required")
    .min(50, "Grade must be at least 50")
    .max(64, "Grade cannot exceed 64"),
});

const postProgram = async (newProgram: any) => {
  const data = await customFetch.post("programs", newProgram);
  return data;
};

const editProgram = async (newProgram: any, id: number) => {
  const data = await customFetch.post(`programs/${id}`, newProgram);
  return data;
};

const CreateProgram = () => {
  const [step, setStep] = useState<number>(1);
  const [coursesData, setCoursesData] = useState([]);
  const [editCoursesData, setEditCoursesData] = useState({});
  const [editFinishedCoursesData, setEditFinishedCoursesData] = useState({});
  const [editFinishedProgramData, setEditFinishedProgramData] =
    useState<AddProgram_TP>({});
  console.log(
    "🚀 ~ CreateProgram ~ editFinishedProgramData:",
    editFinishedProgramData
  );

  const queryClient = useQueryClient();
  const nanigate = useNavigate();
  const location = useLocation();
  const dataReceived = location.state;
  console.log("🚀 ~ CreateProgram ~ dataReceived:", dataReceived);
  const dataReceivedID = location.state;
  console.log("🚀 ~ CreateProgram ~ dataReceivedID:", dataReceivedID);

  const fetchProgramData = async () => {
    const response = await customFetch(`/program/${dataReceivedID}`);
    return response.data.data;
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["edit_program_data", dataReceivedID],
    queryFn: fetchProgramData,
    enabled: dataReceivedID !== null && typeof dataReceivedID == "number",
  });

  useEffect(() => {
    setEditFinishedProgramData(data || {});
    setStep(1);
  }, [isFetching]);

  useEffect(() => {
    if (dataReceived !== null && typeof dataReceived == "object") {
      setEditFinishedCoursesData(dataReceived || {});
      setStep(2);
    }
  }, [dataReceived]);

  // useEffect(() => {
  //   if (dataReceived !== null &&  typeof dataReceived == "number") {
  //     setEditFinishedProgramData(data);
  //     setStep(1);
  //   } else if (dataReceived !== null &&  typeof dataReceived == "object") {
  //     setEditFinishedCoursesData(dataReceived || {});
  //     setStep(2);
  //   } else {
  //     setStep(1);
  //   }
  // }, [dataReceived]);

  const initialValues: AddProgram_TP = {
    program_name: editFinishedProgramData?.program_name || "",
    program_type: editFinishedProgramData?.program_type || "",
    program_code: editFinishedProgramData?.program_code || "",
    specialization: editFinishedProgramData?.specialization || "",
    academic_levels: editFinishedProgramData?.academic_levels || "",
    number_classes: editFinishedProgramData?.number_classes || "",
    vision: editFinishedProgramData?.vision || "",
    message: editFinishedProgramData?.message || "",
    excellence: editFinishedProgramData?.excellence || "",
    very_good: editFinishedProgramData?.very_good || "",
    good: editFinishedProgramData?.good || "",
    acceptable: editFinishedProgramData?.acceptable || "",
    price: editFinishedProgramData?.price || "",
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-program"],
    mutationFn: postProgram,
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

  const { mutate: editmutate, isPending: editIsPending } = useMutation({
    mutationKey: ["edit-program"],
    mutationFn: (newProgram) =>
      editProgram(newProgram, editFinishedProgramData?.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries("program");
      toast.success(t("program has been edited successfully"));
      nanigate("/programs");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  // const updatedCoursesData = coursesData?.map(
  //   ({ id, references, ...rest }) => ({
  //     ...rest,
  //     references: references?.map(({ id, ...referenceRest }) => ({
  //       ...referenceRest,
  //     })),
  //   })
  // );

  const handleAddProgram = async (values: AddProgram_TP) => {
    const updatedCoursesData = coursesData?.map(
      ({ id, references, ...rest }) => ({
        ...rest,
        references: references?.map(({ id, ...referenceRest }) => ({
          ...referenceRest,
        })),
      })
    );
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
      price: values.price,
      courses: updatedCoursesData,
    };

    const { courses, ...programWithoutCourses } = newProgram;

    // (await Object.keys(editFinishedCoursesData)?.length) !== 0
    //   ? mutate(newProgram)
    //   : editmutate(programWithoutCourses);

    dataReceived
      ? await editmutate(programWithoutCourses)
      : await mutate(newProgram);
  };
  if (isLoading || isFetching) return <Loading />;
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={
          Object.keys(editFinishedCoursesData)?.length === 0 ||
          Object.keys(editFinishedProgramData)?.length === 0
            ? validationSchema
            : ""
        }
        onSubmit={(values, { resetForm }) => {
          handleAddProgram(values);
          resetForm();
        }}
        enableReinitialize={true}
      >
        <Form>
          {step === 1 && (
            <CreateProgramInputs
              setStep={setStep}
              coursesData={coursesData}
              setCoursesData={setCoursesData}
              setEditCoursesData={setEditCoursesData}
              isPending={isPending || editIsPending}
              editFinishedProgramData={editFinishedProgramData}
            />
          )}
          {step === 2 && (
            <CreateCoursesInputs
              step={step}
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
