import BaseInput from "../../UI/BaseInput";
import { t } from "i18next";
import { Button } from "../..";
import PasswordInput from "../../UI/PasswordInput";
import customFetch from "../../../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface AddStudentLogin_TP {
  email_login: string;
  password_login: string;
  confirm_password_login: string;
}

interface StudentAddLoginData_TP {
  editObj?: AddStudentLogin_TP;
  setActiveTab: (activeTab: string) => void;
  setStudentID: (id: number) => void;
}

const postStudentLogin = async (newStudent: any) => {
  const data = await customFetch.post("studentLoginData", newStudent);
  return data;
};

const editStudentLogin = async (editStudent: any, id: number) => {
  const data = await customFetch.post(
    `updateStudentLoginData/${id}`,
    editStudent
  );
  return data;
};

const StudentAddLoginData = ({
  editObj,
  setStudentID,
  setActiveTab,
}: StudentAddLoginData_TP) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const initialValues = {
    email_login: editObj?.email_login || "",
    password_login: editObj?.password_login || "",
    confirm_password_login: editObj?.confirm_password_login || "",
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-student-login"],
    mutationFn: postStudentLogin,
    onSuccess: (data) => {
      setStudentID(data?.data?.data?.student?.id);
      queryClient.invalidateQueries("students");
      toast.success(t("student login information has been added successfully"));
      setActiveTab("personal data");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error[0]?.email[0] ||
        error?.response?.data?.error[0]?.password[0];
      toast.error(errorMessage);
    },
  });

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationKey: ["edit-student-login"],
    mutationFn: (editStudent: any) =>
      editStudentLogin(editStudent, Number(editObj?.id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries("students");
      toast.success(
        t("student login information has been edited successfully")
      );
      setActiveTab("personal data");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error[0]?.email[0] ||
        error?.response?.data?.error[0]?.password[0];
      toast.error(errorMessage);
    },
  });

  const handleAddStudent = async (values: AddStudentLogin_TP) => {
    const newStudent = {
      email: values.email_login,
      password: values.password_login,
      password_confirmation: values.confirm_password_login,
    };

    const editStudent = {
      email: values.email_login,
      password: values.password_login,
      password_confirmation: values.confirm_password_login,
      student_id: editObj?.id,
    };

    editObj ? await editMutate(editStudent) : await mutate(newStudent);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleAddStudent(values)}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className="flex flex-col w-full gap-5 px-8 md:w-3/4 md:px-16 m-auto">
            <BaseInput
              name="email_login"
              id="email_login"
              type="text"
              className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("email")}
              value={values?.email_login}
              onChange={(e) => {
                setFieldValue("email_login", e.target.value);
              }}
              label={t("email")}
              labelProps="!font-semibold"
            />

            <div>
              <label htmlFor="password_login" className="font-bold">
                {t("password")}
              </label>
              <PasswordInput
                name="password_login"
                parentClass="w-full text-lg py-1 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("password")}
                value={values?.password_login}
                className="!text-lg !py-2"
                onChange={(e) => {
                  setFieldValue("password_login", e.target.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="confirm_password_login" className="font-bold">
                {t("confirm password")}
              </label>
              <PasswordInput
                name="confirm_password_login"
                parentClass="w-full text-lg py-1 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("confirm password")}
                className="!text-lg !py-2"
                value={values?.confirm_password_login}
                onChange={(e) => {
                  setFieldValue("confirm_password_login", e.target.value);
                }}
              />
            </div>

            <div className="mt-8 mx-auto">
              <Button
                loading={isPending || editIsPending}
                className="me-5"
                type="submit"
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

export default StudentAddLoginData;
