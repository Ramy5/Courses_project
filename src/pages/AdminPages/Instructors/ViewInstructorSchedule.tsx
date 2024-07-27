import { useQuery } from "@tanstack/react-query";
import Schedule from "../../../components/AdminComponent/Programs/Schedule";
import customFetch from "../../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/UI/Loading";
import { Button } from "../../../components";
import { t } from "i18next";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ViewInstructorSchedule = () => {
  const { id } = useParams();
  const contentRef = useRef();

  const navigate = useNavigate();

  const fetchInstructorSchedule = async () => {
    const response = await customFetch(`getLectureForIns/${id}`);
    return response;
  };

  const { data, isFetching, isRefetching } = useQuery({
    queryKey: ["instructor_schedule"],
    queryFn: fetchInstructorSchedule,
  });

  const instructorSchedule = data?.data?.data.lectures || [];

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    onAfterPrint: () => console.log("Print job completed."),
  });

  return (
    <div>
      {isRefetching || isFetching ? (
        <Loading />
      ) : (
        <div>
          <div className="flex items-center justify-between mx-8 mb-4">
            <p className="font-semibold text-2xl text-mainColor">
              {t("school schedule")}
            </p>
            <Button action={handlePrint}>{t("print")}</Button>
          </div>
          <div ref={contentRef} className="mx-3">
            <Schedule scheduleData={instructorSchedule} />
          </div>
          <div className="flex items-center justify-end mx-8">
            <Button action={() => navigate(-1)}>{t("back")}</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewInstructorSchedule;
