import MainCheckBox from "../../UI/MainCheckBox";
import DotsDropDown from "../../UI/DotsDropDown";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const ProfileIntroduction = ({ instructorPersonalData }: any) => {
  return (
    <div className="relative">
      <div className="profileCover"></div>
      <div className="absolute flex items-end justify-between w-full px-12 top-32">
        <div className="flex items-end gap-3">
          <img
            src={instructorPersonalData.personalImage}
            alt="personal Image"
            className="border-[3px] border-[#393D94] rounded-full"
          />
          <div className="text-black">
            <h2 className="text-xl font-semibold">
              {instructorPersonalData.instructorName}
            </h2>
            <p className="text-base font-medium">
              {instructorPersonalData.jobTitle}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <MainCheckBox
            id="instructor_block"
            name="instructor_block"
            label="blocking instructor"
          />
        </div>
        <div className="mb-3">
          <DotsDropDown
            instructorId={instructorPersonalData.id}
            instructorRoute="/instructors/instructorEdit"
            firstName="edit"
            firstIcon={<FaRegEdit size={22} className="fill-mainColor" />}
            secondName="delete"
            secondIcon={<RiDeleteBin5Line size={22} className="fill-mainRed" />}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileIntroduction;
