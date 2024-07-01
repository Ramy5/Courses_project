import React from "react";
import Schedule from "../../components/AdminComponent/Programs/Schedule";

const InstructorSchedule = () => {
  return (
    <div className="pb-2 bg-white rounded-2xl py-8">
      <p className="mb-5 text-mainColor font-semibold text-2xl text-center">
        ذكاء اصطناعي
      </p>
      <Schedule />
    </div>
  );
};

export default InstructorSchedule;
