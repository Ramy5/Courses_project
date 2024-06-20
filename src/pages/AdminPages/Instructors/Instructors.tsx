import { t } from "i18next";
import Select from "react-select";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import TitlePage from "../../../components/UI/TitlePage";
import { Button, SearchInput } from "../../../components";
import { useNavigate } from 'react-router-dom';
import Pagination from "../../../components/UI/Pagination";
import Instructor from "../../../assets/instructors/instructor.svg";
import Instructor_2 from "../../../assets/instructors/instructor_2.svg";
import Instructor_3 from "../../../assets/instructors/instructor_3.svg";
import Instructor_4 from "../../../assets/instructors/instructor_4.svg";

const Instructors = () => {
  const navigate = useNavigate();

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const instructorsData = [
    {
      id:1,
      image: Instructor,
      name: "Dimitres Viga",
      jobTitle: "مصمم مواقع",
    },
    {
      id:2,
      image: Instructor_2,
      name: "Viga Dimitres",
      jobTitle: "مصمم مواقع",
    },
    {
      id:3,
      image: Instructor_3,
      name: "Dimitres Viga",
      jobTitle: "مصمم مواقع",
    },
    {
      id:4,
      image: Instructor_4,
      name: "Viga Dimitres",
      jobTitle: "مصمم مواقع",
    },
    {
      id:5,
      image: Instructor,
      name: "Dimitres Viga",
      jobTitle: "مصمم مواقع",
    },
  ];


  const handleProfileClick = (instructorId: number) => {
    navigate(`/instructorProfile/${instructorId}`);
  };

  return (
    <div>
      <div>
        <TitlePage mainTitle="instructors" supTitle="" />
      </div>

      <div className="bg-white p-4 flex items-center justify-between rounded-2xl">
        <Select options={options} placeholder="short by" />

        <SearchInput />

        <Button type="button" className="font-medium text-xl">
          {t("add lecturer +")}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
        {instructorsData.map((instructor, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 text-center main_shadow"
          >
            <div className="w-full flex items-center justify-end">
              <HiOutlineDotsHorizontal
                size={30}
                className="fill-mainGray opacity-55"
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
