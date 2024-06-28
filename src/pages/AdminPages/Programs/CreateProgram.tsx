import { Form, Formik } from "formik";
import {
  BaseInput,
  Button,
  DotsDropDown,
  MainRadio,
  Table,
} from "../../../components";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const CreateProgram = () => {
  const [openRow, setOpenRow] = useState<number | null>(null);

  const navigate = useNavigate();

  const initialValues = {
    program_name: "",
    program_type: "",
    program_code: "",
    specialization: "",
    academic_levels: "",
    number_classes: "",
    vision: "",
    message: "",
    excellence: "",
    very_good: "",
    good: "",
    acceptable: "",
  };

  const CoursesData = [
    {
      id: 1,
      course_code: "#65654SD",
      course_name: "تحليل نظم",
      level: "الثالث",
    },
    {
      id: 2,
      course_code: "#65654SD",
      course_name: "تحليل نظم",
      level: "الثالث",
    },
  ];

  const CoursesColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("type of certificate")}</span>,
        accessorKey: "course_code",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("certificate name")}</span>,
        accessorKey: "course_name",
        cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      },
      {
        header: () => <span>{t("donor")}</span>,
        accessorKey: "level",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("")}</span>,
        accessorKey: "action",
        cell: (info) => {
          const rowIndex = info.row.index;
          const totalRows = info.table.getCoreRowModel().rows.length;
          return (
            <DotsDropDown
              instructorRoute=""
              instructorId={info.row.original.id}
              firstName="edit"
              firstIcon={<FaRegEdit size={22} className="fill-mainColor" />}
              secondName="delete"
              secondIcon={
                <RiDeleteBin5Line size={22} className="fill-mainColor" />
              }
              isOpen={openRow == info.row.original.id}
              onToggle={() => handleToggleDropDown(info.row.original.id)}
              isLastRow={rowIndex === totalRows - 1}
            />
          );
        },
      },
    ],
    [openRow]
  );

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

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
                  {t("create program")}
                </h2>
                <div className="py-5 px-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                    <BaseInput
                      name="program_name"
                      id="program_name"
                      type="text"
                      className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("program name")}
                      label={t("program name")}
                      labelProps="!font-semibold"
                    />
                    <div>
                      <p className="font-semibold mb-4">{t("program type")}</p>
                      <div className="flex gap-5">
                        <MainRadio
                          name="program_type"
                          id="program_type"
                          label={`${t("Study program")}`}
                          className="checked:accent-mainColor"
                          labelClassName="font-semibold !text-base"
                          checked={values.program_type === "Study program"}
                          onChange={() => {
                            setFieldValue("program_type", "Study program");
                          }}
                        />
                        <MainRadio
                          name="program_type"
                          id="program_type"
                          label={`${t("training program")}`}
                          className="checked:accent-mainColor"
                          labelClassName="font-semibold !text-base"
                          checked={values.program_type === "training program"}
                          onChange={() => {
                            setFieldValue("program_type", "training program");
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 my-5">
                    <BaseInput
                      name="program_code"
                      id="program_code"
                      type="text"
                      className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("program code")}
                      label={t("program code")}
                      labelProps="!font-semibold"
                    />
                    <BaseInput
                      name="specialization"
                      id="specialization"
                      type="text"
                      className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("specialization")}
                      label={t("specialization")}
                      labelProps="!font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                    <BaseInput
                      name="academic_levels"
                      id="academic_levels"
                      type="number"
                      className="w-full sm:w-1/2 text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("number academic levels")}
                      label={t("number academic levels")}
                      labelProps="!font-semibold"
                    />
                    <BaseInput
                      name="number_classes"
                      id="number_classes"
                      type="number"
                      className="w-full sm:w-1/2 text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("number classes")}
                      label={t("number classes")}
                      labelProps="!font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 my-5">
                    <div>
                      <label htmlFor="vision" className="font-semibold">
                        {t("vision")}
                      </label>
                      <textarea
                        name="vision"
                        id="vision"
                        className="w-full text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                        placeholder={t("vision")}
                        onChange={(e) => {
                          setFieldValue("vision", e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="font-semibold">
                        {t("message")}
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        className="w-full text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                        placeholder={t("message")}
                        onChange={(e) => {
                          setFieldValue("message", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-5 my-4">
                    <BaseInput
                      name="excellence"
                      id="excellence"
                      type="number"
                      className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("excellence")}
                      label={t("excellence")}
                      labelProps="!font-semibold"
                    />
                    <BaseInput
                      name="very_good"
                      id="very_good"
                      type="number"
                      className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("very good")}
                      label={t("very good")}
                      labelProps="!font-semibold"
                    />
                    <BaseInput
                      name="good"
                      id="good"
                      type="number"
                      className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("good")}
                      label={t("good")}
                      labelProps="!font-semibold"
                    />
                    <BaseInput
                      name="acceptable"
                      id="acceptable"
                      type="number"
                      className="w-full text-lg py-2 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                      placeholder={t("acceptable")}
                      label={t("acceptable")}
                      labelProps="!font-semibold"
                    />
                  </div>
                </div>

                <div className="bg-[#D7DFE7] rounded-2xl my-7 py-6">
                  <div className="flex items-center justify-between mx-5 mb-5">
                    <h2 className="text-2xl font-semibold text-centersm:text-start">
                      {t("Courses")}
                    </h2>
                    <Button action={() => navigate("/programs/courses/create")}>
                      {t("add")}
                    </Button>
                  </div>
                  <Table
                    data={CoursesData}
                    columns={CoursesColumns}
                    className="bg-mainColor"
                  />
                </div>

                <div className="mt-8 px-8 flex justify-end">
                  <Button type="submit" className="me-5">
                    {t("create program")}
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

export default CreateProgram;
