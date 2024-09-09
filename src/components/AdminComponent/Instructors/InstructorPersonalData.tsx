import { Form, Formik } from "formik";
import BaseInput from "../../UI/BaseInput";
import { t } from "i18next";
import { Button, MainRadio } from "../..";
import { DateInputField } from "../../UI/DateInputField";
import User from "../../../assets/instructors/user 1.svg";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/helpers";
import { BASE_URL } from "../../../utils/constants";
import axios from "axios";
import Cookies from "js-cookie";

const postInstructorPersonal = async (newStudent: any) => {
  const token = Cookies.get("token");
  const response = await axios.post(`${BASE_URL}addPersonalData`, newStudent, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const editInstructorPersonal = async (editStudent: any) => {
  const token = Cookies.get("token");
  const response = await axios.post(`${BASE_URL}addPersonalData`, editStudent, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

interface AddInstructorPersonal_TP {
  fullName_personal: string;
  nationality: string;
  id_number: string | number;
  country_residence: string;
  teacher_id: number;
  address: string;
  date_birth: string | Date;
  type: "male" | "female";
  personal_image: [];
}

interface InstructorAddPersonalData {
  editObj?: AddInstructorPersonal_TP;
  instructorID: number;
  setActiveTab: (activeTab: string) => void;
  setInstructorID: (instructorID: number) => void;
}

const InstructorPersonalData = ({
  editObj,
  instructorID,
  setActiveTab,
  setInstructorID,
}: InstructorAddPersonalData) => {
  const [selectedImage, setSelectedImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const queryClient = useQueryClient();

  const initialValues = {
    // PERSONAL DATA
    nationality: editObj?.nationality || "",
    id_number: editObj?.id_number || "",
    country_residence: editObj?.country_residence || "",
    address: editObj?.address || "",
    date_birth: editObj?.date_birth || "",
    type: editObj?.type || "male",
    personal_image: editObj?.personal_image,
    teacher_id: editObj?.teacher_id || 0,
  };

  const errorFields = [
    "nationality",
    "id_number",
    "country_residence",
    "address",
    "date_birth",
    "type",
    "personal_image",
    "teacher_id",
  ];

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-instructor-personal"],
    mutationFn: postInstructorPersonal,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries("instructor");
      toast.success(
        t("instructor personal information has been added successfully")
      );
      setActiveTab("contact information");
    },
    onError: (error) => {
      const errorMessage = errorFields
        .map((field) => error?.response?.data?.error[0]?.[field]?.[0])
        .find((message) => message);

      toast.error(errorMessage || error.message);
    },
  });

  const { mutate: editStudentMutate } = useMutation({
    mutationKey: ["edit-student-personal"],
    mutationFn: (editInstructor: any) => editInstructorPersonal(editInstructor),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries("instructor");
      toast.success(
        t("instructor personal information has been added successfully")
      );
      setInstructorID();
      setActiveTab("contact information");
    },
    onError: (error) => {
      const errorMessage = errorFields
        .map((field) => error?.response?.data?.error[0]?.[field]?.[0])
        .find((message) => message);

      toast.error(errorMessage || error.message);
    },
  });

  const handleAddInstructor = async (values: AddInstructorPersonal_TP) => {
    let newStudent = {
      nationality: values?.nationality,
      id_number: values?.id_number,
      country_residence: values?.country_residence,
      address: values?.address,
      date_birth: formatDate(values?.date_birth),
      type: values?.type || "male",
      personal_image: selectedImage,
      teacher_id: instructorID,
    };

    if (editObj) newStudent = { ...newStudent, teacher_id: editObj?.id };

    editObj ? await editStudentMutate(newStudent) : await mutate(newStudent);
  };

  useEffect(() => setSelectedImage(editObj?.image), []);

  const handleImageChange = (event) => {
    const file = event?.target?.files[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setSelectedImage(User); // Reset to the default image
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleAddInstructor(values)
          resetForm();
        }}
      >
        {({ setFieldValue, values }) => {
          return (
            <Form className="flex flex-col gap-5 px-8 md:px-16 ">
              <div className="flex flex-col-reverse justify-between gap-8 md:flex-row">
                <div className="flex flex-col w-full gap-4 md:w-1/2 ">
                  <div>
                    <BaseInput
                      name="nationality"
                      id="nationality"
                      type="text"
                      className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("nationality")}
                      label={t("nationality")}
                      labelProps="!font-semibold"
                    />
                  </div>
                  <div>
                    <BaseInput
                      name="id_number"
                      id="id_number"
                      type="text"
                      className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("id number / Location")}
                      label={t("id number / Location")}
                      labelProps="!font-semibold"
                    />
                  </div>
                  <div>
                    <BaseInput
                      name="country_residence"
                      id="country_residence"
                      type="text"
                      className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("country residence")}
                      label={t("country residence")}
                      labelProps="!font-semibold"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="font-semibold">
                      {t("address")}
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      className="w-full text-lg py-2 px-4 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("address")}
                      value={values?.address}
                      onChange={(e) => {
                        setFieldValue("address", e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <DateInputField
                      label={`${t("date of birth")}`}
                      placeholder={`${t("date of birth")}`}
                      name="date_birth"
                      className="w-full md:w-1/2"
                      labelProps={{ className: "mb-2" }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{t("type")}</p>
                    <div className="flex gap-5">
                      <MainRadio
                        name="type"
                        id="type"
                        label={`${t("male")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold"
                        checked={values.type === "male"}
                        onChange={() => {
                          setFieldValue("type", "male");
                        }}
                      />
                      <MainRadio
                        name="type"
                        id="type"
                        label={`${t("female")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold"
                        checked={values.type === "female"}
                        onChange={() => {
                          setFieldValue("type", "female");
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="user"
                      className="m-auto w-[180px] h-[180px] rounded-full"
                    />
                  ) : (
                    <img
                      src={editObj ? editObj.personal_image : User}
                      alt="user"
                      className="m-auto w-[180px] h-[180px] rounded-full"
                    />
                  )}
                  <div className="flex justify-center gap-5 mt-6">
                    <input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      className="hidden"
                      name="personal_image"
                      onChange={(e) => {
                        handleImageChange(e);
                        setFieldValue("personal_image", e.target.value);
                      }}
                    />
                    <Button type="button" className="relative w-full h-10">
                      <label
                        htmlFor="image-upload"
                        className="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center cursor-pointer"
                      >
                        {t("add image")}
                      </label>
                    </Button>
                    <Button
                      type="button"
                      className="w-full text-white bg-mainRed"
                      action={handleDeleteImage}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-5">
                <Button type="submit" className="me-5" loading={isPending}>
                  {editObj ? t("edit") : t("confirm")}
                </Button>
                <Button type="button" className="bg-lightGray text-mainColor">
                  {t("cancel")}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default InstructorPersonalData;
