import { t } from "i18next";
import { Button } from "../..";
import BaseInput from "../../UI/BaseInput";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

interface AddStudentParent_TP {
  address_father: string;
  country_father: string;
  phone_father: string;
  email_father: string;
  fullName_father: string;
}

interface StudentAddParentData_TP {
  editObj?: AddStudentParent_TP;
  studentID: number;
  setActiveTab: (activeTab: string) => void;
}

const postStudentParent = async (newStudent: any) => {
  const data = customFetch.post("storeParentDetails", newStudent);
  return data;
};

const updateStudentParent = async (
  editStudent: any,
  id: number | string = null
) => {
  const data = customFetch.post(`updateParentDetails/${id}`, editStudent);
  return data;
};

const StudentAddFatherData = ({
  editObj,
  studentID,
  setActiveTab,
}: StudentAddParentData_TP) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: studentIDParam } = useParams();

  const initialValues: AddStudentParent_TP = {
    address_father: editObj?.address_father || "",
    country_father: editObj?.country_father || "",
    phone_father: editObj?.phone_father || "",
    email_father: editObj?.email_father || "",
    fullName_father: editObj?.fullName_father || "",
  };

  const errorFields = [
    "address",
    "country_residence",
    "phone",
    "email",
    "full_name",
    "address",
  ];

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-student-father"],
    mutationFn: postStudentParent,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries("students");
      toast.success(
        t("student parent information has been added successfully")
      );
      setActiveTab("academy data");
    },
    onError: (error) => {
      const errorMessage = errorFields
        .map((field) => error?.response?.data?.error[0]?.[field]?.[0])
        .find((message) => message);

      toast.error(errorMessage || error.message);
    },
  });

  const { mutate: updateMutate, isPending: editIsPending } = useMutation({
    mutationKey: ["update-student-father"],
    mutationFn: (updateStudet: any) =>
      updateStudentParent(updateStudet, studentIDParam),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries("students");
      toast.success(
        t("student parent information has been edited successfully")
      );
      setActiveTab("academy data");
    },
    onError: (error) => {
      const errorMessage = errorFields
        .map((field) => error?.response?.data?.error[0]?.[field]?.[0])
        .find((message) => message);

      toast.error(errorMessage || error.message);
    },
  });

  const handleAddStudent = async (values: AddStudentParent_TP) => {
    let newStudent = {
      full_name: values?.fullName_father,
      email: values?.email_father,
      phone: values?.phone_father,
      country_residence: values?.country_father,
      address: values?.address_father,
      student_id: editObj ? studentIDParam : studentID,
    };

    editObj ? await updateMutate(newStudent) : await mutate(newStudent);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        handleAddStudent(values);
        resetForm();
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className="flex flex-col w-full gap-5 px-8 md:w-3/4 md:px-16 m-auto">
            <BaseInput
              name="fullName_father"
              id="fullName_father"
              type="text"
              className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("full name")}
              label={t("full name")}
              labelProps="!font-semibold"
            />

            <BaseInput
              name="email_father"
              id="email_father"
              type="text"
              className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("email")}
              label={t("email")}
              labelProps="!font-semibold"
            />

            <BaseInput
              name="phone_father"
              id="phone_father"
              type="text"
              className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("phone number")}
              label={t("phone number")}
              labelProps="!font-semibold"
            />

            <BaseInput
              name="country_father"
              id="country_father"
              type="text"
              className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("country")}
              label={t("country")}
              labelProps="!font-semibold"
            />

            <div className="flex flex-col">
              <label htmlFor="address_father" className="font-semibold">
                {t("address")}
              </label>
              <textarea
                name="address_father"
                id="address_father"
                className="w-full text-lg py-2 px-4 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                value={values?.address_father}
                placeholder={t("address")}
                onChange={(e) => {
                  setFieldValue("address_father", e.target.value);
                }}
              />
            </div>

            <div className="mt-8 mx-auto">
              <Button
                loading={isPending || editIsPending}
                type="submit"
                className="me-5"
              >
                {t("confirm")}
              </Button>
              <Button
                action={() => navigate(-1)}
                className="bg-lightGray text-mainColor"
              >
                {t("cancel")}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default StudentAddFatherData;
