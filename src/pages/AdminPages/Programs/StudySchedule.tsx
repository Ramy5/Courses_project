import { t } from "i18next";
import { Fragment, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import StudyScheduleFirstStep from "../../../components/AdminComponent/Programs/StudyScheduleFirstStep";
import StudyScheduleSecondStep from "../../../components/AdminComponent/Programs/StudyScheduleSecondStep";
import { Button } from "../../../components";

const StudySchedule = () => {
  const [steps, setSteps] = useState<number>(1);

  const stepsOption = [
    { id: 1, label: "schedule settings", border: true },
    { id: 2, label: "schedule view", border: true },
    { id: 3, label: "finish settings", border: false },
  ];

  return (
    <div className="bg-white py-8 px-4 rounded-xl relative">
      <div className="flex items-center w-4/5 m-auto">
        {stepsOption.map((step, index) => (
          <Fragment key={index}>
            <div className="flex items-center text-mainborder-mainColor relative">
              <div
                className={`${
                  steps === step.id
                    ? "bg-mainColor text-white"
                    : "border-2 border-mainColor text-mainColor"
                } rounded-full transition duration-500 ease-in-out flex justify-center items-center h-11 w-11 font-semibold text-xl`}
              >
                {(steps === 2 && index === 0) ||
                (steps === 3 && (index === 0 || index === 1)) ? (
                  <GiCheckMark size={22} className="fill-[#4ECB71]" />
                ) : (
                  `${step.id}`
                )}
              </div>
              <div className="absolute top-0 -left-3 w-28 -ml-10 mt-12 text-sm font-semibold text-mainColor">
                {/* {t(`${step.label}`)} */}
              </div>
            </div>
            {step.border && index < stepsOption.length - 1 && (
              <div
                className={`${
                  (steps === 2 && index === 0) ||
                  (steps === 3 && (index === 0 || index === 1))
                    ? "border-mainColor"
                    : "border-[#E6EAEE]"
                } flex-auto border-t-2 transition duration-500 ease-in-out`}
              ></div>
            )}
          </Fragment>
        ))}
        {/* <div className="flex items-center text-white relative">
          <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-mainborder-mainColor border-mainColor text-center font-semibold text-xl">
            2
          </div>
          <div className="absolute top-0 -ml-10 mt-14 text-sm font-semibold text-mainColor">
            Account
          </div>
        </div>
        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
        <div className="flex items-center text-gray-500 relative">
          <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300 text-center font-semibold text-xl">
            3
          </div>
          <div className="absolute top-0 -ml-10 mt-14 text-sm font-semibold text-mainColor">
            Message
          </div>
        </div> */}
      </div>

      {steps === 1 && <StudyScheduleFirstStep setSteps={setSteps} />}

      {steps === 2 && <StudyScheduleSecondStep setSteps={setSteps} />}

      {steps === 3 && (
        <div className="w-full h-[480px] flex">
          <div className="w-3/5 m-auto text-center">
            <h1 className="text-[#073051] opacity-100 font-semibold text-2xl">
              {t(
                "program schedule settings for the selected study period have been completed. Click “Save Schedule” to complete the setup process."
              )}
            </h1>
            <Button className="font-semibold text-xl py-3 rounded-2xl mt-20" action={() => {}}>{t("save table")}</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudySchedule;



