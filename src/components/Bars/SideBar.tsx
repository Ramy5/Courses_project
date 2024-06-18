import { useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { FaFolder } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { CgPlayButtonR } from "react-icons/cg";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { t } from "i18next";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../UI/SearchInput";

const SideBar = () => {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const sideBarItems = [
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
      title: "Lecturers",
      icon: <FaUserAlt size={24} />,
      alert: "alt",
      link: "/lecturers",
    },
    {
      title: "Students",
      icon: <PiStudentBold size={24} />,
      alert: "alt",
      link: "/students",
    },
    {
      title: "Lecture Management",
      icon: <FaChalkboardTeacher size={24} />,
      alert: "alt",
      link: "/lecture-management",
    },
    {
      title: "Virtual Classroom",
      icon: <CgPlayButtonR size={24} />,
      alert: "alt",
      link: "/virtual-classroom",
    },
    {
      title: "Test Management",
      icon: <FiFileText size={24} />,
      alert: "alt",
      link: "/test-management",
    },
    {
      title: "Reports",
      icon: <HiOutlineDocumentReport size={24} />,
      alert: "alt",
      link: "/reports",
    },
    {
      title: "Settings",
      icon: <IoMdSettings size={24} />,
      alert: "alt",
      link: "/settings",
    },
  ];

  const handleNavigate = (link: String) => {
    navigate(link);
  };

  return (
    <aside className="col-start-1 col-end-2 row-start-1 row-end-3">
      <nav className="flex flex-col h-full border-r shadow-sm bg-mainColor">
        <div className="flex items-center justify-between p-4 pb-2">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? (
              <RxCross2 size={24} />
            ) : (
              <HiBars3CenterLeft size={24} />
            )}
          </button>
        </div>

        <ul className="flex-1 mt-6 ps-2">
          {expanded && (
            <li className="block mt-2 mb-6 ms-1 me-3 lg:hidden">
              <SearchInput />
            </li>
          )}
          {sideBarItems.map((item, index) => (
            <li
              key={index}
              className={`
                        relative flex items-center py-2 px-3 my-1 gap-3 h-10
                        font-medium rounded-s-full cursor-pointer
                        transition-colors group text-[#E7E7E7]
                        ${
                          location.pathname == item.link
                            ? "bg-[#F9F9F9] !text-mainColor"
                            : "hover:bg-[#F9F9F9] hover:text-mainColor"
                        }
                    `}
              onClick={() => handleNavigate(item.link)}
            >
              {item.icon}
              <span
                className={`overflow-hidden transition-all ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                {t(item.title)}
              </span>

              {/* {item.alert && (
                <div
                  className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                    expanded ? "" : "top-2"
                  }`}
                />
              )} */}

              {/* {!expanded && (
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
