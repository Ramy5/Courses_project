import { Form, Formik } from "formik";
import { useState } from "react";
import BaseInput from "../../UI/BaseInput";
import { useRTL } from "../../../hooks/useRTL";
import { t } from "i18next";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { Button } from "../..";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customFetch from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

interface AddInstructorLogin_TP {
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
interface instructorAddLoginData_TP {
  editObj?: AddInstructorLogin_TP;
  setActiveTab: (activeTab: string) => void;
  setInstructorID: (id: number) => void;
}

const postInstructorLogin = async (newInstructor: any) => {
  const data = await customFetch.post("addLoginData", newInstructor);
  return data;
};

const editInstructorLogin = async (editInstructor: any, id: number) => {
  const data = await customFetch.post(
    `updateStudentLoginData/${id}`,
    editInstructor
  );
  return data;
};

const InstructorLoginData = ({
  editObj,
  setActiveTab,
  setInstructorID,
}: instructorAddLoginData_TP) => {
  console.log("🚀 ~ editObj:", editObj)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const isRTL = useRTL();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const initialValues = {
    full_name: editObj?.full_name || "",
    email: editObj?.email || "",
    password: editObj?.password || "",
    password_confirmation: editObj?.password_confirmation || "",
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-instructor-login"],
    mutationFn: postInstructorLogin,
    onSuccess: (data) => {
      setInstructorID(data?.data?.data?.teacher?.id);
      queryClient.invalidateQueries("instructors");
      toast.success(
        t("instructor login information has been added successfully")
      );
      setActiveTab("personal data");
    },
    onError: (error) => {
      console.log("🚀 ~ error:", error);
      const errorMessage =
        error?.response?.data?.error[0]?.email[0] ||
        error?.response?.data?.error[0]?.password[0];
      toast.error(errorMessage);
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationKey: ["edit-instructor-login"],
    mutationFn: (editInstructor: any) =>
      editInstructorLogin(editInstructor, Number(editObj?.id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries("instructors");
      toast.success(
        t("instructor login information has been added successfully")
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

  const handleAddInstructor = async (values: AddInstructorLogin_TP) => {
    const newInstructor = {
      full_name: values?.full_name,
      email: values?.email,
      password: values?.password,
      password_confirmation: values?.password_confirmation,
    };

    const editInstructor = {
      full_name: values?.full_name,
      email: values?.email,
      password: values?.password,
      password_confirmation: values?.password_confirmation,
      instructor_id: editObj?.id,
    };

    editObj ? await editMutate(editInstructor) : await mutate(newInstructor);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleAddInstructor(values)}
      >
        <Form className="flex flex-col gap-5 w-full md:w-3/4 px-8 md:px-16">
          <div>
            <BaseInput
              name="full_name"
              id="full_name"
              type="text"
              className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("name quadrilateral")}
              label={t("name quadrilateral")}
              labelProps="!font-semibold"
            />
          </div>
          <div>
            <BaseInput
              name="email"
              id="email"
              type="text"
              className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("email")}
              label={t("email")}
              labelProps="!font-semibold"
            />
          </div>
          <div className="relative">
            <BaseInput
              name="password"
              label={t("password")}
              id="password"
              className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("password")}
              type={showPassword ? "text" : "password"}
              labelProps="!font-semibold"
            />
            {isRTL && showPassword ? (
              <IoMdEyeOff
                size={28}
                className="cursor-pointer text-mainColor absolute top-1/2 end-5"
                onClick={handleShowPassword}
              />
            ) : (
              <IoEye
                size={28}
                className="cursor-pointer text-mainColor absolute top-1/2 end-5"
                onClick={handleShowPassword}
              />
            )}
          </div>
          <div className="relative">
            <BaseInput
              name="password_confirmation"
              id="password_confirmation"
              className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("confirm password")}
              label={t("confirm password")}
              type={showPassword ? "text" : "password"}
              labelProps="!font-semibold"
            />
            {isRTL && showConfirmPassword ? (
              <IoMdEyeOff
                size={28}
                className="cursor-pointer text-[#393D94] absolute top-1/2 end-5"
                onClick={handleShowConfirmPassword}
              />
            ) : (
              <IoEye
                size={28}
                className="cursor-pointer text-[#393D94] absolute top-1/2 end-5"
                onClick={handleShowConfirmPassword}
              />
            )}
          </div>

          <div className="mt-5 flex justify-end">
            <Button type="submit" className="me-5" loading={isPending}>
              {t("confirm")}
            </Button>
            <Button
              type="button"
              action={() => navigate(-1)}
              className="bg-[#E6EAEE] text-mainColor"
            >
              {t("cancel")}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default InstructorLoginData;
