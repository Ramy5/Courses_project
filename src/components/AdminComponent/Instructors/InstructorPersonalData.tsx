import { Form, Formik } from "formik";
import BaseInput from "../../UI/BaseInput";
import { t } from "i18next";
import { Button, MainRadio } from "../..";
import { DateInputField } from "../../UI/DateInputField";
import User from "../../../assets/instructors/user 1.svg";
import { useState } from "react";

const InstructorPersonalData = () => {
  const [selectedImage, setSelectedImage] = useState(User); // Initial state is the default image

  const initialValues = {
    nationality: "",
    id_number: "",
    country_residence: "",
    address: "",
    date_birth: "",
    type: "",
    personal_image: "",
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(User); // Reset to the default image
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log("🚀 ~ InstructorLoginData ~ values:", values);
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
                      className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
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
                      className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
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
                      className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
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
                      className="w-full text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("address")}
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
                  <img
                    src={selectedImage}
                    alt="user"
                    className="m-auto w-[180px] h-[180px] rounded-full"
                  />
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
                <Button type="submit" className="me-5">
                  {t("confirm")}
                </Button>
                <Button type="button" className="bg-[#E6EAEE] text-mainColor">
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
