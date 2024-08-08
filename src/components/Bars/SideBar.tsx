import { useEffect, useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { FaFolder } from "react-icons/fa6";
import { FaRegEdit, FaUserAlt } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { CgPlayButtonR } from "react-icons/cg";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { t } from "i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../UI/SearchInput";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { FiCalendar } from "react-icons/fi";
import { IoBulbOutline } from "react-icons/io5";
import { TbFileText } from "react-icons/tb";
import { MdInsertChartOutlined } from "react-icons/md";
import { LiaBookReaderSolid } from "react-icons/lia";
import { SlBookOpen } from "react-icons/sl";
import customFetch from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { changeSidebarColor } from "../../features/global/globalSlice";

export type SideBarProps = {
  setToggleSideBar: (value: boolean) => void;
  toggleSideBar: boolean;
};

const SideBar: React.FC<SideBarProps> = ({
  setToggleSideBar,
  toggleSideBar,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarColor } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 640);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setToggleSideBar(false);
    } else {
      setToggleSideBar(true);
    }
  }, [isSmallScreen]);

  // const getOrganizationSetting = async () => {
  //   const { data } = await customFetch.get("setting/1");
  //   return data.data.setting;
  // };

  // const { data } = useQuery({
  //   queryKey: ["get-setting-data"],
  //   queryFn: getOrganizationSetting,
  // });

  // useEffect(() => {
  //   dispatch(changeSidebarColor(data?.color));
  // }, [data?.color, dispatch]);

  const { role: userData } = useAppSelector((state) => state.user);

  const sideBarItemsOfAdmin = [
    {
      title: "Information Panel",
      icon: <CiGrid41 size={24} />,
      alert: "alt",
      link: "/informationPanel",
    },
    {
      title: "Programs",
      icon: <FaFolder size={24} />,
      alert: "alt",
      link: "/programs",
    },
    {
      title: "instructors",
      icon: <FaUserAlt size={24} />,
      alert: "alt",
      link: "/instructors",
    },
    {
      title: "students",
      icon: <PiStudentBold size={24} />,
      alert: "alt",
      link: "/students",
    },
    {
      title: "Lecture Management",
      icon: <FaChalkboardTeacher size={24} />,
      alert: "alt",
      link: "/lectureManagement",
    },
    {
      title: "Virtual Classroom",
      icon: <CgPlayButtonR size={24} />,
      alert: "alt",
      link: "/virtualClasses",
    },
    {
      title: "Test Management",
      icon: <FiFileText size={24} />,
      alert: "alt",
      link: "/testManagement",
    },
    {
      title: "Reports",
      icon: <HiOutlineDocumentReport size={24} />,
      alert: "alt",
      link: "/reports",
    },
    {
      title: "settings",
      icon: <IoMdSettings size={24} />,
      alert: "alt",
      link: "/settings",
    },
  ];

  const sideBarItemsOfStudents = [
    {
      title: "Information Panel",
      icon: <CiGrid41 size={24} />,
      alert: "alt",
      link: "/student/informationPanel",
    },
    {
      title: "profile personly",
      icon: <PiStudentBold size={24} />,
      alert: "alt",
      link: "/student/PersonlyProfile",
    },
    {
      title: "school schedule",
      icon: <FiCalendar size={24} />,
      alert: "alt",
      link: "/student/schedule",
    },
    {
      title: "Courses",
      icon: <LiaBookReaderSolid size={24} />,
      alert: "alt",
      link: "/student/Courses",
    },
    {
      title: "Virtual Classroom",
      icon: <CgPlayButtonR size={24} />,
      alert: "alt",
      link: "/students/virtualClasses",
    },
    {
      title: "homeworks",
      icon: <SlBookOpen size={24} />,
      alert: "alt",
      link: "/students/homeworks",
    },
    {
      title: "Projects",
      icon: <IoBulbOutline size={24} />,
      alert: "alt",
      link: "/students/projects",
    },
    {
      title: "exams",
      icon: <TbFileText size={24} />,
      alert: "alt",
      link: "/student/exams",
    },
    {
      title: "student grades",
      icon: <MdInsertChartOutlined size={24} />,
      alert: "alt",
      link: "/students/grades",
    },
    {
      title: "settings",
      icon: <IoMdSettings size={24} />,
      alert: "alt",
      link: "/students/setting",
    },
  ];

  const sideBarItemsOfInstructor = [
    {
      title: "Information Panel",
      icon: <CiGrid41 size={24} />,
      alert: "alt",
      link: "/instructor/informationPanel",
    },
    {
      title: "profile personly",
      icon: <PiStudentBold size={24} />,
      alert: "alt",
      link: "/instructor/Profile",
    },
    {
      title: "school schedule",
      icon: <FiCalendar size={24} />,
      alert: "alt",
      link: "/instructor/schedule",
    },
    {
      title: "record attendance",
      icon: <FaRegEdit size={24} />,
      alert: "alt",
      link: "/instructor/attendance",
    },
    {
      title: "Courses",
      icon: <LiaBookReaderSolid size={24} />,
      alert: "alt",
      link: "/instructor/Courses",
    },
    {
      title: "Virtual Classroom",
      icon: <CgPlayButtonR size={24} />,
      alert: "alt",
      link: "/instructors/virtualClasses",
    },
    {
      title: "homeworks",
      icon: <SlBookOpen size={24} />,
      alert: "alt",
      link: "/instructors/homeworks",
    },
    {
      title: "Projects",
      icon: <IoBulbOutline size={24} />,
      alert: "alt",
      link: "/instructors/projects",
    },
    {
      title: "exams",
      icon: <TbFileText size={24} />,
      alert: "alt",
      link: "/instructor/exams",
    },
    {
      title: "settings",
      icon: <IoMdSettings size={24} />,
      alert: "alt",
      link: "/instructor/setting",
    },
  ];

  const sideBarAdmin =
    userData === "admin"
      ? sideBarItemsOfAdmin
      : userData === "teacher"
      ? sideBarItemsOfInstructor
      : sideBarItemsOfStudents;

  const handleNavigate = (link: String) => {
    navigate(link);
    if (isSmallScreen) {
      setToggleSideBar(false);
    }
  };

  const getCurrentPathName = (path: string) => {
    const segments = path.split("/").filter(Boolean);

    const segmentsType =
      userData !== "admin" && segments.length > 0
        ? `/${segments[0]}/${segments[1]}`
        : `/${segments[0]}`;

    return segmentsType;
  };

  const currentPathtName = getCurrentPathName(location.pathname);

  return (
    <aside
      className={`${
        toggleSideBar ? "right-0" : " -right-full"
      } sm:static fixed w-full transition-all duration-300 col-start-1 col-end-2 row-start-1 row-end-3 top-0 h-full z-50`}
    >
      <nav
        className="flex flex-col h-full border-r shadow-sm "
        style={{ backgroundColor: sidebarColor || "#393D94" }}
      >
        <div className="flex items-center justify-between p-4 pb-2">
          <button
            onClick={() => setToggleSideBar((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {toggleSideBar ? (
              <RxCross2 size={24} className="fill-mainColor" />
            ) : (
              <HiBars3CenterLeft size={24} className="fill-mainColor" />
            )}
          </button>
        </div>

        <ul className="flex-1 mt-6 ps-2">
          {toggleSideBar && (
            <li className="block mt-2 mb-6 ms-1 me-3 lg:hidden trans">
              <SearchInput />
            </li>
          )}
          {sideBarAdmin.map((item, index) => (
            <li
              key={index}
              className={`
                        relative flex items-center py-2 px-3 my-1 gap-3 h-10
                        font-medium rounded-s-full cursor-pointer
                        transition-colors group text-[#E7E7E7]
                        ${
                          currentPathtName == item.link
                            ? "bg-[#F9F9F9] !text-mainColor"
                            : `hover:bg-[#F9F9F9] hover:text-mainColor`
                        }
                    `}
              onClick={() => handleNavigate(item.link)}
              // href={item.link}
            >
              {item.icon}
              <span
                className={`overflow-hidden transition-all truncate ${
                  toggleSideBar ? "w-40 ml-3" : "w-0"
                }`}
              >
                {t(item.title)}
              </span>

              {/* {item.alert && (
                <div
                  className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                    toggleSideBar ? "" : "top-2"
                  }`}
                />
              )} */}

              {/* {!toggleSideBar && (
                <div
                  className={`
                          absolute left-full rounded-md px-2 py-1 ml-6
                          bg-[#E7E7E7] text-mainColor text-sm
                          invisible opacity-20 -translate-x-3 transition-all
                          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                      `}
                >
                  {t(item.title)}
                </div>
              )} */}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
