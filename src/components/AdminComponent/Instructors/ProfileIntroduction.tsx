import MainCheckBox from "../../UI/MainCheckBox";
import DotsDropDown from "../../UI/DotsDropDown";

const ProfileIntroduction = ({ instructorPersonalData }: any) => {
  return (
    <div className="relative">
      <div className="profileCover"></div>
      <div className="flex justify-between items-end absolute px-12 top-32 w-full">
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

        <DotsDropDown instructorId={instructorPersonalData.id} instructorRoute="/instructorEdit" />
      </div>
    </div>
  );
};

export default ProfileIntroduction;
