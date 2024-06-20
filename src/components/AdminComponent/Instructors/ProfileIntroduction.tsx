import { t } from "i18next";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import MainCheckBox from "../../UI/MainCheckBox";

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
          <input
            type="checkbox"
            id="instructor_blocking"
            name="instructor_blocking"
          />
          <label
            htmlFor="instructor_blocking"
            className="text-base font-medium text-black ms-2"
          >
            {t("blocking instructor")}
          </label>
        </div>

        <HiOutlineDotsHorizontal
          size={30}
          className="mb-6 fill-mainGray opacity-55"
        />
      </div>
    </div>
  );
};

export default ProfileIntroduction;
