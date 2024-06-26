// import { Button } from "../..";
// import { t } from "i18next";

// const StudyScheduleSecondStep = ({ setSteps }: any) => {
//   const days = [
//     "saturday",
//     "sunday",
//     "monday",
//     "tuesday",
//     "wednesday",
//     "thursday",
//     "friday",
//   ];
//   const times = [
//     "16:00",
//     "15:00",
//     "14:00",
//     "13:00",
//     "12:00",
//     "11:00",
//     "10:00",
//     "9:00",
//   ];

//   return (
//     <div className="mt-12">
//       <h2>StudyScheduleSecondStep</h2>

//       <div>
//         <div className="flex items-center justify-between mb-5 ms-24">
//           {times.map((time) => (
//             <div key={time}>{time}</div>
//           ))}
//         </div>
//         <div className="flex flex-col gap-12">
//           {days.map((day) => (
//             <div key={day} className="flex items-center gap-8">
//               <p className="w-20">{day}</p>
//               <div className="h-[1px] bg-mainColor w-full"></div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-4 flex items-center justify-end gap-5">
//         <Button bordered action={() => setSteps(1)}>
//           {t("Previous")}
//         </Button>
//         <Button action={() => setSteps(3)}>{t("Next")}</Button>
//         <Button className="bg-mainRed">{t("cancel")}</Button>
//       </div>
//     </div>
//   );
// };

// export default StudyScheduleSecondStep;

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { useEffect, useRef } from "react";
import { IoTimeOutline } from "react-icons/io5";

