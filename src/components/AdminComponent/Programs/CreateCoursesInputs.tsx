import { Form, Formik } from "formik";
import { BaseInput, Button, MainRadio } from "../../../components";
import { t } from "i18next";
import Select from "react-select";
import { useEffect, useState } from "react";
import selectStyle from "../../../utils/selectStyle";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormikError } from "../../UI/FormikError";
import SuggestedReferences from "./SuggestedReferences";
import BaseSelect from "../../UI/BaseSelect";

const validationSchema = Yup.object().shape({
  course_name: Yup.string().required("Course name is required"),
  course_teachers: Yup.array().min(1, "At least one teacher is required"),
  course_code: Yup.number()
    .required("Course code is required")
    .positive()
    .integer(),
  level: Yup.string().required("Level is required"),
  course_objectives: Yup.string().required("Course objectives are required"),
  information_concepts: Yup.string().required(
    "Information concepts are required"
  ),
  mental_skills: Yup.string().required("Mental skills are required"),
  general_skills: Yup.string().required("General skills are required"),
  professional_skills: Yup.string().required(
    "Professional skills are required"
  ),
  teaching_learning_methods: Yup.string().required(
    "Teaching and learning methods are required"
  ),
});

const editProgramCourse = async (editCourses: any, id: number) => {
  const data = await customFetch.post(`updateCourse/${id}`, editCourses);
  return data;
};

