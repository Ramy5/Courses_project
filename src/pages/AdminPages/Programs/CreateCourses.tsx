import { Form, Formik } from "formik";
import { BaseInput, Button, MainRadio } from "../../../components";
import { t } from "i18next";
import Select from "react-select";
import { useMemo, useState } from "react";
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

const CreateCourses = () => {
  const [selectedInstructor, setSelectedInstructor] = useState<any>([]);
  let [dataSource, setDataSource] = useState<any>([]);

  const initialValues = {
    course_name: "",
    course_code: "",
    level: "",
    course_objectives: "",
    information_concepts: "",
    mental_skills: "",
    general_skills: "",
    teaching_learning_methods: "",
    lectures: "",
    practical_training: "",
    applications: "",
    research: "",
    case_studies: "",
    project: "",
    instructors_name: "",
    instructors_id: "",
    reference_title: "",
    author: "",
    date: "",
    link: "",
  };

  const instructorsName = [
    { id: "1", value: "محمد احمد", label: "محمد احمد" },
    { id: "2", value: "محمود سالم", label: "محمود سالم" },
    { id: "3", value: "احمد محمد", label: "احمد محمد" },
    { id: "4", value: "سالم محمود", label: "سالم محمود" },
  ];

  const levelsOption = [
    { id: "1", value: 1, label: 1 },
    { id: "2", value: 2, label: 2 },
    { id: "3", value: 3, label: 3 },
    { id: "4", value: 4, label: 4 },
  ];

  const handleDeleteInstructorName = (instructorId: string) => {
    const instructorNameFilter = selectedInstructor.filter(
      (instructor: any) => Number(instructor.id) !== Number(instructorId)
    );
    setSelectedInstructor(instructorNameFilter);
  };

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
                const dataSourceFilter = dataSource?.filter((data: any) => {
                  return data.id !== info.row.original.id;
                });
                setDataSource(dataSourceFilter);
              }}
              size={22}
              className="fill-mainRed m-auto cursor-pointer"
            />
          );
        },
      },
    ],
    [dataSource]
  );

  const table = useReactTable({
    data: dataSource,
    columns: suggestedReferencesColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema=""
        onSubmit={(values) => {
          console.log("🚀 ~ CreateProgram ~ values:", values);
        }}
      >
        {({ setFieldValue, values }) => {
          return (
            <Form>
              <div className="bg-white rounded-3xl pb-8">
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
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <BaseInput
                          name="course_code"
                          id="course_code"
                          type="text"
                          className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                          placeholder={t("course code")}
                          label={t("course code")}
                          labelProps="!font-semibold"
                        />
                        <div>
                          <label htmlFor="level" className="font-semibold">
                            {t("level")}
                          </label>
                          <div className="w-full mt-1">
                            <Select
                              id="level"
                              name="level"
                              onChange={(option) => {
                                setFieldValue("level", option.value);
                              }}
                              options={levelsOption}
                              placeholder={t("level")}
                              styles={selectStyle}
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
                        onChange={(e) => {
                          setFieldValue("course_objectives", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 my-5">
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
                        onChange={(e) => {
                          setFieldValue("mental_skills", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 my-5">
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
                        onChange={(e) => {
                          setFieldValue("general_skills", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold mb-4">
                      {t("teaching and learning methods")}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full lg:w-2/3">
                      <MainRadio
                        name="lectures"
                        id="lectures"
                        label={`${t("lectures")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold !text-base"
                        checked={values.lectures === "lectures"}
                        onChange={() => {
                          setFieldValue("lectures", "lectures");
                        }}
                      />
                      <MainRadio
                        name="practical_training"
                        id="practical_training"
                        label={`${t("practical/laboratory training")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold !text-base"
                        checked={
                          values.practical_training ===
                          "practical/laboratory training"
                        }
                        onChange={() => {
                          setFieldValue(
                            "practical_training",
                            "practical/laboratory training"
                          );
                        }}
                      />
                      <MainRadio
                        name="applications"
                        id="applications"
                        label={`${t("applications")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold !text-base"
                        checked={values.applications === "applications"}
                        onChange={() => {
                          setFieldValue("applications", "applications");
                        }}
                      />
                      <MainRadio
                        name="research"
                        id="research"
                        label={`${t("research")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold !text-base"
                        checked={values.research === "research"}
                        onChange={() => {
                          setFieldValue("research", "research");
                        }}
                      />
                      <MainRadio
                        name="case_studies"
                        id="case_studies"
                        label={`${t("case studies")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold !text-base"
                        checked={values.case_studies === "case studies"}
                        onChange={() => {
                          setFieldValue("case_studies", "case studies");
                        }}
                      />
                      <MainRadio
                        name="project"
                        id="project"
                        label={`${t("project")}`}
                        className="checked:accent-mainColor"
                        labelClassName="font-semibold !text-base"
                        checked={values.project === "project"}
                        onChange={() => {
                          setFieldValue("project", "project");
                        }}
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-3/4 border-2 border-mainGray rounded-2xl shadow-lg my-12">
                    <div className="mx-6 py-5">
                      <label
                        htmlFor="instructors_name"
                        className="font-semibold"
                      >
                        {t("instructor name")}
                      </label>
                      <div className="mt-2 flex items-center flex-col sm:flex-row justify-between gap-x-12 gap-y-6">
                        <div className="w-full sm:w-3/4">
                          <Select
                            id="instructors_name"
                            name="instructors_name"
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
                            const findInstructorName = selectedInstructor.some(
                              (instructor: any) =>
                                instructor.id === values.instructors_id
                            );

                            if (!values.instructors_id) {
                              console.log(
                                "🚀 ~ CreateCourses ~ error",
                                "the instructor must be chosen first"
                              );
                              return;
                            }
                            if (findInstructorName) {
                              console.log(
                                "🚀 ~ CreateCourses ~ error",
                                "this instructor has been added"
                              );
                              return;
                            }

                            setSelectedInstructor((prev: any) => [
                              {
                                id: values.instructors_id,
                                value: values.instructors_name,
                              },
                              ...prev,
                            ]);
                          }}
                        >
                          {t("add")}
                        </Button>
                      </div>
                    </div>

                    <div>
                      {selectedInstructor.map((instructor: string) => (
                        <div className="flex justify-between items-center border-t-2 border-mainGray px-6 py-3">
                          <p className="font-semibold">{instructor.value}</p>
                          <RiDeleteBin5Line
                            size={30}
                            className="fill-mainRed cursor-pointer"
                            onClick={() =>
                              handleDeleteInstructorName(instructor.id)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#EEEDED]">
                  <h2 className="text-2xl font-medium p-6">{t("Courses")}</h2>
                  <div className="overflow-auto">
                    <table className="min-w-full text-center">
                      <thead className="bg-mainColor text-white">
                        {table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id} className="py-4 px-2 w-full">
                            {headerGroup.headers.map((header) => (
                              <th
                                key={header.id}
                                className=" px-6 py-4 text-md font-medium"
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
                        <tr className="border-b-2 border-mainColor text-center">
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
                                  console.log(
                                    "🚀 ~ CreateCourses ~ error",
                                    "data must be entered first"
                                  );
                                  return;
                                }
                                setDataSource((prev: any) => [
                                  {
                                    id: crypto.randomUUID(),
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

                <div className="mt-8 px-8 flex justify-end">
                  <Button type="submit" className="me-5">
                    {t("submit")}
                  </Button>
                  <Button type="button" className="bg-[#E6EAEE] text-mainColor">
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

export default CreateCourses;
