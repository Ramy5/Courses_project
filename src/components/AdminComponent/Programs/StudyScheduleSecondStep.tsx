import React, { useEffect, useRef, useState } from "react";
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

import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";

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

  // const days = [
  //   "saturday",
  //   "sunday",
  //   "monday",
  //   "tuesday",
  //   "wednesday",
  //   "thursday",
  //   "friday",
  // ];
  // const times = [
  //   "16:00",
  //   "15:00",
  //   "14:00",
  //   "13:00",
  //   "12:00",
  //   "11:00",
  //   "10:00",
  //   "9:00",
  // ];

  // const subjects = [
  //   { day: "saturday", start: "9:00", end: "10:00", name: "Math" },
  //   { day: "sunday", start: "10:00", end: "11:00", name: "Math" },
  // ];

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

  // subjects.sort((a, b) => {
  //   if (days.indexOf(a.day) !== days.indexOf(b.day)) {
  //     return days.indexOf(a.day) - days.indexOf(b.day);
  //   } else {
  //     return (
  //       parseInt(a.start.replace(":", ""), 10) -
  //       parseInt(b.start.replace(":", ""), 10)
  //     );
  //   }
  // });

  // const loadData = (args) => {
  //   const resources = [
  //     {
  //       name: "Convertible", id: "G2", expanded: true, children: [
  //         {name: "MINI Cooper", seats: 4, doors: 2, transmission: "Automatic", id: "A"},
  //         {name: "BMW Z4", seats: 4, doors: 2, transmission: "Automatic", id: "B"},
  //         {name: "Ford Mustang", seats: 4, doors: 2, transmission: "Automatic", id: "C"},
  //         {name: "Mercedes-Benz SL", seats: 2, doors: 2, transmission: "Automatic", id: "D"},
  //       ]
  //     },
  //     {
  //       name: "SUV", id: "G1", expanded: true, children: [
  //         {name: "BMW X1", seats: 5, doors: 4, transmission: "Automatic", id: "E"},
  //         {name: "Jeep Wrangler", seats: 5, doors: 4, transmission: "Automatic", id: "F"},
  //         {name: "Range Rover", seats: 5, doors: 4, transmission: "Automatic", id: "G"},
  //       ]
  //     },
  //   ];

  //   const events = [
  //     {id: 101, text: "Reservation 101", start: "2023-11-02T00:00:00", end: "2023-11-05T00:00:00", resource: "A"},
  //     {id: 102, text: "Reservation 102", start: "2023-11-06T00:00:00", end: "2023-11-10T00:00:00", resource: "A"},
  //     {
  //       id: 103,
  //       text: "Reservation 103",
  //       start: "2023-11-03T00:00:00",
  //       end: "2023-11-10T00:00:00",
  //       resource: "C",
  //       backColor: "#6fa8dc",
  //       locked: true
  //     },
  //     {
  //       id: 104,
  //       text: "Reservation 104",
  //       start: "2023-11-02T00:00:00",
  //       end: "2023-11-08T00:00:00",
  //       resource: "E",
  //       backColor: "#f6b26b",
  //       plus: true
  //     },
  //     {
  //       id: 105,
  //       text: "Reservation 105",
  //       start: "2023-11-03T00:00:00",
  //       end: "2023-11-09T00:00:00",
  //       resource: "G",
  //     },
  //     {
  //       id: 106,
  //       text: "Reservation 106",
  //       start: "2023-11-02T00:00:00",
  //       end: "2023-11-07T00:00:00",
  //       resource: "B",
  //     }
  //   ];

  //   getScheduler().update({
  //     resources,
  //     events
  //   });
  // }

  const schedulerRef = useRef();

  const [config, setConfig] = useState({
    timeHeaders: [{ groupBy: "Month" }, { groupBy: "Day", format: "d" }],
    scale: "Week",
    days: 7,
    startDate: "2024-10-01",
    timeRangeSelectedHandling: "Enabled",
    treeEnabled: true,
  });

  useEffect(() => {
    const events = [
      {
        id: 1,
        text: "Event 1",
        start: "2024-10-01T09:00:00",
        end: "2024-10-02T10:00:00",
        resource: "A",
      },
      {
        id: 2,
        text: "Event 1",
        start: "2024-10-01T09:00:00",
        end: "2024-10-02T10:00:00",
        resource: "B",
      },
    ];

    const resources = [
      { name: "Resource A", id: "A" },
      { name: "Resource B", id: "B" },
      // ...
    ];

    // load resource and event data using config
    setConfig((prevConfig) => ({
      ...prevConfig,
      events,
      resources,
    }));
  }, []);

  // const [config, setConfig] = useState({
  //   startDate: DayPilot.Date.today().firstDayOfMonth(),
  //   days: DayPilot.Date.today().daysInMonth(),
  //   scale: "Day",
  //   timeHeaders: [{ groupBy: "Month" }, { groupBy: "Day", format: "d" }],
  // });

  return (
    <div className="mt-12">
      <h2>StudyScheduleSecondStep</h2>

      <div>
        <DayPilotScheduler {...config} ref={schedulerRef} />
      </div>

      {/* <div>
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
      </div> */}

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
