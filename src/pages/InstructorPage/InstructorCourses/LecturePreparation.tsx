import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { BaseInput, Button } from "../../../components";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const LecturePreparation = () => {
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  const initialValues = {
    lecture_title: "",
    description: "",
    instructions: "",
    link: "",
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

  const handleDeleteLink = (linkID: string) => {
    const instructorFileFilter = links.filter(
      (link: any) => link.id !== linkID
    );
    setLinks(instructorFileFilter);
  };

  return (
    <div className="">
      <h2 className="mb-5 text-xl font-semibold text-mainColor">
        {t("lecture preparation")}
      </h2>
      <Formik initialValues={initialValues} onSubmit={(values) => {}}>
        {({ setFieldValue, values }) => {
          return (
            <Form>
              <div>
                <BaseInput
                  name="lecture_title"
                  id="lecture_title"
                  type="text"
                  className="w-full py-2 text-lg rounded-lg main_shadow text-slate-800 focus-within:outline-none"
                  placeholder={t("lecture title")}
                  label={t("lecture title")}
                  labelProps="!font-semibold"
                />
              </div>
              <div className="my-5">
                <BaseInput
                  name="description"
                  id="description"
                  type="text"
                  className="w-full py-2 text-lg rounded-lg main_shadow text-slate-800 focus-within:outline-none"
                  placeholder={t("description")}
                  label={t("description")}
                  labelProps="!font-semibold"
                />
              </div>
              <div>
                <label htmlFor="address" className="font-semibold">
                  {t("instructions")}
                </label>
                <textarea
                  name="instructions"
                  id="instructions"
                  className="w-full px-4 py-2 text-lg rounded-lg main_shadow text-slate-800 focus-within:outline-none"
                  placeholder={t("instructions")}
                  onChange={(e) => {
                    setFieldValue("instructions", e.target.value);
                  }}
                />
              </div>

              <div>
                <h2 className="mb-3 font-semibold">{t("CV file")}</h2>
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
                            {t("instructor name")}
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
                          //   label={t("links")}
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
                              id: crypto.randomUUID(),
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
                    {links.map((link: any) => (
                      <div className="flex items-center justify-between px-6 py-3 border-t-2 border-mainGray">
                        <p className="font-semibold">{link.value}</p>
                        <RiDeleteBin5Line
                          size={30}
                          className="cursor-pointer fill-mainRed"
                          onClick={() => handleDeleteLink(link.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-6">
                <Button bordered action={() => navigate(-1)}>
                  {t("cancel")}
                </Button>
                <Button type="submit">{t("submit")}</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LecturePreparation;
