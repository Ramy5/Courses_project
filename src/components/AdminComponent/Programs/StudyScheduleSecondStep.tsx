import React from "react";
import { Button } from "../..";
import { t } from "i18next";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";

import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";

const StudyScheduleSecondStep = ({ setSteps }: any) => {
  //   const localizer = momentLocalizer(moment);

  //   const data = [
  //     {
  //       Id: 1,
  //       Subject: "Meeting",
  //       StartTime: new Date(2023, 1, 15, 10, 0),
  //       EndTime: new Date(2023, 1, 15, 12, 30),
  //     },
  //   ];

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

  const subjects = [
    { day: "saturday", start: "9:00", end: "10:00", name: "Math" },
    { day: "sunday", start: "10:00", end: "11:00", name: "Math" },
  ];

  //   const subjects = [
  //     { day: "Monday", start: "9:00 AM", end: "11:00 AM", name: "Math" },
  //     { day: "Tuesday", start: "10:00 AM", end: "12:00 PM", name: "Science" },
  //     { day: "Friday", start: "11:00 AM", end: "1:00 PM", name: "History" },
  //     // Add more subjects as needed
  //   ];

  //   const scheduleData = [
  //     {
  //       day: "Monday",
  //       subjects: [
  //         {
  //           name: "Math",
  //           startTime: "10:00 AM",
  //           endTime: "11:30 AM",
  //         } /* Add more subjects */,
  //       ],
  //     },
  //     {
  //       day: "Tuesday",
  //       subjects: [
  //         {
  //           name: "Science",
  //           startTime: "09:00 AM",
  //           endTime: "10:30 AM",
  //         } /* Add more subjects */,
  //       ],
  //     },
  //     // Add more days as needed
  //   ];

  subjects.sort((a, b) => {
    if (days.indexOf(a.day) !== days.indexOf(b.day)) {
      return days.indexOf(a.day) - days.indexOf(b.day);
    } else {
      return (
        parseInt(a.start.replace(":", ""), 10) -
        parseInt(b.start.replace(":", ""), 10)
      );
    }
  });

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
            <div key={day} className="flex gap-8 items-center">
              <p className="w-20">{day}</p>
              <div className="h-[1px] bg-mainColor w-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* <ScheduleComponent
        height="100vh"
        selectedDate={new Date(2023, 1, 15)}
        eventSettings={{ dataSource: data }}
      >
        <ViewsDirective>
          <ViewDirective option="Week" />
        </ViewsDirective>
        <Inject services={[Week]} />
      </ScheduleComponent> */}

      {/* <div className="p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={["week"]}
          defaultView="week"
          step={60}
          showMultiDayTimes
        />
      </div> */}

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
