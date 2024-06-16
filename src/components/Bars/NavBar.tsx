import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NotUser from "../../assets/navBar/no-user.svg";
import DateImg from "../../assets/navBar/date.svg";
import SearchImg from "../../assets/navBar/search.svg";
import Notification from "../../assets/navBar/notification.svg";
import { useRTL } from "../../hooks/useRTL";
import BaseInput from "../UI/BaseInput";
import { Form, Formik } from "formik";
import Button from "../UI/Button";

type InitialValues_TP = {
  search: string;
};

const NavBar = () => {
  const [currentDate, setCurrentDate] = useState<string>("");

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
    <div className="flex items-center justify-between h-16 px-4 w-100">
      <div className="flex items-center gap-1 px-4 py-6 w-100">
        <img src={DateImg} alt="date" />
        <p>{currentDate}</p>
      </div>
      <div className="flex items-center gap-4 me-2">
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
                  className="absolute z-50 w-5 h-5 -translate-y-1/2 top-1/2 right-2"
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
              className="rounded-full w-7 h-7"
            />
            <span className="m-0">مستخدم 1</span>
          </div>

          <Button
            type="button"
            className="animate_from_top  animation_delay-3 bg-mainColor text-base w-8 h-8 py-[1px] px-[4px] rounded-md font-normal"
            action={() => toggleLang()}
          >
            {isRTL ? "En" : "Ar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
