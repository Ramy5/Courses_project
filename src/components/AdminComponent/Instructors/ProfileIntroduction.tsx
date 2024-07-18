import MainCheckBox from "../../UI/MainCheckBox";
import DotsDropDown from "../../UI/DotsDropDown";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PersonlyProfile {
  personalData: any;
  blocking?: boolean;
  navigation?: string;
  deleteInstructor?: () => void;
}

const ProfileIntroduction = ({
  personalData,
  blocking,
  navigation,
  deleteInstructor,
}: PersonlyProfile) => {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

  const jobTitle =
    personalData?.qualifications &&
    personalData?.qualifications[0]?.job_title;

  return (
    <div className="relative">
      <div className="profileCover"></div>
      <div className="absolute flex items-end justify-between w-full md:px-12 px-5 md:top-32 top-[155px]">
        <div className="flex items-end gap-3">
          <img
            src={personalData.personal_image}
            alt="personal Image"
            className="border-[3px] border-[#393D94] rounded-full md:w-[134px] w-24"
          />
          <div className="text-black">
            <h2 className="text-lg font-semibold md:text-xl">
              {personalData.full_name}
            </h2>
            <p className="md:text-base font-medium text-sm">{jobTitle}</p>
          </div>
        </div>

        {blocking && (
          <>
            <div className="md:mb-3 mb-[14px]">
              <MainCheckBox
                id="instructor_block"
                name="instructor_block"
                label="blocking instructor"
                labelClassName="!md:text-lg !text-sm"
              />
            </div>
            <div>
              <DotsDropDown
                instructorId={personalData.id}
                instructorRoute="/instructors/instructorEdit"
                firstName="edit"
                firstIcon={<FaRegEdit size={22} className="fill-mainColor" />}
                secondName="delete"
                secondIcon={
                  <RiDeleteBin5Line size={22} className="fill-mainRed" />
                }
                isOpen={openRow == personalData.id}
                onToggle={() => handleToggleDropDown(personalData.id)}
                onFirstClick={() => {
                  navigate(`${navigation}${personalData.id}`);
                }}
                onSecondClick={() => {
                  deleteInstructor();
                  navigate(-1)
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileIntroduction;
