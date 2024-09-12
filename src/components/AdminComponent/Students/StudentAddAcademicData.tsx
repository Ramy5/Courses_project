import { t } from "i18next";
import BaseInput from "../../UI/BaseInput";
import { Button, DateInputField } from "../..";
import { Form, Formik } from "formik";
import customFetch from "../../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BaseSelect from "../../UI/BaseSelect";

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

const editStudentAcademic = async (newStudent: any, id: number | string) => {
  const data = customFetch.post(`updateAcademicData/${id}`, newStudent);
  return data;
};

const getAllPrograms = async () => {
  const { data } = await customFetch("programs");
  return data.data;
};

const StudentAddAcademicData = ({
  editObj,
  studentID,
}: StudentAddAcademicData_TP) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: studentIDParam } = useParams();
  const [programSelect, setProgramSelect] = useState(null);
  const [groupSelect, setGroupSelect] = useState(null);
  const [levelSelect, setLevelSelect] = useState(null);

  const initialValues: AddStudentAcademic_TP = {
    number_academic: editObj?.number_academic || "",
    program_academic: editObj?.program_academic?.id || "",
    level_academic: editObj?.level_academic?.id || "",
    division_number_academic: editObj?.division_number_academic?.id || "",
    join_date_academic:
      editObj?.join_date_academic != "Invalid Date"
        ? editObj?.join_date_academic
        : new Date(),
  };

  const errorFields = [
    "address",
    "country_residence",
    "phone",
    "email",
    "full_name",
    "address",
  ];

  const {
    data: programsOptions,
    isLoading: programIsLoading,
    isFetching: programIsFetching,
    isRefetching: programIsRefetching,
  } = useQuery({
    queryKey: ["get-all-programs"],
    queryFn: getAllPrograms,
    select: (data) => {
      return data?.programs?.map((program) => {
        return {
          id: program?.id,
          label: program?.program_name,
          value: program?.id,
        };
      });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-student-academic"],
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

  const { mutate: updateAcademicData, isPending: editIsPending } = useMutation({
    mutationKey: ["update-academic-student"],
    mutationFn: (editAcademic: any) =>
      editStudentAcademic(editAcademic, studentIDParam),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries("students");
      toast.success(
        t("student academic information has been edited successfully")
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
    let newStudent = {
      Academic_code: values?.number_academic || "",
      program_id: values?.program_academic || "",
      level: values?.level_academic || "",
      group: values?.division_number_academic || "",
      joined_date: formatDate(values?.join_date_academic) || "",
      student_id: editObj ? studentIDParam : studentID,
    };

    editObj ? await updateAcademicData(newStudent) : await mutate(newStudent);
  };

  const levelsOption = [
    {
      label: `${t("level")} 1`,
      value: "level 1",
      id: 1,
    },
    {
      label: `${t("level")} 2`,
      value: "level 2",
      id: 2,
    },
    {
      label: `${t("level")} 3`,
      value: "level 3",
      id: 3,
    },
    {
      label: `${t("level")} 4`,
      value: "level 4",
      id: 4,
    },
  ];

  const groupNumberOption = [
    {
      label: `1`,
      value: "1",
      id: 1,
    },
    {
      label: `2`,
      value: "2",
      id: 2,
    },
  ];

  useEffect(() => {
    if (editObj) {
      const editLevel = {
        id: editObj?.level_academic?.id,
        label: `${t("level")} ${editObj?.level_academic?.label}`,
        value: editObj?.level_academic?.value,
      };

      const editProgram = {
        id: editObj?.program_academic?.id,
        label: editObj?.program_academic?.label,
        value: editObj?.program_academic?.value,
      };

      const editGroup = {
        id: editObj?.division_number_academic?.id,
        label: editObj?.division_number_academic?.label,
        value: editObj?.division_number_academic?.value,
      };

      setLevelSelect(editLevel);
      setGroupSelect(editGroup);
      setProgramSelect(editProgram);
    }
  }, [editObj]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        handleAddStudent(values);
        resetForm();
      }}
    >
      {({ setFieldValue }) => {
        return (
          <Form className="flex flex-col w-full gap-5 px-8 md:w-3/4 md:px-16 mx-auto">
            <BaseInput
              name="number_academic"
              id="number_academic"
              type="text"
              className="w-full text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
              placeholder={t("academic number")}
              label={t("academic number")}
              labelProps="!font-semibold"
            />

            <div>
              <BaseSelect
                className="w-full"
                id="program_academic"
                name="program_academic"
                placeholder={t("select a program")}
                label={t("program")}
                options={programsOptions}
                isLoading={
                  programIsLoading || programIsFetching || programIsRefetching
                }
                value={programSelect}
                onChange={(e) => {
                  setProgramSelect(e);
                  setFieldValue("program_academic", e.id);
                }}
              />
            </div>

            <div>
              <BaseSelect
                className="w-full"
                id="level_academic"
                name="level_academic"
                label={t("level")}
                placeholder={t("select the level")}
                options={levelsOption}
                value={levelSelect}
                onChange={(e) => {
                  setLevelSelect(e);
                  setFieldValue("level_academic", e.id);
                }}
              />
            </div>

            <div>
              <BaseSelect
                className="w-full"
                id="division_number_academic"
                name="division_number_academic"
                placeholder={t("select group number")}
                options={groupNumberOption}
                label={t("division number")}
                value={groupSelect}
                onChange={(e) => {
                  setGroupSelect(e);
                  setFieldValue("division_number_academic", e.id);
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <DateInputField
                label={`${t("joining date")}`}
                placeholder={`${t("joining date")}`}
                name="join_date_academic"
                className="w-full"
                labelProps={{ className: "mb-2  !font-bold" }}
              />
            </div>

            <div className="mt-8 mx-auto">
              <Button
                loading={isPending || editIsPending}
                type="submit"
                className="me-5"
              >
                {t("confirm")}
              </Button>
              <Button
                action={() => navigate(-1)}
                className="bg-lightGray text-mainColor"
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
