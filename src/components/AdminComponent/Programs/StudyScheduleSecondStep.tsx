import { Button } from "../..";
import { t } from "i18next";

const StudyScheduleSecondStep = ({ setSteps }: any) => {
  const days = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];
  const times = [
    "16:00",
    "15:00",
    "14:00",
    "13:00",
    "12:00",
    "11:00",
    "10:00",
    "9:00",
  ];

  return (
    <div className="mt-12">
      <h2>StudyScheduleSecondStep</h2>

      <div>
        <div className="flex items-center justify-between mb-5 ms-24">
          {times.map((time) => (
            <div key={time}>{time}</div>
          ))}
        </div>
        <div className="flex flex-col gap-12">
          {days.map((day) => (
            <div key={day} className="flex items-center gap-8">
              <p className="w-20">{day}</p>
              <div className="h-[1px] bg-mainColor w-full"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-5">
        <Button bordered action={() => setSteps(1)}>
          {t("Previous")}
        </Button>
        <Button action={() => setSteps(3)}>{t("Next")}</Button>
        <Button className="bg-mainRed">{t("cancel")}</Button>
      </div>
    </div>
  );
};

export default StudyScheduleSecondStep;
