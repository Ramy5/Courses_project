import MainCheckBox from "../../UI/MainCheckBox";
import DotsDropDown from "../../UI/DotsDropDown";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";

interface PersonlyProfile {
  personalData: any;
  blocking?: boolean
}

const ProfileIntroduction = ({ personalData, blocking }: PersonlyProfile) => {
  const [openRow, setOpenRow] = useState<number | null>(null);

  const handleToggleDropDown = (id: number) => {
    setOpenRow((prevOpenRow) => (prevOpenRow == id ? null : id));
  };

  return (
    <div className="relative">
      <div className="profileCover"></div>
      <div className="absolute flex items-end justify-between w-full md:px-12 px-5 md:top-32 top-[155px]">
        <div className="flex items-end gap-3">
          <img
            src={personalData.personalImage}
            alt="personal Image"
            className="border-[3px] border-[#393D94] rounded-full md:w-[134px] w-24"
          />
          <div className="text-black">
            <h2 className="md:text-xl font-semibold text-lg">
              {personalData.name}
            </h2>
            <p className="md:text-base font-medium text-sm">
              {personalData.jobTitle}
            </p>
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
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileIntroduction;
