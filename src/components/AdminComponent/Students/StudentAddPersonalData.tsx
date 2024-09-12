import { Form, Formik } from "formik";
import BaseInput from "../../UI/BaseInput";
import { t } from "i18next";
import { DateInputField } from "../../UI/DateInputField";
import MainRadio from "../../UI/MainRadio";
import { Button } from "../..";
import { ChangeEvent, useEffect, useState } from "react";
import User from "../../../assets/instructors/user 1.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/constants";
import axios from "axios";
import Cookies from "js-cookie";

const postStudentPersonal = async (newStudent: any) => {
  const token = Cookies.get("token");
  const response = await axios.post(
    `${BASE_URL}studentPersonalData`,
    newStudent,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

const editStudentPersonal = async (editStudent: any) => {
  const token = Cookies.get("token");
  const response = await axios.post(
    `${BASE_URL}studentPersonalData`,
    editStudent,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

interface AddStudentPersonal_TP {
  fullName_personal: string;
  nationality_personal: string;
  id_number_personal: string | number;
  country_residence_personal: string;
  educational_qualification_personal: string;
  address_personal: string;
  date_birth_personal: string | Date;
  type_personal: "male" | "female";
  image: [];
}

interface StudentAddPersonalData {
  editObj?: AddStudentPersonal_TP;
  studentID: number;
  setActiveTab: (activeTab: string) => void;
}

const StudentAddPersonalData = ({
  editObj,
  studentID,
  setActiveTab,
}: StudentAddPersonalData) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const initialValues = {
    // PERSONAL DATA
    fullName_personal: editObj?.fullName_personal || "",
    nationality_personal: editObj?.nationality_personal || "",
    id_number_personal: editObj?.id_number_personal || "",
    country_residence_personal: editObj?.country_residence_personal || "",
    educational_qualification_personal:
      editObj?.educational_qualification_personal || "",
    address_personal: editObj?.address_personal || "",
    date_birth_personal: editObj?.date_birth_personal || "",
    type_personal: editObj?.type_personal || "male",
  };

  const errorFields = [
    "full_name",
    "nationality",
    "id_number",
    "country_residence",
    "qualification",
    "address",
    "date_birth",
    "personal_image",
  ];

  const [selectedViewImage, setSelectedViewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files[0];
    setSelectedViewImage(URL.createObjectURL(file));
    setSelectedImage(file);
  };

  const handleDeleteImage = () => {
    setSelectedImage(User);
    setSelectedViewImage(User);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-student-personal"],
    mutationFn: postStudentPersonal,
    onSuccess: () => {
      queryClient.invalidateQueries("students");
      toast.success(
        t("student personal information has been added successfully")
      );
      setActiveTab("guardian data");
    },
    onError: (error) => {
      const errorMessage = errorFields
        .map((field) => error?.response?.data?.error[0]?.[field]?.[0])
        .find((message) => message);

      toast.error(errorMessage || error.message);
    },
  });

  const { mutate: editStudentMutate, isPending: editIsPending } = useMutation({
    mutationKey: ["edit-student-personal"],
    mutationFn: editStudentPersonal,
    onSuccess: () => {
      queryClient.invalidateQueries("students");
      toast.success(
        t("student personal information has been edited successfully")
      );
      setActiveTab("guardian data");
    },
    onError: (error) => {
      const errorMessage = errorFields
        .map((field) => error?.response?.data?.error[0]?.[field]?.[0])
        .find((message) => message);

      toast.error(errorMessage || error.message);
    },
  });

  const handleAddStudent = async (values: AddStudentPersonal_TP) => {
    let newStudent = {
      full_name: values?.fullName_personal,
      nationality: values?.nationality_personal,
      id_number: +values?.id_number_personal,
      country_residence: values?.country_residence_personal,
      qualification: values?.educational_qualification_personal,
      address: values?.address_personal,
      date_birth: formatDate(values?.date_birth_personal),
      type: values?.type_personal,
      personal_image: selectedImage,
      student_id: studentID,
    };

    if (editObj) newStudent = { ...newStudent, student_id: editObj?.id };

    editObj ? await editStudentMutate(newStudent) : await mutate(newStudent);
  };

  useEffect(() => setSelectedImage(editObj?.image), []);

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
          <Form className="flex flex-col gap-5 px-4 lg:px-16 ">
            <div className="flex flex-col-reverse justify-between gap-8 md:flex-row">
              <div className="flex flex-col w-full gap-4 md:w-1/2 ">
                <div>
                  <BaseInput
                    name="fullName_personal"
                    id="fullName_personal"
                    type="text"
                    className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                    placeholder={t("full name")}
                    label={t("full name")}
                    labelProps="!font-semibold"
                  />
                </div>
                <div>
                  <BaseInput
                    name="nationality_personal"
                    id="nationality_personal"
                    type="text"
                    className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                    placeholder={t("nationality")}
                    label={t("nationality")}
                    labelProps="!font-semibold"
                  />
                </div>
                <div>
                  <BaseInput
                    name="id_number_personal"
                    id="id_number_personal"
                    type="text"
                    className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                    placeholder={t("id number / Location")}
                    label={t("id number / Location")}
                    labelProps="!font-semibold"
                  />
                </div>
                <div>
                  <BaseInput
                    name="country_residence_personal"
                    id="country_residence_personal"
                    type="text"
                    className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                    placeholder={t("country residence")}
                    label={t("country residence")}
                    labelProps="!font-semibold"
                  />
                </div>
                <div>
                  <BaseInput
                    name="educational_qualification_personal"
                    id="educational_qualification_personal"
                    type="text"
                    className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                    placeholder={t("educational qualification")}
                    label={t("educational qualification")}
                    labelProps="!font-semibold"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="font-semibold">
                    {t("address")}
                  </label>
                  <textarea
                    name="address_personal"
                    id="address_personal"
                    className="w-full text-lg py-2 px-4 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                    placeholder={t("address")}
                    value={values.address_personal}
                    onChange={(e) => {
                      setFieldValue("address_personal", e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <DateInputField
                    label={`${t("date of birth")}`}
                    placeholder={`${t("date of birth")}`}
                    name="date_birth_personal"
                    className="w-full md:w-1/2"
                    labelProps={{ className: "mb-2  !font-bold" }}
                  />
                </div>
                <div>
                  <p className="font-semibold">{t("type")}</p>
                  <div className="flex gap-5">
                    <MainRadio
                      name="type_personal"
                      id="male"
                      label={`${t("male")}`}
                      className="checked:accent-mainColor"
                      labelClassName="font-semibold"
                      checked={values.type_personal === "male"}
                      onChange={() => {
                        setFieldValue("type_personal", "male");
                      }}
                    />
                    <MainRadio
                      name="type_personal"
                      id="female"
                      label={`${t("female")}`}
                      className="checked:accent-mainColor"
                      labelClassName="font-semibold"
                      checked={values.type_personal === "female"}
                      onChange={() => {
                        setFieldValue("type_personal", "female");
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                {selectedViewImage ? (
                  <img
                    src={selectedViewImage}
                    alt="user"
                    className="m-auto w-[180px] h-[180px] rounded-full"
                  />
                ) : (
                  <img
                    src={editObj ? editObj.image : User}
                    alt="user"
                    className="m-auto w-[180px] h-[180px] rounded-full"
                  />
                )}
                <div className="flex justify-center gap-5 mt-6">
                  <input
                    type="file"
                    accept="image/*"
                    id="image_upload_personal"
                    className="hidden"
                    name="personal_image"
                    onChange={(e) => {
                      handleImageChange(e);
                      setFieldValue("image_upload_personal", e.target.value);
                    }}
                  />
                  <Button
                    type="button"
                    className="relative w-full h-10 lg:w-1/4"
                  >
                    <label
                      htmlFor="image_upload_personal"
                      className="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center cursor-pointer"
                    >
                      {t("add image")}
                    </label>
                  </Button>
                  <Button
                    type="button"
                    className="w-full text-white lg:w-1/4 bg-mainRed"
                    action={handleDeleteImage}
                  >
                    {t("delete")}
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8">
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

export default StudentAddPersonalData;
