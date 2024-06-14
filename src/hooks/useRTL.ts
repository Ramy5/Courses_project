import { useTranslation } from "react-i18next";

export const useRTL = () => {
  const { i18n } = useTranslation();
  return i18n.language.startsWith("ar");
};