const Schedule = () => {
  const calendarRef = useRef(null);

  const events = [
    {
      id: "1",
      customContent: (
        <div className="text-center">
          <p>فيزياء</p>
          <p className="py-2">محمد يس</p>
          <div className="flex items-center justify-center gap-1">
            <IoTimeOutline />
            <p>09:30 - 11:20</p>
          </div>
        </div>
      ),
      resourceId: "friday",
      start: "2024-06-25T09:00:00",
      end: "2024-06-25T10:00:00",
      backgroundColor: "#369252",
    },
    {
      id: "2",
      customContent: (
        <div className="text-center">
          <p>كمياء</p>
          <p className="py-2">محمد يس</p>
          <div className="flex items-center justify-center gap-1">
            <IoTimeOutline />
            <p>12:00 - 13:00</p>
          </div>
        </div>
      ),
      resourceId: "friday",
      start: "2024-06-25T12:00:00",
      end: "2024-06-25T13:00:00",
      backgroundColor: "#393D94",
    },
    {
      id: "3",
      customContent: (
        <div className="text-center">
          <p>حاسب الي</p>
          <p className="py-2">محمد يس</p>
          <div className="flex items-center justify-center gap-1">
            <IoTimeOutline />
            <p>09:30 - 11:20</p>
          </div>
        </div>
      ),
      resourceId: "monday",
      start: "2024-06-25T10:00:00",
      end: "2024-06-25T11:00:00",
      backgroundColor: "#393D94",
    },
    {
      id: "9",
      customContent: (
        <div className="text-center">
          <p>فيزياء</p>
          <p className="py-2">محمد يس</p>
          <div className="flex items-center justify-center gap-1">
            <IoTimeOutline />
            <p>09:30 - 11:20</p>
          </div>
        </div>
      ),
      resourceId: "monday",
      start: "2024-06-25T15:00:00",
      end: "2024-06-25T16:00:00",
      backgroundColor: "#025464",
    },
    {
      id: "4",
      customContent: (
        <div className="text-center">
          <p>كمياء</p>
          <p className="py-2">محمد يس</p>
          <div className="flex items-center justify-center gap-1">
            <IoTimeOutline />
            <p>09:30 - 11:20</p>
          </div>
        </div>
      ),
      resourceId: "saturday",
      start: "2024-06-25T12:00:00",
      end: "2024-06-25T13:00:00",
      backgroundColor: "#9C48AB",
    },
    {
      id: "10",
      customContent: (
        <div className="text-center">
          <p>فيزياء</p>
          <p className="py-2">محمد يس</p>
          <div className="flex items-center justify-center gap-1">
            <IoTimeOutline />
            <p>09:30 - 11:20</p>
          </div>
        </div>
      ),
      resourceId: "saturday",
      start: "2024-06-25T17:00:00",
      end: "2024-06-25T18:00:00",
      backgroundColor: "#025464",
    },
    {
      id: "5",
      customContent: (
        <div className="text-center">
          <p>فيزياء</p>
          <p className="py-2">محمد يس</p>
          <div className="flex items-center justify-center gap-1">
            <IoTimeOutline />
            <p>09:30 - 11:20</p>
          </div>
        </div>
      ),
      resourceId: "sunday",
      start: "2024-06-25T13:00:00",
      end: "2024-06-25T14:00:00",
      backgroundColor: "#025464",
    },
    {
      id: "6",
      customContent: (
        <div className="text-center">
          <p>فيزياء</p>
          <p className="py-2">محمد يس</p>
          <div className="flex items-center justify-center gap-1">
            <IoTimeOutline />
            <p>09:30 - 11:20</p>
          </div>
        </div>
      ),
      resourceId: "thursday",
      start: "2024-06-25T09:00:00",
      end: "2024-06-25T10:00:00",
      backgroundColor: "#025464",
    },
    {
      id: "7",
      customContent: (
        <div className="text-center">
          <p>فيزياء</p>
          <p className="py-2">محمد يس</p>
          <div className="flex items-center justify-center gap-1">
            <IoTimeOutline />
            <p>09:30 - 11:20</p>
          </div>
        </div>
      ),
      resourceId: "tuesday",
      start: "2024-06-25T14:00:00",
      end: "2024-06-25T15:00:00",
      backgroundColor: "#393D94",
    },
    // {
    //   id: "8",
    //   customContent: (
    //     <div className="text-center">
    //       <p>فيزياء</p>
    //       <p className="py-2">محمد يس</p>
    //       <div className="flex items-center justify-center gap-1">
    //         <IoTimeOutline />
    //         <p>09:30 - 11:20</p>
    //       </div>
    //     </div>
    //   ),
    //   resourceId: "wednesday",
    //   start: "2024-06-25T15:00:00",
    //   end: "2024-06-25T16:00:00",
    //   backgroundColor: "#393D94",
    // },
  ];

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = calendarRef.current.getApi();

      calendar.setOption("timeZone", "UTC");
      calendar.setOption("initialView", "dayGridMonth");
      calendar.setOption("aspectRatio", 2.4);
      calendar.setOption("resourceAreaWidth", "10%");

      calendar.setOption("headerToolbar", {
        left: "prev,next",
        center: "title",
        right: "resourceTimelineDay",
      });
      calendar.setOption("editable", false);
      calendar.setOption("resourceAreaHeaderContent", "");

      const resources = [
        { id: "friday", title: "saturday" },
        { id: "monday", title: "sunday" },
        { id: "saturday", title: "monday" },
        { id: "sunday", title: "tuesday" },
        { id: "thursday", title: "wednesday" },
        { id: "tuesday", title: "thursday" },
        { id: "wednesday", title: "friday" },
      ];

      calendar.setOption("resources", resources);

      calendar.setOption("events", events);

      return () => {
        calendar.destroy();
      };
    }
  }, []);

  const renderEventContent = (eventInfo) => {
    const event = events.find((e) => e.id === eventInfo.event.id);
    return <div>{event ? event.customContent : eventInfo.event.title}</div>;
  };

  return (
    <div>
      <div className="my-8">
        <FullCalendar
          ref={calendarRef}
          plugins={[
            resourceTimelinePlugin,
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          initialView="resourceTimelineDay"
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            omitZeroMinute: false,
            hour12: false,
          }}
          slotMinTime={"09:00AM"}
          slotMaxTime={"19:00PM"}
          initialDate="2024-06-25"
          eventContent={renderEventContent}
        />
      </div>
    </div>
  );
};
export default Schedule;