import { Form, Formik, useFormikContext } from "formik";
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

const CreateProgramInputs = ({
  setStep,
  coursesData,
  setEditCoursesData,
  setCoursesData,
  isPending,
}: any) => {
  console.log("🚀 ~ coursesData:", coursesData);
  const [openRow, setOpenRow] = useState<number | null>(null);

  const { values, setFieldValue } = useFormikContext();
  console.log("🚀 ~ CreateProgramInputs ~ values:", values);

  // const initialValues = {
  //   program_name: "",
  //   program_type: "",
  //   program_code: 0,
  //   specialization: "",
  //   academic_levels: "",
  //   number_classes: "",
  //   vision: "",
  //   message: "",
  //   excellence: "",
  //   very_good: "",
  //   good: "",
  //   acceptable: "",
  // };

  // const validationSchema = Yup.object({
  //   program_name: Yup.string().required(t("Required")),
  //   program_type: Yup.string().required(t("Required")),
  //   program_code: Yup.string().required(t("Required")),
  //   specialization: Yup.string().required(t("Required")),
  //   academic_levels: Yup.number().required(t("Required")),
  //   number_classes: Yup.number().required(t("Required")),
  //   vision: Yup.string().required(t("Required")),
  //   message: Yup.string().required(t("Required")),
  //   excellence: Yup.number().required(t("Required")),
  //   very_good: Yup.number().required(t("Required")),
  //   good: Yup.number().required(t("Required")),
  //   acceptable: Yup.number().required(t("Required")),
  // });

  // const CoursesData = [
  //   {
  //     id: 1,
  //     course_code: "#65654SD",
  //     course_name: "تحليل نظم",
  //     level: "الثالث",
  //   },
  //   {
  //     id: 2,
  //     course_code: "#65654SD",
  //     course_name: "تحليل نظم",
  //     level: "الثالث",
  //   },
  // ];

  const CoursesColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: () => <span>{t("course code")}</span>,
        accessorKey: "course_code",
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{t("course name")}</span>,
        accessorKey: "course_name",
        cell: (info) => <span>{t(`${info.getValue()}`)}</span>,
      },
      {
        header: () => <span>{t("level")}</span>,
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
                <RiDeleteBin5Line size={22} className="fill-mainRed" />
              }
              isOpen={openRow == info.row.original.id}
              onToggle={() => {
                handleToggleDropDown(info.row.original.id);
              }}
              onFirstClick={() => {
                setEditCoursesData(coursesData[info.row.index]);
                setStep(2);
              }}
              onSecondClick={() => {
                const fliterCoursesData = coursesData?.filter(
                  (course) => course.id !== info.row.original.id
                );
                setCoursesData(fliterCoursesData);
              }}
              isLastRow={rowIndex === totalRows - 1}
            />
          );
        },
      },
    ],
    [openRow]
  );

  const handleToggleDropDown = (index: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == index ? null : index));
  };

  return (
    <div>
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
                  checked={values.program_type === "educational"}
                  onChange={() => {
                    setFieldValue("program_type", "educational");
                  }}
                />
                <MainRadio
                  name="program_type"
                  id="program_type"
                  label={`${t("training program")}`}
                  className="checked:accent-mainColor"
                  labelClassName="font-semibold !text-base"
                  checked={values.program_type === "intern"}
                  onChange={() => {
                    setFieldValue("program_type", "intern");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 my-5">
            <BaseInput
              name="program_code"
              id="program_code"
              type="number"
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
                value={values.vision}
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
                value={values.message}
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
          <div
            className={`${
              coursesData?.length !== 0 ? "mb-6" : " mb-0"
            } flex items-center justify-between mx-5`}
          >
            <h2 className="text-2xl font-semibold text-centersm:text-start">
              {t("Courses")}
            </h2>
            <Button action={() => setStep(2)}>{t("add")}</Button>
          </div>
          {coursesData && coursesData.length !== 0 ? (
            <Table
              data={(coursesData && coursesData) || []}
              columns={CoursesColumns}
              className="bg-mainColor"
            />
          ) : (
            ""
          )}
        </div>

        <div className="mt-8 px-8 flex justify-end">
          <Button type="submit" className="me-5" loading={isPending}>
            {t("create program")}
          </Button>
          <Button type="button" className="bg-[#E6EAEE] text-mainColor">
            {t("cancel")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProgramInputs;
