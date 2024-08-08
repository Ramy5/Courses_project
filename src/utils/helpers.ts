import { t } from "i18next";

export const formatDate = (isoDate: string | Date) => {
  try {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    return "";
  }
};

export const subtractTwoTime = (
  date: Date,
  startTime: string,
  endTime: string
) => {
  const start = new Date(`${date}T${startTime}`);
  const end = new Date(`${date}T${endTime}`);
  const diffMs = +end - +start;
  const diffMinutes = diffMs / (1000 * 60);
  return diffMinutes + " " + t("minute");
};

export const generateRandomColor = () => {
  const letters = "123456789ABCDE";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 14)];
  }

  return color;
};

export const formatEgyptDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Cairo",
    // year: 'numeric',
    // month: '2-digit',
    // day: '2-digit',
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

export const formatTimeTo12Hour = (time) => {
  let [hours, minutes, seconds] = time.split(":");
  hours = parseInt(hours, 10);
  const period = hours >= 12 ? `${t("evening")}` : `${t("morning")}`;
  hours = hours % 12 || 12;
  return `${hours}:${minutes}:${seconds} ${period}`;
};

export function formatTimeTo24Hour(timeStr) {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes, seconds] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}:${seconds}`;
}

export const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  // if (seconds >= 3600) {
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
  // } else {
  //   return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  // }
};

export function calculateTime(time1, time2) {
  const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
  const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

  let totalSeconds = seconds1 + seconds2;
  let totalMinutes = minutes1 + minutes2 + Math.floor(totalSeconds / 60);
  let totalHours = hours1 + hours2 + Math.floor(totalMinutes / 60);

  totalSeconds %= 60;
  totalMinutes %= 60;
  totalHours %= 24; // Adjust for 24-hour format

  const pad = (num) => String(num).padStart(2, "0");

  return `${pad(totalHours)}:${pad(totalMinutes)}:${pad(totalSeconds)}`;
}
