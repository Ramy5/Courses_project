import { Form, Formik, useFormikContext } from "formik";
import BaseInput from "../../UI/BaseInput";
import { t } from "i18next";
import { DateInputField } from "../../UI/DateInputField";
import MainRadio from "../../UI/MainRadio";
import { Button } from "../..";
import { ChangeEvent, useState } from "react";
import User from "../../../assets/instructors/user 1.svg";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { toast } from "react-toastify";

const postStudentPersonal = async (newStudent: any) => {
  const { data } = customFetch.post("studentPersonalData", newStudent);
  return data;
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
  image_upload_personal: [];
}

const StudentAddPersonalData = ({
  editObj,
}: {
  editObj?: AddStudentPersonal_TP;
}) => {
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
    image_upload_personal: editObj?.image_upload_personal || [],
  };

  const [selectedImage, setSelectedImage] = useState(User);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(User);
  };

  const mutation = useMutation({
    mutationKey: ["add-student"],
    mutationFn: postStudentPersonal,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddStudent = async (values: AddStudentPersonal_TP) => {
    const newStudent = {
      full_name: editObj?.fullName_personal || "",
      nationality: editObj?.nationality_personal || "",
      id_number: editObj?.id_number_personal || "",
      country_residence: editObj?.country_residence_personal || "",
      qualification: editObj?.educational_qualification_personal || "",
      address: editObj?.address_personal || "",
      date_birth: editObj?.date_birth_personal || "",
      type: editObj?.type_personal || "male",
      personal_image: editObj?.image_upload_personal || [],
    };

    await mutation.mutate(newStudent);

    toast.success(t("student login information has been added successfully"));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleAddStudent(values)}
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
                    className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
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
                    className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
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
                    className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
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
                    className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
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
                    className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
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
                    className="w-full text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
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
                <img
                  src={selectedImage}
                  alt="user"
                  className="m-auto w-[180px] h-[180px] rounded-full"
                />
                <div className="flex justify-center gap-5 mt-6">
                  <input
                    type="file"
                    accept="image/*"
                    id="image_upload_personal"
                    className="hidden"
                    name="personal_image"
                    // value={values.image_upload_personal[0]}
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
              <Button className="me-5">{t("confirm")}</Button>
              <Button className="bg-[#E6EAEE] text-mainColor">
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
