import React from "react";
import { Banar, StudentHomeworkDescription } from "../../../components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/UI/Loading";
import customFetch from "../../../utils/axios";
import { useRTL } from "../../../hooks/useRTL";

const getProject = async (id: number | string) => {
  const { data } = await customFetch(`projects/${id}`);
  return data.data;
};

const InstructorViewProject = () => {
  const { id } = useParams();

  const descriptionData = {
    description:
      "تتطلب مناقشة العلاقة بين اللغة و الخطاب النظر في مجموعة من العلاقات، كعلاقة اللغة بالسلطة و الإيديولوجية و الثقافة، و طرح جملة من المستويات النظرية و المشكلات المعرفية، كأصل اللغة،و سلطة اللغة، و السلط المساندة لها، و التمييز الذي تقيمه اللسانيات بين اللغة و الكلام و الخطاب، و الوحدات المشكلة للخطاب و اللسانيات الداخلية و الخارجية، و النظر في بعض المسائل الابستيمولوجية التي تطرحها هذه العلاقة ضمن ميدان معرفي يحاول التأسيس لمناهجه و مفاهيمه و مسائله على الرغم مما  و المشكلات المعرفية، كأصل اللغة،و سلطة اللغة، و السلط المساندة لها، ",
    instructions:
      "تتطلب مناقشة العلاقة بين اللغة و الخطاب النظر في مجموعة من العلاقات، كعلاقة اللغة بالسلطة و الإيديولوجية و الثقافة، و طرح جملة من المستويات النظرية و المشكلات المعرفية، كأصل اللغة،و سلطة اللغة، و السلط المساندة لها، و التمييز الذي تقيمه اللسانيات بين اللغة و الكلام و الخطاب، و الوحدات المشكلة للخطاب و اللسانيات الداخلية و الخارجية، و النظر في بعض المسائل",
    startDate: "رجب ٢٥/١٤٤٢",
    startTime: "١٢ مساء",
    endDate: "رجب ٢٥/١٤٤٢",
    endTime: "١٢ مساء",
    grade: 20,
    pdf: "المحاضرة الأولى.pdf",
    links: [
      {
        id: 1,
        url: "www.hfgghgfvdftffgftt.com",
      },
      {
        id: 2,
        url: "www.hfgghgfvdftffgftt.com",
      },
      {
        id: 3,
        url: "www.hfgghgfvdftffgftt.com",
      },
    ],
  };

  const {
    data: project,
    isLoading: projectIsLoading,
    isFetching: projectIsFetching,
    isRefetching: projectIsRefetching,
  } = useQuery({
    queryKey: ["view-one-project"],
    queryFn: () => getProject(id),
  });

  if (projectIsLoading || projectIsFetching || projectIsRefetching)
    return <Loading />;

  return (
    <div className="p-6 space-y-6 bg-white border rounded-3xl">
      {/* BANAR */}
      <Banar
        isProject
        banarTitle={project?.title}
        banarMaterial={project?.desc}
      />

      {/* DESCRIPTION */}
      <StudentHomeworkDescription
        isInstructotHomework
        {...project}
        isInstructorProject
      />
    </div>
  );
};

export default InstructorViewProject;
