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
  const letters = "123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};
