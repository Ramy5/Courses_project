import { Form, Formik } from "formik";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { BaseInput, Button } from "../../../components";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../utils/constants";
import * as Yup from "yup";
import { FormikError } from "../../../components/UI/FormikError";
import { changeSidebarRoute } from "../../../features/dirty/dirtySlice";
import { useAppDispatch } from "../../../hooks/reduxHooks";

const validationSchema = Yup.object().shape({
  title_ar: Yup.string().required("Title in Arabic is required"),
  title_en: Yup.string().required("Title in English is required"),
  desc_ar: Yup.string().required("Description in Arabic is required"),
  desc_en: Yup.string().required("Description in English is required"),
  instructions_ar: Yup.string().required("Instructions in Arabic are required"),
  instructions_en: Yup.string().required(
    "Instructions in English are required"
  ),
});

const postInstructorQualification = async (
  newLecturePreparation: any,
  id: number
) => {
  const token = Cookies.get("token");
  const response = await axios.post(
    `${BASE_URL}storeLectureData/${id}`,
    newLecturePreparation,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

const LecturePreparation = () => {
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const editObj = location.state;
  const dispatch = useAppDispatch();

  const initialValues = {
    title_ar: editObj?.title || "",
    title_en: editObj?.title_en || "",
    desc_ar: editObj?.desc_ar || "",
    desc_en: editObj?.desc_en || "",
    instructions_ar: editObj?.instructions_ar || "",
    instructions_en: editObj?.instructions_en || "",
  };

  const handleFileChange = (event) => {
    setFiles([...files, event.target.files[0]]);
  };

  const handleDeleteFile = (fileName: string) => {
    const instructorFileFilter = files.filter(
      (file: any) => file.name !== fileName
    );
    setFiles(instructorFileFilter);
  };

  const handleDeleteLink = (index: string) => {
    const instructorFileFilter = links.filter(
      (link: any, i: any) => i !== index
    );
    setLinks(instructorFileFilter);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["lecture_reparation"],
    mutationFn: (editScheduleData: any) =>
      postInstructorQualification(editScheduleData, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries("preparation");
      toast.success(t("lecture setting added successfully"));
      navigate(-1);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  const handleAddLecturePreparation = async (values) => {
    if (!files?.length) {
      toast.info("file is required");
      return;
    }

    if (!links?.length) {
      toast.info("links are required");
      return;
    }

    const newLecturePreparation = {
      title_ar: values.title_ar,
      title_en: values.title_en,
      desc_ar: values.desc_ar,
      desc_en: values.desc_en,
      instructions_ar: values.instructions_ar,
      instructions_en: values.instructions_en,
      links: links,
      attachments: files?.map((file) => ({ file: file })),
    };

    await mutate(newLecturePreparation);
  };

  return (
    <div className="">
      <h2 className="mb-5 text-xl font-semibold text-mainColor">
        {t("lecture preparation")}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleAddLecturePreparation(values);
        }}
      >
        {({ setFieldValue, values, dirty, isSubmitting }) => {
                  useEffect(() => {
                    dispatch(changeSidebarRoute(dirty && !isSubmitting));
                  }, [dirty]);
          return (
            <Form>
              <div className="flex gap-12">
                <div className="w-full">
                  <BaseInput
                    name="title_ar"
                    id="title_ar"
                    type="text"
                    className="w-full py-2 text-lg rounded-lg main_shadow text-slate-800 focus-within:outline-none"
                    placeholder={t("lecture title")}
                    label={`${t("lecture title")} (${t("arabic")})`}
                    labelProps="!font-semibold"
                  />
                </div>
                <div className="w-full">
                  <BaseInput
                    name="title_en"
                    id="title_en"
                    type="text"
                    className="w-full py-2 text-lg rounded-lg main_shadow text-slate-800 focus-within:outline-none"
                    placeholder={t("lecture title")}
                    label={`${t("lecture title")} (${t("english")})`}
                    labelProps="!font-semibold"
                  />
                </div>
              </div>
              <div className="flex gap-12 my-5">
                <div className="w-full">
                  <BaseInput
                    name="desc_ar"
                    id="desc_ar"
                    type="text"
                    className="w-full py-2 text-lg rounded-lg main_shadow text-slate-800 focus-within:outline-none"
                    placeholder={t("description")}
                    label={`${t("description")} (${t("arabic")})`}
                    labelProps="!font-semibold"
                  />
                </div>
                <div className="w-full">
                  <BaseInput
                    name="desc_en"
                    id="desc_en"
                    type="text"
                    className="w-full py-2 text-lg rounded-lg main_shadow text-slate-800 focus-within:outline-none"
                    placeholder={t("description")}
                    label={`${t("description")} (${t("english")})`}
                    labelProps="!font-semibold"
                  />
                </div>
              </div>
              <div className="flex gap-12 ">
                <div className="w-full relative">
                  <label htmlFor="address" className="font-semibold">
                    {`${t("instructions")} (${t("arabic")})`}
                  </label>
                  <textarea
                    name="instructions_ar"
                    id="instructions_ar"
                    className="w-full px-4 py-2 text-lg rounded-lg main_shadow text-slate-800 focus-within:outline-none"
                    placeholder={t("instructions")}
                    onChange={(e) => {
                      setFieldValue("instructions_ar", e.target.value);
                    }}
                  />
                  <FormikError
                    name="instructions_ar"
                    className="absolute whitespace-nowrap"
                  />
                </div>
                <div className="w-full relative">
                  <label htmlFor="address" className="font-semibold">
                    {`${t("instructions")} (${t("english")})`}
                  </label>
                  <textarea
                    name="instructions_en"
                    id="instructions_en"
                    className="w-full px-4 py-2 text-lg rounded-lg main_shadow text-slate-800 focus-within:outline-none"
                    placeholder={t("instructions")}
                    onChange={(e) => {
                      setFieldValue("instructions_en", e.target.value);
                    }}
                  />
                  <FormikError
                    name="instructions_en"
                    className="absolute whitespace-nowrap"
                  />
                </div>
              </div>

              <div className="mt-8">
                <div className="flex flex-col md:flex-row gap-x-24 lg:gap-x-28 gap-y-5">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <div>
                    <p className="mb-2 font-semibold">{t("add file")}</p>
                    <div className="cursor-pointer border-2 py-10 px-12 text-center border-dashed border-[#B1BFD0] relative bg-white">
                      <label
                        htmlFor="file-upload"
                        className="absolute top-0 bottom-0 left-0 right-0 w-full h-full cursor-pointer"
                      ></label>
                      <div className="flex items-center justify-center w-20 h-20 m-auto mb-3 rounded-full bg-mainColor">
                        <AiOutlineCloudUpload className="fill-[#E6EAEE] w-12 h-12" />
                      </div>
                      <p>{t("drag or click to add a file")}</p>
                    </div>
                  </div>
                  <div className="w-full md:w-2/4 ">
                    {files.length ? (
                      <>
                        <h2 className="mb-3 font-semibold">
                          {t("files included")}
                        </h2>
                        <div className="border-2 border-mainGray rounded-2xl shadow-lg w-full lg:w-[90%]">
                          <div className="py-3 mx-6 font-semibold">
                            {t("file name")}
                          </div>
                          <div>
                            {files.map((file: any) => (
                              <div className="flex items-center justify-between px-6 py-3 border-t-2 border-mainGray">
                                <p className="font-semibold">{file.name}</p>
                                <RiDeleteBin5Line
                                  size={30}
                                  className="cursor-pointer fill-mainRed"
                                  onClick={() => handleDeleteFile(file.name)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p className="mt-12 mb-3 font-semibold">{t("links")}</p>
                <div className="w-full mb-12 border-2 shadow-lg md:w-3/4 border-mainGray rounded-2xl">
                  <div className="py-5 mx-6">
                    <div className="flex flex-col items-end justify-between mt-2 sm:flex-row gap-x-12 gap-y-6">
                      <div className="w-full sm:w-3/4">
                        <BaseInput
                          name="link"
                          id="link"
                          type="text"
                          className="w-full py-2 text-lg rounded-lg main_shadow text-slate-800 focus-within:outline-none"
                          placeholder={t("links")}
                          labelProps="!font-semibold"
                        />
                      </div>
                      <Button
                        className="s-full sm:w-1/4"
                        action={() => {
                          const findInstructorLinks = links.some(
                            (link: any) => link.id === values.link
                          );

                          if (!values.link) {
                            return;
                          }
                          if (findInstructorLinks) {
                            return;
                          }

                          setLinks((prev: any) => [
                            {
                              value: values.link,
                            },
                            ...prev,
                          ]);

                          setFieldValue("link", "");
                        }}
                      >
                        {t("add")}
                      </Button>
                    </div>
                  </div>

                  <div>
                    {links.map((link: any, index) => (
                      <div className="flex items-center justify-between px-6 py-3 border-t-2 border-mainGray">
                        <p className="font-semibold">{link.value}</p>
                        <RiDeleteBin5Line
                          size={30}
                          className="cursor-pointer fill-mainRed"
                          onClick={() => handleDeleteLink(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-6">
                <Button type="submit" loading={isPending}>
                  {t("submit")}
                </Button>
                <Button bordered action={() => navigate(-1)}>
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

export default LecturePreparation;
