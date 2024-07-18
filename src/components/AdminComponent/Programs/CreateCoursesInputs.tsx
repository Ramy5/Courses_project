import { Form, Formik } from "formik";
import { BaseInput, Button, MainRadio } from "../../../components";
import { t } from "i18next";
import Select from "react-select";
import { useEffect, useMemo, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import selectStyle from "../../../utils/selectStyle";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";

const CreateCoursesInputs = ({
  setCoursesData,
  setStep,
  editCoursesData,
  setEditCoursesData,
  editFinishedCoursesData,
  setEditFinishedCoursesData,
}) => {
  //   const [selectedInstructor, setSelectedInstructor] = useState<any>([]);
  const [suggestedReferences, setSuggestedReferences] = useState(
    editCoursesData?.references || []
  );

  const [level, setLevel] = useState();
  const navigate = useNavigate();

  const initialValues = {
    id: editCoursesData?.id || editFinishedCoursesData?.id || 0,
    course_name:
      editCoursesData?.course_name ||
      editFinishedCoursesData?.course_name ||
      "",
    course_teachers:
      editCoursesData?.course_teachers ||
      editFinishedCoursesData?.course_teachers ||
      [],
    course_code:
      editCoursesData?.course_code || editFinishedCoursesData?.course_code || 0,
    level: editCoursesData?.level || editFinishedCoursesData?.level || "",
    course_objectives:
      editCoursesData?.course_objectives ||
      editFinishedCoursesData?.course_objectives ||
      "",
    information_concepts:
      editCoursesData?.information_concepts ||
      editFinishedCoursesData?.information_concepts ||
      "",
    mental_skills:
      editCoursesData?.mental_skills ||
      editFinishedCoursesData?.mental_skills ||
      "",
    general_skills:
      editCoursesData?.general_skills ||
      editFinishedCoursesData?.general_skills ||
      "",
    professional_skills:
      editCoursesData?.professional_skills ||
      editFinishedCoursesData?.professional_skills ||
      "",
    teaching_learning_methods:
      editCoursesData?.teaching_learning_methods ||
      editFinishedCoursesData?.teaching_learning_methods ||
      "Lectures",
    lectures:
      editCoursesData?.lectures || editFinishedCoursesData?.lectures || 0,
    practical_training:
      editCoursesData?.practical_training ||
      editFinishedCoursesData?.practical_training ||
      0,
    applications:
      editCoursesData?.applications ||
      editFinishedCoursesData?.applications ||
      0,
    research:
      editCoursesData?.research || editFinishedCoursesData?.research || 0,
    case_studies:
      editCoursesData?.case_studies ||
      editFinishedCoursesData?.case_studies ||
      0,
    project: editCoursesData?.project || editFinishedCoursesData?.project || 0,
    instructors_name:
      editCoursesData?.instructors_name ||
      editFinishedCoursesData?.instructors_name ||
      0,
    instructors_id:
      editCoursesData?.instructors_id ||
      editFinishedCoursesData?.instructors_id ||
      0,
  };

  // const instructorsName = [
  //   { id: 1, value: "محمد احمد", label: "محمد احمد" },
  //   { id: 2, value: "محمود سالم", label: "محمود سالم" },
  //   { id: 3, value: "احمد محمد", label: "احمد محمد" },
  //   { id: 4, value: "احمد محمود", label: "احمد محمود" },
  //   { id: 5, value: "سالم احمد", label: "سالم احمد" },
  //   { id: 6, value: "سالم محمد", label: "سالم محمد" },
  //   { id: 7, value: "محمد محمود", label: "محمد محمود" },
  // ];

  const fetchTeacherData = async () => {
    const response = await customFetch(`/allTeachers`);
    return response;
  };

  const { data } = useQuery({
    queryKey: ["teacher_data"],
    queryFn: fetchTeacherData,
  });

  const teachersData = data && data?.data?.data.teachers;

  const teachersOption = teachersData?.map((teacher) => ({
    id: teacher.id,
    value: teacher.full_name,
    label: teacher.full_name,
  }));

  //   const courseTeachers = editCoursesData?.course_teachers?.map(
  //     (teacher) => teacher
  //   );

  //   const instructorsNameInclude = instructorsName?.filter((instructor) =>
  //     courseTeachers?.includes(instructor.id)
  //   );

  //   const editInstructors =
  //     editCoursesData && editCoursesData
  //       ? instructorsNameInclude
  //       : selectedInstructor;

  const levelsOption = [
    { id: 1, value: 1, label: 1 },
    { id: 2, value: 2, label: 2 },
    { id: 3, value: 3, label: 3 },
    { id: 4, value: 4, label: 4 },
  ];

  // const handleDeleteInstructorName = (instructorId: string) => {
  //   const instructorNameFilter = editInstructors?.filter(
  //     (instructor: any) => Number(instructor.id) !== Number(instructorId)
  //   );
  //   setSelectedInstructor(instructorNameFilter);
  // };

  const suggestedReferencesColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("reference title")}</span>,
        accessorKey: "reference_title",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("author")}</span>,
        accessorKey: "author",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("date")}</span>,
        accessorKey: "date",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("link")}</span>,
        accessorKey: "link",
        cell: (info) => info.getValue() || "---",
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "action",
        cell: (info) => {
          return (
            <RiDeleteBin5Line
              onClick={() => {
                const suggestedReferencesFilter = suggestedReferences?.filter(
                  (data: any) => {
                    return data.id !== info.row.original.id;
                  }
                );
                setSuggestedReferences(suggestedReferencesFilter);
              }}
              size={22}
              className="m-auto cursor-pointer fill-mainRed"
            />
          );
        },
      },
    ],
    [suggestedReferences]
  );

  const table = useReactTable({
    data: suggestedReferences,
    columns: suggestedReferencesColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    const editLevel = {
      id: editCoursesData?.level || "",
      value: editCoursesData?.level || "",
      label: editCoursesData?.level || `${t("level")}`,
    };
    setLevel(editLevel);
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#E6EAEE",
      borderRadius: "10px",
      boxShadow: "0px 4px 4px 0px #00000040",
      border: "0",
      minHeight: "44px",
      cursor: "pointer",
      padding: "6px 8px",
    }),
    option: (provided, state) => {
      let backgroundColor = "";
      let color = "";
      if (state.isSelected) {
        backgroundColor = "#393D94";
        color = "white";
      } else if (state.isFocused) {
        backgroundColor = "white";
        color = "#000";
      }
      return {
        ...provided,
        backgroundColor,
        color,
        fontWeight: "500",
      };
    },
    multiValue: (provided) => ({
      ...provided,
      color: "black",
      fontWeight: "500",
      backgroundColor: "#d3d2d2d8",
      borderRadius: "6px",
      padding: "0.5px 4px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#393d94dc",
      fontWeight: "600",
      // backgroundColor: "red",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#393D94",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#D42828",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "10px",
      boxShadow: "0px 4px 4px 0px #00000040",
      backgroundColor: "#E6EAEE",
    }),
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema=""
        onSubmit={(values) => {
          //   setCoursesData(values);
        }}
      >
        {({ setFieldValue, values, resetForm }) => {
          return (
            <Form>
              <div className="pb-8 bg-white rounded-3xl">
                <h2 className="py-4 px-7 !m-0 border-b-4 border-[#E6EAEE] font-semibold text-xl">
                  {t("create program")} /{" "}
                  <span>{t("edit course description")}</span>
                </h2>
                <div className="py-5 px-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                    <div className="grid grid-cols-1 gap-x-12 gap-y-5">
                      <BaseInput
                        name="course_name"
                        id="course_name"
                        type="text"
                        className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                        placeholder={t("course name")}
                        label={t("course name")}
                        labelProps="!font-semibold"
                        disabled={Object.keys(editFinishedCoursesData).length !== 0}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <BaseInput
                          name="course_code"
                          id="course_code"
                          type="number"
                          className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                          placeholder={t("course code")}
                          label={t("course code")}
                          labelProps="!font-semibold"
                          disabled={Object.keys(editFinishedCoursesData).length !== 0}
                        />
                        <div>
                          <label htmlFor="level" className="font-semibold">
                            {t("level")}
                          </label>
                          <div className="w-full mt-1">
                            <Select
                              id="level"
                              name="level"
                              value={level}
                              options={levelsOption}
                              onChange={(option) => {
                                setFieldValue("level", option.value);
                                setLevel(option);
                              }}
                              placeholder={t("level")}
                              styles={selectStyle}
                              isDisabled={Object.keys(editFinishedCoursesData).length !== 0}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <label htmlFor="vision" className="font-semibold">
                        {t("course objectives")}
                      </label>
                      <textarea
                        name="course_objectives"
                        id="course_objectives"
                        className="w-full h-full mt-1  text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                        placeholder={t("course objectives")}
                        value={values.course_objectives}
                        onChange={(e) => {
                          setFieldValue("course_objectives", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 my-5 md:grid-cols-2 gap-x-12 gap-y-5">
                    <div>
                      <label
                        htmlFor="information_concepts"
                        className="font-semibold"
                      >
                        {t("information and concepts")}
                      </label>
                      <textarea
                        name="information_concepts"
                        id="information_concepts"
                        className="w-full h-36 text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                        placeholder={t("information and concepts")}
                        value={values.information_concepts}
                        onChange={(e) => {
                          setFieldValue("information_concepts", e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="mental_skills" className="font-semibold">
                        {t("mental skills")}
                      </label>
                      <textarea
                        name="mental_skills"
                        id="mental_skills"
                        className="w-full h-36 text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                        placeholder={t("mental skills")}
                        value={values.mental_skills}
                        onChange={(e) => {
                          setFieldValue("mental_skills", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 my-5 md:grid-cols-2 gap-x-12 gap-y-5">
                    <div>
                      <label
                        htmlFor="professional_skills"
                        className="font-semibold"
                      >
                        {t("professional skills")}
                      </label>
                      <textarea
                        name="professional_skills"
                        id="professional_skills"
                        className="w-full h-36 text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                        placeholder={t("professional skills")}
                        value={values.professional_skills}
                        onChange={(e) => {
                          setFieldValue("professional_skills", e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="general_skills" className="font-semibold">
                        {t("general skills")}
                      </label>
                      <textarea
                        name="general_skills"
                        id="general_skills"
                        className="w-full h-36 text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                        placeholder={t("general skills")}
                        value={values.general_skills}
                        onChange={(e) => {
                          setFieldValue("general_skills", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 font-semibold">
                      {t("teaching and learning methods")}
                    </p>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:w-2/3">
                      <MainRadio
                        name="lectures"
                        id="lectures"
                        label={`${t("lectures")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold !text-base"
                        checked={values.lectures === 1 ? 1 : 0}
                        onChange={() => {
                          setFieldValue(
                            "lectures",
                            values.lectures === 1 ? 0 : 1
                          );
                        }}
                      />
                      <MainRadio
                        name="practical_training"
                        id="practical_training"
                        label={`${t("practical/laboratory training")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold !text-base"
                        checked={values.practical_training === 1 ? 1 : 0}
                        onChange={() => {
                          setFieldValue(
                            "practical_training",
                            values.practical_training === 1 ? 0 : 1
                          );
                        }}
                      />
                      <MainRadio
                        name="applications"
                        id="applications"
                        label={`${t("applications")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold !text-base"
                        checked={values.applications === 1 ? 1 : 0}
                        onChange={() => {
                          setFieldValue(
                            "applications",
                            values.applications === 1 ? 0 : 1
                          );
                        }}
                      />
                      <MainRadio
                        name="research"
                        id="research"
                        label={`${t("research")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold !text-base"
                        checked={values.research === 1 ? 1 : 0}
                        onChange={() => {
                          setFieldValue(
                            "research",
                            values.research === 1 ? 0 : 1
                          );
                        }}
                      />
                      <MainRadio
                        name="case_studies"
                        id="case_studies"
                        label={`${t("case studies")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold !text-base"
                        checked={values.case_studies === 1 ? 1 : 0}
                        onChange={() => {
                          setFieldValue(
                            "case_studies",
                            values.case_studies === 1 ? 0 : 1
                          );
                        }}
                      />
                      <MainRadio
                        name="project"
                        id="project"
                        label={`${t("project")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold !text-base"
                        checked={values.project === 1 ? 1 : 0}
                        onChange={() => {
                          setFieldValue(
                            "project",
                            values.project === 1 ? 0 : 1
                          );
                        }}
                      />
                    </div>
                  </div>

                  {/* <div className="w-full my-12 border-2 shadow-lg md:w-3/4 border-mainGray rounded-2xl">
                    <div className="py-5 mx-6">
                      <label
                        htmlFor="instructors_name"
                        className="font-semibold"
                      >
                        {t("instructor name")}
                      </label>
                      <div className="flex flex-col items-center justify-between mt-2 sm:flex-row gap-x-12 gap-y-6">
                        <div className="w-full sm:w-3/4">
                          <Select
                            id="instructors_name"
                            name="instructors_name"
                            // isMulti
                            // closeMenuOnSelect={false}
                            onChange={(option) => {
                              setFieldValue("instructors_name", option.value);
                              setFieldValue("instructors_id", option.id);
                            }}
                            options={instructorsName}
                            placeholder={t("instructor name")}
                            styles={selectStyle}
                          />
                        </div>
                        <Button
                          className="s-full sm:w-1/4"
                          action={() => {
                            const findInstructorName = selectedInstructor?.some(
                              (instructor: any) =>
                                instructor.id === values.instructors_id
                            );

                            if (!values.instructors_id) {
                              
                              return;
                            }
                            if (findInstructorName) {
                              
                              return;
                            }

                            setSelectedInstructor((prev: any) => [
                              {
                                id: values.instructors_id,
                                value: values.instructors_name,
                              },
                              ...prev,
                            ]);

                            // setSelectedInstructor((prev: any) => {
                            //   const instructorExists = prev.some(
                            //     (instructor: any) =>
                            //       instructor.id === values.instructors_id
                            //   );

                            //   if (instructorExists) {
                            //     // Edit the existing instructor
                            //     return prev.map((instructor: any) =>
                            //       instructor.id === values.instructors_id
                            //         ? {
                            //             ...instructor,
                            //             value: values.instructors_name,
                            //           }
                            //         : instructor
                            //     );
                            //   } else {
                            //     // Add a new instructor
                            //     return [
                            //       {
                            //         id: values.instructors_id,
                            //         value: values.instructors_name,
                            //       },
                            //       ...prev,
                            //     ];
                            //   }
                            // });
                          }}
                        >
                          {t("add")}
                        </Button>
                      </div>
                    </div>

                    <div>
                      {selectedInstructor?.map((instructor: string) => (
                        <div className="flex items-center justify-between px-6 py-3 border-t-2 border-mainGray">
                          <p className="font-semibold">{instructor.value}</p>
                          <RiDeleteBin5Line
                            size={30}
                            className="cursor-pointer fill-mainRed"
                            onClick={() =>
                              handleDeleteInstructorName(instructor.id)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div> */}

                  <div className="w-full my-12 md:w-3/4">
                    <label htmlFor="instructors_name" className="font-semibold">
                      {t("instructor name")}
                    </label>
                    <div className="flex flex-col items-center justify-between mt-2 sm:flex-row gap-x-12 gap-y-6">
                      <div className="w-full sm:w-3/4">
                        <Select
                          id="course_teachers"
                          name="course_teachers"
                          isMulti
                          className="basic-multi-select"
                          classNamePrefix="select"
                          value={teachersOption?.filter((option) =>
                            values.course_teachers.includes(option.id)
                          )}
                          onChange={(option) => {
                            setFieldValue(
                              "course_teachers",
                              option?.map((option) => option.id)
                            );
                          }}
                          options={teachersOption}
                          placeholder={t("instructor name")}
                          styles={customStyles}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#EEEDED]">
                  <h2 className="p-6 text-2xl font-medium">
                    {t("suggested references")}
                  </h2>
                  <div className="overflow-auto">
                    <table className="min-w-full text-center">
                      <thead className="text-white bg-mainColor">
                        {table?.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id} className="w-full px-2 py-4">
                            {headerGroup.headers.map((header) => (
                              <th
                                key={header.id}
                                className="px-6 py-4 font-medium text-md"
                              >
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody>
                        <tr className="text-center border-b-2 border-mainColor">
                          <td className="p-4">
                            <BaseInput
                              name="reference_title"
                              id="reference_title"
                              type="text"
                              className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                              placeholder={t("")}
                            />
                          </td>
                          <td className="p-4">
                            <BaseInput
                              name="author"
                              id="author"
                              type="text"
                              className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                              placeholder={t("")}
                            />
                          </td>
                          <td className="p-4">
                            <BaseInput
                              name="date"
                              id="date"
                              type="date"
                              className="w-full text-lg py-[3px] !border-2 !border-black rounded-lg"
                              placeholder={t("")}
                            />
                          </td>
                          <td className="p-4">
                            <BaseInput
                              name="link"
                              id="link"
                              type="text"
                              className="w-full text-lg py-1 !border-2 !border-black rounded-lg text-center"
                              placeholder={t("")}
                            />
                          </td>
                          <td className="p-4">
                            <Button
                              type="button"
                              action={() => {
                                if (
                                  !values.reference_title &&
                                  !values.author &&
                                  !values.date &&
                                  !values.link
                                ) {
                                  return;
                                }
                                setSuggestedReferences((prev: any) => [
                                  {
                                    id: suggestedReferences.length + 1,
                                    reference_title: values.reference_title,
                                    author: values.author,
                                    date: values.date,
                                    link: values.link,
                                  },
                                  ...prev,
                                ]);

                                setFieldValue("reference_title", "");
                                setFieldValue("author", "");
                                setFieldValue("date", "");
                                setFieldValue("link", "");
                              }}
                            >
                              {t("add")}
                            </Button>
                          </td>
                        </tr>
                        {table.getRowModel().rows.map((row) => {
                          return (
                            <tr
                              key={row.id}
                              className="text-center border-b-2 border-mainColor"
                            >
                              {row.getVisibleCells().map((cell, i) => (
                                <td
                                  className="whitespace-nowrap px-6 py-4 text-md font-medium !text-[#292D32]"
                                  key={cell.id}
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end px-8 mt-8">
                  <Button
                    type="button"
                    className="me-5"
                    action={() => {
                      setCoursesData((prev) => {
                        const existingIndex = prev.findIndex(
                          (course) => course.id === values.id
                        );

                        if (existingIndex !== -1) {
                          // Update existing data
                          const updatedCourses = [...prev];
                          updatedCourses[existingIndex] = {
                            ...values,
                            references: suggestedReferences,
                            id: values.id,
                          };
                          return updatedCourses;
                        } else {
                          // Add new data
                          return [
                            ...prev,
                            {
                              ...values,
                              references: suggestedReferences,
                              id: prev.length + 1,
                            },
                          ];
                        }
                      });

                      setEditCoursesData([]);

                      resetForm();

                      setStep(1);
                    }}
                  >
                    {t("submit")}
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#E6EAEE] text-mainColor"
                    action={() => {
                      if (Object.keys(editFinishedCoursesData).length !== 0) {
                        navigate(
                          `/programs/programInfo/${editFinishedCoursesData?.id}`
                        );
                      } else {
                        setStep(1);
                      }
                    }}
                  >
                    {t("cancel")}
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateCoursesInputs;
