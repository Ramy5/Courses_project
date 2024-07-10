import { t } from "i18next";
import BaseInput from "../../UI/BaseInput";
import { Button, DateInputField } from "../..";
import Select from "react-select";
import { Form, Formik, useFormikContext } from "formik";
import customFetch from "../../../utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface AddStudentAcademic_TP {
  number_academic: string;
  program_academic: string;
  level_academic: string;
  division_number_academic: string;
  join_date_academic: Date;
}

interface StudentAddAcademicData_TP {
  editObj?: AddStudentAcademic_TP;
  studentID: number;
}

const postStudentAcademic = async (newStudent: any) => {
  const data = customFetch.post("storeAcademicData", newStudent);
  return data;
};

const StudentAddAcademicData = ({
  editObj,
  studentID,
}: StudentAddAcademicData_TP) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [programSelect, setProgramSelect] = useState([]);
  const [levelSelect, setLevelSelect] = useState([]);

  const initialValues: AddStudentAcademic_TP = {
    number_academic: editObj?.number_academic || "",
    program_academic: editObj?.program_academic || "",
    level_academic: editObj?.level_academic || "",
    division_number_academic: editObj?.division_number_academic || "",
    join_date_academic: editObj?.join_date_academic || new Date(),
  };

  const errorFields = [
    "address",
    "country_residence",
    "phone",
    "email",
    "full_name",
    "address",
  ];

  const mutation = useMutation({
    mutationKey: ["add-student"],
    mutationFn: postStudentAcademic,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries("students");
      toast.success(
        t("student academic information has been added successfully")
      );

      navigate("/students");
    },
    onError: (error) => {
      const errorMessage = errorFields
        .map((field) => error?.response?.data?.error[0]?.[field]?.[0])
        .find((message) => message);

      toast.error(errorMessage || error.message);
    },
  });

  const handleAddStudent = async (values: AddStudentAcademic_TP) => {
    const newStudent = {
      Academic_code: values?.number_academic || "",
      // program_id: values?.program_academic || "",
      program_id: 9,
      // level: values?.level_academic || "",
      level: 1,
      // group: values?.division_number_academic || "",
      group: 1,
      joined_date: formatDate(values?.join_date_academic) || "",
      student_id: studentID,
    };

    await mutation.mutate(newStudent);
  };

  const option = [
    {
      label: "test 1",
      value: "test 1",
      id: 1,
    },
    {
      label: "test 2",
      value: "test 2",
      id: 2,
    },
  ];

  useEffect(() => {
    // setProgramSelect(editObj?.program_academic);
    setLevelSelect(editObj?.level_academic);
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleAddStudent(values)}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className="flex flex-col w-full gap-5 px-4 lg:px-16 md:w-3/4">
            <BaseInput
              name="number_academic"
              id="number_academic"
              type="text"
              className="lg:w-[35vw] text-lg py-2 bg-[#E6EAEE] rounded-lg main_shadow text-slate-800 focus-within:outline-none"
              placeholder={t("academic number")}
              label={t("academic number")}
              labelProps="!font-semibold"
            />

            <div>
              <label htmlFor="program_academic" className="font-bold">
                {t("program")}
              </label>
              <Select
                className="lg:w-[35vw] mt-2"
                id="program_academic"
                name="program_academic"
                options={option}
                // value={programSelect}
                onChange={(e) => {
                  setFieldValue("program_academic", e.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="level_academic" className="font-bold">
                {t("level")}
              </label>
              <Select
                className="lg:w-[35vw] mt-2"
                id="level_academic"
                name="level_academic"
                options={option}
                value={option?.find(
                  (option) => option.value === values?.level_academic
                )}
                onChange={(e) => {
                  setFieldValue("level_academic", e.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="division_number_academic" className="font-bold">
                {t("division number")}
              </label>
              <Select
                className="lg:w-[35vw] mt-2"
                id="division_number_academic"
                name="division_number_academic"
                options={option}
                onChange={(e) => {
                  setFieldValue("division_number_academic", e.value);
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <DateInputField
                label={`${t("joining date")}`}
                placeholder={`${t("joining date")}`}
                name="join_date_academic"
                className="w-full md:w-1/2"
                labelProps={{ className: "mb-2  !font-bold" }}
              />
            </div>

            <div className="mt-8">
              <Button type="submit" className="me-5">
                {t("confirm")}
              </Button>
              <Button
                action={() => navigate(-1)}
                className="bg-[#E6EAEE] text-mainColor"
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

export default StudentAddAcademicData;
