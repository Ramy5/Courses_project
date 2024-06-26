import { t } from "i18next";
import Select from "react-select";
import {
  Button,
  DotsDropDown,
  SearchInput,
  TitlePage,
} from "../../../components";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/UI/Pagination";
import Instructor from "../../../assets/instructors/instructor.svg";
import Instructor_2 from "../../../assets/instructors/instructor_2.svg";
import Instructor_3 from "../../../assets/instructors/instructor_3.svg";
import Instructor_4 from "../../../assets/instructors/instructor_4.svg";
import { FaUserAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";

const Instructors = () => {
  const [openRow, setOpenRow] = useState<number | null>(null);

  const navigate = useNavigate();

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const instructorsData = [
    {
      id: 1,
      image: Instructor,
      name: "Dimitres Viga",
      jobTitle: "مصمم مواقع",
    },
    {
      id: 2,
      image: Instructor_2,
      name: "Viga Dimitres",
      jobTitle: "مصمم مواقع",
    },
    {
      id: 3,
      image: Instructor_3,
      name: "Dimitres Viga",
      jobTitle: "مصمم مواقع",
    },
    {
      id: 4,
      image: Instructor_4,
      name: "Viga Dimitres",
      jobTitle: "مصمم مواقع",
    },
    {
      id: 5,
      image: Instructor,
      name: "Dimitres Viga",
      jobTitle: "مصمم مواقع",
    },
  ];

  const handleProfileClick = (instructorId: number) => {
    navigate(`/instructors/instructorProfile/${instructorId}`);
  };

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

  return (
    <div>
      <div>
        <TitlePage
          mainTitle="instructors"
          supTitle=""
          icon={<FaUserAlt size={22} className="fill-mainColor" />}
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-white rounded-2xl">
        <Select options={options} placeholder="short by" />

        <SearchInput />

        <Button type="button" className="text-xl font-medium" action={() => navigate("/instructors/instructorEdit")}>
          {t("add lecturer +")}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 my-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {instructorsData.map((instructor, index) => (
          <div
            key={index}
            className="p-4 text-center bg-white rounded-2xl main_shadow"
          >
            <div className="flex items-center justify-end w-full">
              <DotsDropDown
                instructorId={instructor.id}
                instructorRoute="/instructors/instructorEdit"
                firstName="edit"
                firstIcon={<GrView size={22} className="fill-mainColor" />}
                secondName="delete"
                secondIcon={
                  <RiDeleteBin5Line size={22} className="fill-mainRed" />
                }
                isOpen={openRow == instructor.id}
                onToggle={() => handleToggleDropDown(instructor.id)}
              />
            </div>
            <div className="w-full my-2">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="rounded-full  m-auto w-[135px] h-[135px]"
              />
            </div>
            <div className="text-mainGray opacity-55">
              <p>{instructor.name}</p>
              <p>{instructor.jobTitle}</p>
            </div>
            <Button
              className="border border-[#404B52] text-black font-medium mt-3"
              bordered
              action={() => handleProfileClick(instructor.id)}
            >
              {t("profile personly")}
            </Button>
          </div>
        ))}
      </div>

      <div>
        <Pagination
          showNavigation={true}
          //   table={table}
          currentPage="1"
          totalPages={40}
        />
      </div>
    </div>
  );
};

export default Instructors;
