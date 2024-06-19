import { Form, Formik } from "formik";
import BaseInput from "../../UI/BaseInput";
import { t } from "i18next";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

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
          <input
            type="checkbox"
            id="instructor_blocking"
            name="instructor_blocking"
          />
          <label
            htmlFor="instructor_blocking"
            className="text-black text-base font-medium ms-2"
          >
            {t("blocking instructor")}
          </label>
        </div>

        <HiOutlineDotsHorizontal
          size={30}
          className="fill-mainGray opacity-55 mb-6"
        />
      </div>
    </div>
  );
};

export default ProfileIntroduction;
