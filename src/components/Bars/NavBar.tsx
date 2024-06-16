import { t } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../Buttons/Button";
import NotUser from "../../assets/navBar/no-user.svg";
import DateImg from "../../assets/navBar/date.svg";
import SearchImg from "../../assets/navBar/search.svg";
import Notification from "../../assets/navBar/notification.svg";
import { useRTL } from "../../hooks/useRTL";
import BaseInput from "../UI/BaseInput";
import { Form, Formik } from "formik";

type InitialValues_TP = {
  search: string;
};

const NavBar = () => {
  const [currentDate, setCurrentDate] = useState<String>("");

  const isRTL = useRTL();

  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = isRTL ? "ar" : "en";
  }, [isRTL]);

  const toggleLang = () => {
    i18n.changeLanguage(isRTL ? "en" : "ar");
  };

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toDateString());
  }, []);

  const initialValues: InitialValues_TP = {
    search: "",
  };

  return (
    <div className="w-100 flex h-16 items-center justify-between px-4">
      <div className="w-100 flex items-center gap-1 py-6 px-4">
        <img src={DateImg} alt="date" />
        <p>{currentDate}</p>
      </div>
      <div className="me-2 flex items-center gap-4">
        <div className="flex items-center justify-center gap-3">
          <div className="me-6">
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log("🚀 ~ NavBar ~ values:", values);
              }}
              validationSchema={""}
            >
              <Form className="relative">
                <img
                  src={SearchImg}
                  alt="Search"
                  className="absolute top-1/2 right-2 -translate-y-1/2 z-50 w-5 h-5"
                />
                <BaseInput
                  type="text"
                  id="search"
                  name="search"
                  placeholder="search"
                  className="border-[1px] border-[#545454] ps-8 m-0"
                />
              </Form>
            </Formik>
          </div>

          <img src={Notification} alt="Notification" />

          <div className="flex items-center gap-1">
            <img
              src={NotUser}
              alt="User Image"
              className="w-7 h-7 rounded-full"
            />
            <span className="m-0">مستخدم 1</span>
          </div>

          <Button
            type="button"
            className="animate_from_top  animation_delay-3 bg-mainColor text-base w-8 h-8 py-[1px] px-[4px] rounded-md font-normal"
            action={() => toggleLang()}
          >
            {isRTL ? "Ar" : "En"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
