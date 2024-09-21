import { useFormikContext } from "formik";
import {
  BaseInput,
  Button,
  DotsDropDown,
  MainRadio,
  Table,
} from "../../../components";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FormikError } from "../../UI/FormikError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { toast } from "react-toastify";
import BaseSelect from "../../UI/BaseSelect";

const postProgramCode = async (programCode: any) => {
  const data = customFetch.post("/searchProgramsCode", programCode);
  return data;
};

const CreateProgramInputs = ({
  setStep,
  coursesData,
  setEditCoursesData,
  setCoursesData,
  isPending,
  editFinishedProgramData,
}: any) => {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [excellenceSelect, setExcellenceSelect] = useState(null);
  const [veryGoodSelect, setVeryGoodSelect] = useState(null);
  const [goodSelect, setGoodSelect] = useState(null);
  const [acceptableSelect, setAcceptableSelect] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { values, setFieldValue } = useFormikContext();

  const { mutate, error } = useMutation({
    mutationKey: ["add-instructor-contact"],
    mutationFn: postProgramCode,
    onSuccess: (data) => {
      queryClient.invalidateQueries("isProgram_code");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    },
  });

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
              isOpen={openRow == info.row.index}
              onToggle={() => {
                handleToggleDropDown(info.row.index);
              }}
              onFirstClick={() => {
                setEditCoursesData(coursesData[info.row.index]);
                setStep(2);
              }}
              onSecondClick={() => {
                const fliterCoursesData = coursesData?.filter(
                  (course) =>
                    course.course_code !== info.row.original.course_code
                );
                setCoursesData(fliterCoursesData);
              }}
              isLastRow={rowIndex === totalRows - 1}
            />
          );
        },
      },
    ],
    [openRow, coursesData]
  );

  const handleToggleDropDown = (index: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == index ? null : index));
  };

  const excellenceOption = [
    {
      id: 1,
      value: 90,
      label: 90,
    },
    {
      id: 2,
      value: 95,
      label: 95,
    },
  ];

  const veryGoodOption = [
    {
      id: 1,
      value: 80,
      label: 80,
    },
    {
      id: 2,
      value: 85,
      label: 85,
    },
  ];

  const goodOption = [
    {
      id: 1,
      value: 70,
      label: 70,
    },
    {
      id: 2,
      value: 75,
      label: 75,
    },
  ];

  const acceptableOption = [
    {
      id: 1,
      value: 50,
      label: 50,
    },
    {
      id: 2,
      value: 60,
      label: 60,
    },
  ];

  useEffect(() => {
    if (editFinishedProgramData) {
      const editExcellence = {
        id: editFinishedProgramData?.excellence || "",
        label: editFinishedProgramData?.excellence || "",
        value: editFinishedProgramData?.excellence || "",
      };

      const editVeryGood = {
        id: editFinishedProgramData?.very_good || "",
        label: editFinishedProgramData?.very_good || "",
        value: editFinishedProgramData?.very_good || "",
      };

      const editGood = {
        id: editFinishedProgramData?.good || "",
        label: editFinishedProgramData?.good || "",
        value: editFinishedProgramData?.good || "",
      };

      const editAcceptable = {
        id: editFinishedProgramData?.acceptable || "",
        label: editFinishedProgramData?.acceptable || "",
        value: editFinishedProgramData?.acceptable || "",
      };

      setExcellenceSelect(editExcellence);
      setVeryGoodSelect(editVeryGood);
      setGoodSelect(editGood);
      setAcceptableSelect(editAcceptable);
    }
  }, [editFinishedProgramData]);

  return (
    <div>
      <div className="bg-white rounded-3xl pb-8">
        <h2 className="py-4 px-7 !m-0 border-b-4 border-lightGray font-semibold text-xl">
          {t("create program")}
        </h2>
        <div className="py-5 px-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            <BaseInput
              name="program_name"
              id="program_name"
              type="text"
              className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("program name")}
              label={t("program name")}
              labelProps="!font-semibold"
            />
            <div className="relative">
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
              <FormikError
                name="program_type"
                className="absolute whitespace-nowrap"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 my-5">
            <div>
              <BaseInput
                name="program_code"
                id="program_code"
                type="text"
                className="w-full text-lg py-2 mb-1 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("program code")}
                label={t("program code")}
                labelProps="!font-semibold"
                onChange={(e) => mutate({ program_code: e.target.value })}
              />
              {error?.response?.data?.message === "هذا الكود موجود بالفعل" && (
                <span className="text-mainRed">
                  {error?.response?.data?.message}
                </span>
              )}
            </div>
            <BaseInput
              name="specialization"
              id="specialization"
              type="text"
              className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
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
              className="w-full sm:w-1/2 text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("number academic levels")}
              label={t("number academic levels")}
              labelProps="!font-semibold"
            />
            <BaseInput
              name="number_classes"
              id="number_classes"
              type="number"
              className="w-full sm:w-1/2 text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
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
                className="w-full text-lg py-2 px-4 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("vision")}
                value={values.vision}
                onChange={(e) => {
                  setFieldValue("vision", e.target.value);
                }}
              />
              <FormikError name="vision" className="whitespace-nowrap" />
            </div>
            <div>
              <label htmlFor="message" className="font-semibold">
                {t("message")}
              </label>
              <textarea
                name="message"
                id="message"
                className="w-full text-lg py-2 px-4 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                placeholder={t("message")}
                value={values.message}
                onChange={(e) => {
                  setFieldValue("message", e.target.value);
                }}
              />
              <FormikError name="message" className="whitespace-nowrap" />
            </div>
          </div>

          <div className="border-[1.59px] mt-8 mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-5 my-4">
            <div className="w-full">
              <BaseSelect
                id="excellence"
                name="excellence"
                placeholder={t("excellence")}
                label={t("excellence")}
                options={excellenceOption}
                value={excellenceSelect}
                onChange={(e) => {
                  setFieldValue("excellence", e.id);
                  setFieldValue("excellence", e.value);
                  setExcellenceSelect({
                    id: e.id,
                    label: e.value,
                    value: e.value,
                  });
                }}
              />
            </div>
            <div className="w-full">
              <BaseSelect
                id="very_good"
                name="very_good"
                placeholder={t("very good")}
                label={t("very good")}
                options={veryGoodOption}
                value={veryGoodSelect}
                onChange={(e) => {
                  setFieldValue("very_good", e.id);
                  setFieldValue("very_good", e.value);
                  setVeryGoodSelect({
                    id: e.id,
                    label: e.value,
                    value: e.value,
                  });
                }}
              />
            </div>

            <div className="w-full">
              <BaseSelect
                id="good"
                name="good"
                placeholder={t("good")}
                label={t("good")}
                options={goodOption}
                value={goodSelect}
                onChange={(e) => {
                  setFieldValue("good", e.value);
                  setGoodSelect({
                    id: e.id,
                    label: e.value,
                    value: e.value,
                  });
                }}
              />
            </div>
            <div className="w-full">
              <BaseSelect
                id="acceptable"
                name="acceptable"
                placeholder={t("acceptable")}
                label={t("acceptable")}
                options={acceptableOption}
                value={acceptableSelect}
                onChange={(e) => {
                  setFieldValue("acceptable", e.value);
                  setAcceptableSelect({
                    id: e.id,
                    label: e.value,
                    value: e.value,
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-lightGray rounded-2xl my-7 py-6">
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
            {!!Object.keys(editFinishedProgramData).length
              ? `${t("edit program")}`
              : `${t("create program")}`}
          </Button>
          <Button
            type="button"
            className="bg-lightGray text-mainColor"
            action={() => navigate("/programs")}
          >
            {t("cancel")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProgramInputs;
