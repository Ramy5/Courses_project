import { Form, Formik } from "formik";
import BaseInput from "../../UI/BaseInput";
import { Button } from "../..";
import { t } from "i18next";
import customFetch from "../../../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface AddInstructorParent_TP {
  phone: string;
  facebook: string;
  whatsApp: string;
  linkedIn: string;
  twitter: string;
}

interface instructorAddParentData_TP {
  editObj?: AddInstructorParent_TP;
  instructorID: number;
  setActiveTab: (activeTab: string) => void;
}

const postInstructorContact = async (newInstructor: any) => {
  const data = customFetch.post("/contact-info", newInstructor);
  return data;
};

const editInstructorContact = async (editInstructor: any, id: number) => {
  const data = customFetch.post(`/contact-info/${id}`, editInstructor);
  return data;
};

const InstructorContactInformation = ({
  editObj,
  instructorID,
  setActiveTab,
}: instructorAddParentData_TP) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const initialValues: AddInstructorParent_TP = {
    phone: editObj?.phone || "",
    facebook: editObj?.facebook || "",
    whatsApp: editObj?.whatsApp || "",
    linkedIn: editObj?.linkedIn || "",
    twitter: editObj?.twitter || "",
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-instructor-contact"],
    mutationFn: postInstructorContact,
    onSuccess: (data) => {
      queryClient.invalidateQueries("instructors");
      toast.success(
        t("instructor login information has been edited successfully")
      );
      setActiveTab("qualification data");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error[0]?.email[0] ||
        error?.response?.data?.error[0]?.password[0];
      toast.error(errorMessage);
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationKey: ["edit-instructor-login"],
    mutationFn: (editInstructor: any) =>
      editInstructorContact(editInstructor, Number(editObj?.id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries("instructors");
      toast.success(
        t("instructor login information has been added successfully")
      );
      setActiveTab("qualification data");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error[0]?.email[0] ||
        error?.response?.data?.error[0]?.password[0];
      toast.error(errorMessage);
    },
  });

  const handleAddInstructorContact = async (values: AddInstructorParent_TP) => {
    const newInstructor = {
      phone: values?.phone,
      facebook: values?.facebook,
      whatsApp: values?.whatsApp,
      linkedIn: values?.linkedIn,
      twitter: values?.twitter,
      teacher_id: instructorID,
    };

    const editInstructor = {
      phone: values?.phone,
      facebook: values?.facebook,
      whatsApp: values?.whatsApp,
      linkedIn: values?.linkedIn,
      twitter: values?.twitter,
      teacher_id: editObj?.id,
    };

    editObj ? await editMutate(editInstructor) : await mutate(newInstructor);
  };

  const validate = (values) => {
    const errors = {};

    return errors;
  };

  return (
    <Formik
      validate={validate}
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        handleAddInstructorContact(values);
        resetForm();
      }}
    >
      <Form className="flex flex-col w-full gap-5 px-8 m-auto md:w-3/4 md:px-16">
        <div>
          <BaseInput
            name="phone"
            id="phone"
            type="text"
            className="w-full py-2 text-lg rounded-lg bg-lightGray main_shadow text-slate-800 focus-within:outline-none"
            placeholder={t("phone")}
            label={t("phone")}
            labelProps="!font-semibold"
          />
        </div>
        <div>
          <BaseInput
            name="facebook"
            id="facebook"
            type="text"
            className="w-full py-2 text-lg rounded-lg bg-lightGray main_shadow text-slate-800 focus-within:outline-none"
            placeholder={t("facebook")}
            label={t("facebook")}
            labelProps="!font-semibold"
          />
        </div>
        <div>
          <BaseInput
            name="whatsApp"
            id="whatsApp"
            type="text"
            className="w-full py-2 text-lg rounded-lg bg-lightGray main_shadow text-slate-800 focus-within:outline-none"
            placeholder={t("whats app")}
            label={t("whats app")}
            labelProps="!font-semibold"
          />
        </div>
        <div>
          <BaseInput
            name="linkedIn"
            id="linkedIn"
            type="text"
            className="w-full py-2 text-lg rounded-lg bg-lightGray main_shadow text-slate-800 focus-within:outline-none"
            placeholder={t("linked in")}
            label={t("linked in")}
            labelProps="!font-semibold"
          />
        </div>
        <div>
          <BaseInput
            name="twitter"
            id="twitter"
            type="text"
            className="w-full py-2 text-lg rounded-lg bg-lightGray main_shadow text-slate-800 focus-within:outline-none"
            placeholder={t("twitter")}
            label={t("twitter")}
            labelProps="!font-semibold"
          />
        </div>

        <div className="flex justify-end m-auto mt-5">
          <Button type="submit" className="me-5" loading={isPending}>
            {editObj ? t("edit contact information") : t("save contact information")}
          </Button>
          <Button
            action={() => navigate(-1)}
            type="button"
            className="bg-lightGray text-mainColor"
          >
            {t("cancel")}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default InstructorContactInformation;
