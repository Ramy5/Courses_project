import { Form, Formik } from "formik";
import BaseInput from "../../UI/BaseInput";
import { t } from "i18next";
import { Button } from "../..";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddNewCertificatesInput from "./AddNewCertificatesInput";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../utils/constants";
interface AddInstructorQualification_TP {
  general_specialization: string;
  specialization: string;
  degree: string;
  year_acquisition: string;
  cv_file: string;
  job_title: string;
}
interface InstructorAddQualificationData_TP {
  editObj?: AddInstructorQualification_TP;
  instructorID: number;
  dataReceived: any;
}

const postInstructorQualification = async (newInstructor: any) => {
  const token = Cookies.get("token");
  const response = await axios.post(`${BASE_URL}qualification`, newInstructor, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const editInstructorQualification = async (editInstructor: any, id: number) => {
  const token = Cookies.get("token");
  const response = await axios.post(
    `${BASE_URL}updateQualificationData/${id}`,
    editInstructor,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

const editInstructorCertificate = async (editCertificate: any, id: number) => {
  const response = await axios.post(`updateCertificate/${id}`, editCertificate);

  return response;
};

const InstructorQualificationData = ({
  editObj,
  instructorID,
  dataReceived,
}: InstructorAddQualificationData_TP) => {
  console.log("🚀 ~ instructorID:", instructorID);
  console.log("🚀 ~ editObj:", editObj);
  const [file, setFile] = useState(editObj?.file || null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [addNewCertificates, setAddNewCertificates] = useState(false);
  const [newCertificates, setNewCertificates] = useState(
    editObj?.newCertificate || []
  );

  console.log("🚀 ~ newCertificates:", newCertificates);

  const [editCertificateData, setEditCertificateData] = useState({});
  console.log("🚀 ~ editCertificateData:", editCertificateData);

  const initialValues: AddInstructorQualification_TP = {
    general_specialization: editObj?.general_specialization || "",
    specialization: editObj?.specialization || "",
    degree: editObj?.degree || "",
    year_acquisition: editObj?.year_acquisition || "",
    cv_file: editObj?.cv_file || "",
    job_title: editObj?.job_title || "",
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-instructor-contact"],
    mutationFn: postInstructorQualification,
    onSuccess: (data) => {
      queryClient.invalidateQueries("instructors");
      toast.success(
        t("instructor login information has been added successfully")
      );
      navigate("/instructors");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationKey: ["edit-instructor-login"],
    mutationFn: (editInstructor: any) =>
      editInstructorQualification(editInstructor, Number(editObj?.id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries("instructors");
      toast.success(
        t("instructor qualification data has been added successfully")
      );
      navigate("/instructors");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  const { mutate: editCertificateMutate, isPending: editCertificateIsPending } =
    useMutation({
      mutationKey: ["edit-instructor-login"],
      mutationFn: (editCertificate: any) =>
        editInstructorCertificate(
          editCertificate,
          Number(editCertificateData?.id)
        ),
      onSuccess: (data) => {
        queryClient.invalidateQueries("Certificate");
        toast.success(
          t("instructor qualification data has been added successfully")
        );
        navigate("/instructors");
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.error[0];
        toast.error(errorMessage);
      },
    });

  const handleAddQualification = async (
    values: AddInstructorQualification_TP
  ) => {
    const newInstructor = {
      general_specialization: values?.general_specialization,
      specialization: values?.specialization,
      degree: values?.degree,
      year_acquisition: values?.year_acquisition,
      cv_file: file,
      job_title: values?.job_title,
      newCertificate: newCertificates,
      teacher_id: instructorID,
    };
    console.log("🚀 ~ newInstructor:", newInstructor);

    const editInstructor = {
      id: editObj?.id,
      teacher_id: editObj?.teacher_id,
      general_specialization: values?.general_specialization,
      specialization: values?.specialization,
      degree: values?.degree,
      year_acquisition: values?.year_acquisition,
      cv_file: file,
      job_title: values?.job_title,
      newCertificate: newCertificates,
    };
    console.log("🚀 ~ editInstructor:", editInstructor);

    const editCertificate = {
      type_certificate: editCertificateData?.type_certificate,
      certificate_name: editCertificateData?.certificate_name,
      donor: editCertificateData?.donor,
      date_acquisition: editCertificateData?.date_acquisition,
      specialization: editCertificateData?.specialization,
      appreciation: editCertificateData?.appreciation,
    };

    editObj
      ? editCertificateData.type_certificate
        ? await editCertificateMutate(editCertificate)
        : await editMutate(editInstructor)
      : await mutate(newInstructor);
  };

  useEffect(() => setFile(editObj?.cv_file), []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileDelete = () => {
    setFile(null);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleAddQualification(values)}
    >
      {({ values }) => {
        return (
          <Form>
            <div className="flex flex-col w-full gap-5 px-8 md:w-3/4 md:px-16">
              <div>
                <BaseInput
                  name="general_specialization"
                  id="general_specialization"
                  type="text"
                  className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("general specialization")}
                  label={t("general specialization")}
                  labelProps="!font-semibold"
                />
              </div>
              <div>
                <BaseInput
                  name="specialization"
                  id="specialization"
                  type="text"
                  className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("Specialization")}
                  label={t("Specialization")}
                  labelProps="!font-semibold"
                />
              </div>
              <div>
                <BaseInput
                  name="degree"
                  id="degree"
                  type="text"
                  className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("degree")}
                  label={t("degree")}
                  labelProps="!font-semibold"
                />
              </div>
              <div>
                <BaseInput
                  name="year_acquisition"
                  id="year_acquisition"
                  type="text"
                  className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("year acquisition")}
                  label={t("year acquisition")}
                  labelProps="!font-semibold"
                />
              </div>
              <div>
                <BaseInput
                  name="job_title"
                  id="job_title"
                  type="text"
                  className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                  placeholder={t("job title")}
                  label={t("job title")}
                  labelProps="!font-semibold"
                />
              </div>

              <div>
                <h2 className="mb-3 font-semibold">{t("CV file")}</h2>
                <div className="flex flex-col items-center gap-8 sm:flex-row">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <div className="relative px-12 py-6 text-center border-2 border-dashed cursor-pointer border-mainColor">
                    <label
                      htmlFor="file-upload"
                      className="absolute top-0 bottom-0 left-0 right-0 w-full h-full cursor-pointer"
                    ></label>
                    <AiOutlineCloudUpload
                      size={150}
                      className="fill-[#E6EAEE] m-auto"
                    />
                    <p>{t("drag or click to add a file")}</p>
                  </div>
                  {file && (
                    <div className="flex items-center gap-5">
                      <div className="flex flex-col justify-center gap-1">
                        <span className="text-sm font-medium text-center text-gray-700">
                          الملفات
                        </span>
                        <div className="relative p-1 rounded-md bg-mainBg">
                          <div
                            // onClick={() => setManyPdfsOpen(true)}
                            className="flex items-center justify-center p-2 cursor-pointer "
                          >
                            <span className="absolute flex items-center justify-center w-6 h-6 text-sm font-medium text-white rounded-full -top-1 -right-3 bg-mainColor">
                              1
                            </span>
                            <HiMiniFolderArrowDown
                              className="fill-mainColor"
                              size={35}
                            />
                          </div>
                        </div>
                      </div>
                      <RiDeleteBin5Line
                        size={35}
                        className="cursor-pointer fill-mainRed"
                        onClick={handleFileDelete}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mx-8 mb-5">
                <h2 className="text-2xl font-semibold">
                  {t("scientific certificates")}
                </h2>
                <Button action={() => setAddNewCertificates(true)}>
                  {t("add")}
                </Button>
              </div>
              <div className="overflow-auto">
                {(addNewCertificates || editObj?.newCertificate) && (
                  <AddNewCertificatesInput
                    setNewCertificates={setNewCertificates}
                    editObj={editObj}
                    newCertificates={newCertificates}
                    setEditCertificateData={setEditCertificateData}
                    dataReceived={dataReceived}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end px-8 mt-12">
              <Button
                type="submit"
                className="me-5"
                loading={isPending || editCertificateIsPending || editIsPending}
              >
                {editObj ? t("edit") : t("confirm")}
              </Button>
              <Button
                type="button"
                className="bg-[#E6EAEE] text-mainColor"
                action={() => navigate(-1)}
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

export default InstructorQualificationData;
