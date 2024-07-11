import { Form, Formik } from "formik";
import BaseInput from "../../UI/BaseInput";
import { t } from "i18next";
import { Button, Table } from "../..";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useMemo, useState } from "react";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import customFetch from "../../../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddNewCertificatesInput from "./AddNewCertificatesInput";

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
}

const postInstructorQualification = async (newInstructor: any) => {
  const data = customFetch.post("/qualification", newInstructor);
  return data;
};

const editInstructorQualification = async (editInstructor: any, id: number) => {
  const data = customFetch.post(`/updateCertificate/${id}`, editInstructor);
  return data;
};

const InstructorQualificationData = ({
  editObj,
  instructorID,
}: InstructorAddQualificationData_TP) => {
  console.log("🚀 ~ editObj:", editObj);
  const [file, setFile] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [addNewCertificates, setAddNewCertificates] = useState(false);
  console.log("🚀 ~ addNewCertificates:", addNewCertificates);

  const [newCertificates, setNewCertificates] = useState([]);
  console.log("🚀 ~ newCertificates:", newCertificates);

  const initialValues: AddInstructorQualification_TP = {
    general_specialization: editObj?.general_specialization || "",
    specialization: editObj?.specialization || "",
    degree: editObj?.degree || "",
    year_acquisition: editObj?.year_acquisition || "",
    cv_file: editObj?.cv_file || "",
    job_title: editObj?.job_title || "",
    // newCertificate: {
    //   type_certificate: editObj?.type_certificate || "",
    //   certificate_name: editObj?.certificate_name || "",
    //   donor: editObj?.donor || "",
    //   date_acquisition: editObj?.date_acquisition || "",
    //   specialization: editObj?.specialization || "",
    //   appreciation: editObj?.appreciation || "",
    // },
  };

  // const errorFields = [
  //   "general_specialization",
  //   "specialization",
  //   "degree",
  //   "year_acquisition",
  //   "cv_file",
  //   "job_title",
  //   "newCertificate",
  // ];

  // const mutation = useMutation({
  //   mutationKey: ["add-qualification"],
  //   mutationFn: postInstructorQualification,
  //   onSuccess: (data: any) => {
  //     queryClient.invalidateQueries("instructor");
  //     toast.success(
  //       t("instructor qualification data has been added successfully")
  //     );

  //     navigate("/instructors");
  //   },
  //   onError: (error) => {
  //     const errorMessage = errorFields
  //       .map((field) => error?.response?.data?.error[0]?.[field]?.[0])
  //       .find((message) => message);

  //     toast.error(errorMessage || error.message);
  //   },
  // });

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
      editInstructorQualification(editInstructor, Number(editObj?.id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries("instructors");
      toast.success(
        t("instructor qualification data has been added successfully")
      );
      navigate("/instructors");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error[0]?.email[0] ||
        error?.response?.data?.error[0]?.password[0];
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
      cv_file: values?.cv_file,
      job_title: values?.job_title,
      newCertificate: newCertificates,
      teacher_id: instructorID,
    };

    const editInstructor = {
      id: editObj?.id,
      general_specialization: editObj?.general_specialization,
      specialization: editObj?.specialization,
      degree: editObj?.degree,
      year_acquisition: editObj?.year_acquisition,
      cv_file: editObj?.cv_file,
      job_title: editObj?.job_title,
      newCertificate: newCertificates,
      teacher_id: editObj?.teacher_id,
    };
    console.log("🚀 ~ editInstructor:", editInstructor);

    editObj ? await editMutate(editInstructor) : await mutate(newInstructor);
  };

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
        console.log("🚀 ~ InstructorQualificationData ~ values:", values);
        return (
          <Form>
            <div className="flex flex-col gap-5 w-full md:w-3/4 px-8 md:px-16">
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
                <div className="flex items-center flex-col sm:flex-row gap-8">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <div className="cursor-pointer border-2 py-6 px-12 text-center border-dashed border-mainColor relative">
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
                      <div className="flex flex-col  gap-1 justify-center">
                        <span className="text-sm font-medium text-gray-700 text-center">
                          الملفات
                        </span>
                        <div className="bg-mainBg rounded-md p-1 relative">
                          <div
                            // onClick={() => setManyPdfsOpen(true)}
                            className="cursor-pointer flex items-center justify-center p-2 "
                          >
                            <span className="absolute -top-1 -right-3 bg-mainColor w-6 h-6 flex justify-center items-center text-sm font-medium rounded-full text-white">
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
                        className="fill-mainRed cursor-pointer"
                        onClick={handleFileDelete}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mx-8 mb-5">
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
                  />
                )}
              </div>
            </div>

            <div className="mt-12 px-8 flex justify-end">
              <Button type="submit" className="me-5" loading={isPending}>
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
  );
};

export default InstructorQualificationData;
