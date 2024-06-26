import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NotUser from "../../assets/navBar/no-user.svg";
import DateImg from "../../assets/navBar/date.svg";
import Notification from "../../assets/navBar/notification.svg";
import { useRTL } from "../../hooks/useRTL";
import Button from "../UI/Button";
import SearchInput from "../UI/SearchInput";
import { RxCross2 } from "react-icons/rx";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { SideBarProps } from "./SideBar";

const NavBar: React.FC<SideBarProps> = ({
  setToggleSideBar,
  toggleSideBar,
}) => {
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

  return (
    <div className="flex items-center justify-between h-16 px-4 w-100">
      <div className="flex items-center">
        <Button
          action={() => setToggleSideBar((curr) => !curr)}
          className="p-1.5 rounded-lg bg-mainColor sm:hidden block"
        >
          <HiBars3CenterLeft size={24} className="fill-white" />
        </Button>
        <div className="hidden items-center gap-2 px-4 py-6 w-100 sm:flex">
          <img src={DateImg} alt="date" />
          <p>{currentDate}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 me-2">
        <div className="flex items-center justify-center gap-3">
          <div className="me-6 hidden lg:block">
            <SearchInput />
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