const CreateCoursesInputs = ({
  setCoursesData,
  setStep,
  editCoursesData,
  setEditCoursesData,
  editFinishedCoursesData,
}: any) => {
  const [suggestedReferences, setSuggestedReferences] = useState(
    editCoursesData?.references || editFinishedCoursesData?.references || []
  );
  console.log("🚀 ~ suggestedReferences:", suggestedReferences);

  const [level, setLevel] = useState();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [teachingLearningMethods, setTeachingLearningMethods] = useState(
    editCoursesData?.teaching_learning_methods
      ?.split(",")
      .map((item) => item.trim()) || []
  );

  const [courseObjectives, setCourseObjectivesSteps] = useState(["1- "]);
  const [informationConceptsSteps, setInformationConceptsSteps] = useState([
    "1- ",
  ]);
  const [mentalSkillsSteps, setMentalSkillsSteps] = useState(["1- "]);
  const [professionalSkillsSteps, setProfessionalSkillsSteps] = useState([
    "1- ",
  ]);
  const [generalSkillsSteps, setGeneralSkillsSteps] = useState(["1- "]);

  const courseTeacherID = editFinishedCoursesData?.teachers?.map(
    (teacher) => teacher.id
  );

  const initialValues = {
    id: editCoursesData?.id || 0,
    course_name:
      editCoursesData?.course_name ||
      editFinishedCoursesData?.course_name ||
      "",
    course_teachers: editCoursesData?.course_teachers || courseTeacherID || [],
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
      "",
    lectures:
      editCoursesData?.lectures || editFinishedCoursesData?.lectures || "",
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

  const levelsOption = [
    { id: 1, value: 1, label: 1 },
    { id: 2, value: 2, label: 2 },
    { id: 3, value: 3, label: 3 },
    { id: 4, value: 4, label: 4 },
  ];

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit_courses"],
    mutationFn: (editCourses: any) =>
      editProgramCourse(editCourses, Number(editFinishedCoursesData?.id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries("courses");
      toast.success(t("the course description has been successfully modified"));
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error[0];
      toast.error(errorMessage);
    },
  });

  useEffect(() => {
    const editLevel = {
      id: editCoursesData?.level || editFinishedCoursesData?.level || "",
      value: editCoursesData?.level || editFinishedCoursesData?.level || "",
      label:
        editCoursesData?.level ||
        editFinishedCoursesData?.level ||
        `${t("level")}`,
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

  const parseSteps = (data) => {
    return data
      ? data
          .split(/(?=\d+- )/)
          .map((step) => step.trim())
          .filter((step) => step)
      : [];
  };

  const courseObjective = parseSteps(
    editFinishedCoursesData?.course_objectives ||
      editCoursesData?.course_objectives
  );
  const informationConcepts = parseSteps(
    editFinishedCoursesData?.information_concepts ||
      editCoursesData?.information_concepts
  );
  const mentalSkills = parseSteps(
    editFinishedCoursesData?.mental_skills || editCoursesData?.mental_skills
  );
  const professionalSkills = parseSteps(
    editFinishedCoursesData?.professional_skills ||
      editCoursesData?.professional_skills
  );
  const generalSkills = parseSteps(
    editFinishedCoursesData?.general_skills || editCoursesData?.general_skills
  );

  useEffect(() => {
    setCourseObjectivesSteps(courseObjective || ["1- "]);
    setInformationConceptsSteps(informationConcepts || ["1- "]);
    setMentalSkillsSteps(mentalSkills || ["1- "]);
    setProfessionalSkillsSteps(professionalSkills || ["1- "]);
    setGeneralSkillsSteps(generalSkills || ["1- "]);
  }, [editFinishedCoursesData]);

  const handleKeyDown = (e, setSteps, steps) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextStepNumber = steps.length + 1;
      setSteps([...steps, `${nextStepNumber}- `]);
    }
  };

  const handleCheckboxChange = (method) => {
    const newSelectedMethods = teachingLearningMethods.includes(method)
      ? teachingLearningMethods.filter((item) => item !== method) // Remove if already selected
      : [...teachingLearningMethods, method]; // Add if not selected

    setTeachingLearningMethods(newSelectedMethods);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {}}
      >
        {({ setFieldValue, values, resetForm, setTouched, validateForm }) => {
          console.log("🚀 ~ values:", values);
          return (
            <Form>
              <div className="pb-8 bg-white rounded-3xl">
                <h2 className="py-4 px-7 !m-0 border-b-4 border-[#E6EAEE] font-semibold text-xl">
                  {t("add a course")} /{" "}
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
                        disabled={
                          Object.keys(editFinishedCoursesData).length !== 0
                        }
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
                          disabled={
                            Object.keys(editFinishedCoursesData).length !== 0 ||
                            Object.keys(editCoursesData).length !== 0
                          }
                        />
                        <div className="relative">
                          <div className="w-full mt-1">
                            <BaseSelect
                              id="level"
                              name="level"
                              value={level}
                              options={levelsOption}
                              onChange={(option) => {
                                setFieldValue("level", option.value);
                                setLevel(option);
                              }}
                              placeholder={t("level")}
                              label={t("level")}
                              isDisabled={
                                Object.keys(editFinishedCoursesData).length !==
                                0
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col h-full ">
                      <label htmlFor="vision" className="font-semibold">
                        {t("course objectives")}
                      </label>
                      {/* <textarea
                        name="course_objectives"
                        id="course_objectives"
                        className="w-full h-full mt-1  text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                        placeholder={t("course objectives")}
                        value={values.course_objectives}
                        onChange={(e) => {
                          setFieldValue("course_objectives", e.target.value);
                        }}
                      /> */}

                      <textarea
                        name="course_objectives"
                        id="course_objectives"
                        className="w-full h-full mt-1  text-lg py-2 px-4 bg-[#E6EAEE] main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                        placeholder={t("course objectives")}
                        value={courseObjectives?.join("\n") || ["1- "]}
                        onChange={(e) => {
                          const stepValues = e.target.value
                            .split("\n")
                            .map(
                              (step, index) =>
                                `${index + 1}- ${step.split("- ")[1] || ""}`
                            );
                          setCourseObjectivesSteps(stepValues);
                          setFieldValue(
                            "course_objectives",
                            stepValues.join(" ")
                          );
                        }}
                        onKeyDown={(e) =>
                          handleKeyDown(
                            e,
                            setCourseObjectivesSteps,
                            courseObjectives
                          )
                        }
                      />
                      <FormikError
                        name="course_objectives"
                        className="whitespace-nowrap"
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
                        value={informationConceptsSteps?.join("\n") || ["1- "]}
                        onChange={(e) => {
                          const stepValues = e.target.value
                            .split("\n")
                            .map(
                              (step, index) =>
                                `${index + 1}- ${step.split("- ")[1] || ""}`
                            );
                          setInformationConceptsSteps(stepValues);
                          setFieldValue(
                            "information_concepts",
                            stepValues.join(" ")
                          );
                        }}
                        onKeyDown={(e) =>
                          handleKeyDown(
                            e,
                            setInformationConceptsSteps,
                            informationConceptsSteps
                          )
                        }
                      />
                      <FormikError
                        name="information_concepts"
                        className="whitespace-nowrap"
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
                        value={mentalSkillsSteps?.join("\n") || ["1- "]}
                        onChange={(e) => {
                          const stepValues = e.target.value
                            .split("\n")
                            .map(
                              (step, index) =>
                                `${index + 1}- ${step.split("- ")[1] || ""}`
                            );
                          setMentalSkillsSteps(stepValues);
                          setFieldValue("mental_skills", stepValues.join(" "));
                        }}
                        onKeyDown={(e) =>
                          handleKeyDown(
                            e,
                            setMentalSkillsSteps,
                            mentalSkillsSteps
                          )
                        }
                      />
                      <FormikError
                        name="mental_skills"
                        className="whitespace-nowrap"
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
                        value={professionalSkillsSteps?.join("\n") || ["1- "]}
                        onChange={(e) => {
                          const stepValues = e.target.value
                            .split("\n")
                            .map(
                              (step, index) =>
                                `${index + 1}- ${step.split("- ")[1] || ""}`
                            );
                          setProfessionalSkillsSteps(stepValues);
                          setFieldValue(
                            "professional_skills",
                            stepValues.join(" ")
                          );
                        }}
                        onKeyDown={(e) =>
                          handleKeyDown(
                            e,
                            setProfessionalSkillsSteps,
                            professionalSkillsSteps
                          )
                        }
                      />
                      <FormikError
                        name="professional_skills"
                        className="whitespace-nowrap"
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
                        value={generalSkillsSteps?.join("\n") || ["1- "]}
                        onChange={(e) => {
                          const stepValues = e.target.value
                            .split("\n")
                            .map(
                              (step, index) =>
                                `${index + 1}- ${step.split("- ")[1] || ""}`
                            );
                          setGeneralSkillsSteps(stepValues);
                          setFieldValue("general_skills", stepValues.join(" "));
                        }}
                        onKeyDown={(e) =>
                          handleKeyDown(
                            e,
                            setGeneralSkillsSteps,
                            generalSkillsSteps
                          )
                        }
                      />
                      <FormikError
                        name="general_skills"
                        className="whitespace-nowrap"
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
                          setFieldValue(
                            "teaching_learning_methods",
                            "lectures"
                          );
                          handleCheckboxChange("lectures");
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
                          setFieldValue(
                            "teaching_learning_methods",
                            "practical_training"
                          );
                          handleCheckboxChange("practical training");
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
                          setFieldValue(
                            "teaching_learning_methods",
                            "applications"
                          );
                          handleCheckboxChange("applications");
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
                          setFieldValue(
                            "teaching_learning_methods",
                            "research"
                          );
                          handleCheckboxChange("research");
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
                          setFieldValue(
                            "teaching_learning_methods",
                            "case_studies"
                          );
                          handleCheckboxChange("case studies");
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
                          setFieldValue("teaching_learning_methods", "project");
                          handleCheckboxChange("project");
                        }}
                      />
                    </div>
                    <FormikError
                      name="teaching_learning_methods"
                      className="whitespace-nowrap"
                    />
                  </div>

                  <div className="w-full my-12 md:w-3/4 relative">
                    <div className="flex flex-col items-center justify-between mt-2 sm:flex-row gap-x-12 gap-y-6">
                      <div className="w-full sm:w-3/4">
                        <BaseSelect
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
                          label={t("instructor name")}
                        />
                      </div>
                    </div>
                    <FormikError
                      name="course_teachers"
                      className="absolute whitespace-nowrap"
                    />
                  </div>
                </div>

                <SuggestedReferences
                  suggestedReferences={suggestedReferences}
                  setSuggestedReferences={setSuggestedReferences}
                />

                <div className="flex justify-end px-8 mt-8">
                  <Button
                    type="button"
                    className="me-5"
                    loading={isPending}
                    action={async () => {
                      const errors = await validateForm();
                      setTouched(errors); // Mark all fields as touched to display validation errors

                      if (Object.keys(errors).length === 0) {
                        if (
                          Object.keys(editFinishedCoursesData).length === 0 ||
                          Object.keys(editCoursesData).length === 0
                        ) {
                          setCoursesData((prev) => {
                            const existingIndex = prev.findIndex(
                              (course) =>
                                course.course_code === values.course_code
                            );

                            if (existingIndex !== -1) {
                              const updatedCourses = [...prev];
                              updatedCourses[existingIndex] = {
                                ...values,
                                teaching_learning_methods:
                                  teachingLearningMethods?.join(","),
                                references: suggestedReferences,
                              };
                              return updatedCourses;
                            } else {
                              return [
                                ...prev,
                                {
                                  ...values,
                                  teaching_learning_methods:
                                    teachingLearningMethods?.join(", "),
                                  references: suggestedReferences,
                                },
                              ];
                            }
                          });

                          setEditCoursesData([]);
                          resetForm();
                          setStep(1);
                        } else {
                          mutate({
                            ...values,
                            references: suggestedReferences,
                          });
                          navigate(-1);
                        }
                      } else {
                        console.log("Validation failed:", errors);
                      }
                    }}
                  >
                    {t("submit")}
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#E6EAEE] text-mainColor"
                    action={() => {
                      if (Object.keys(editFinishedCoursesData).length !== 0) {
                        navigate(-1);
                      } else {
                        setEditCoursesData([]);
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
