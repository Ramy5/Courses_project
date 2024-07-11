import { t } from "i18next";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { MdPhoneIphone } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";

const InstructorSocialInformation = ({ personalData }: any) => {
  console.log("🚀 ~ InstructorSocialInformation ~ personalData:", personalData);

  const contactInfo =
  personalData?.contactInfo.length && personalData?.contactInfo[0];
  console.log("🚀 ~ InstructorSocialInformation ~ contactInfo:", contactInfo)

  return (
    <div className="px-8 py-6 mx-5 bg-mainBg rounded-2xl mt-28">
      <div className="flex flex-col items-center justify-between md:flex-row gap-y-5">
        <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:text-start lg:items-start">
          <div
            className="w-[50px] h-[50px] rounded-full bg-mainColor flex items-center justify-center "
            style={{ boxShadow: "0px 4px 4px 0px #00000080" }}
          >
            <MdPhoneIphone size={26} className="fill-white" />
          </div>
          <div className="mt-[6px] lg:mt-3 font-medium">
            <p className="text-mainGray">{t("phone")}</p>
            <span>{contactInfo?.phone}</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:text-start lg:items-start">
          <div
            className="w-[50px] h-[50px] rounded-full bg-mainColor text-white flex items-center justify-center"
            style={{ boxShadow: "0px 4px 4px 0px #00000080" }}
          >
            <HiOutlineMail size={26} />
          </div>
          <div className="mt-[6px] lg:mt-3 font-medium">
            <p className="text-mainGray">{t("E-mail")}</p>
            <span>{personalData?.email}</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:text-start lg:items-start">
          <div
            className="w-[50px] h-[50px] rounded-full bg-mainColor text-white flex items-center justify-center"
            style={{ boxShadow: "0px 4px 4px 0px #00000080" }}
          >
            <IoLocationOutline size={26} />
          </div>
          <div className="mt-[6px] lg:mt-3 font-medium">
            <p className="text-mainGray">{t("address")}</p>
            <span>{personalData?.address}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 my-12 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <FaLinkedin size={32} className="rounded-xl fill-[#0A66C2]" />
          <a
            href={contactInfo?.linkedIn}
            className="font-medium"
            target="_blank"
          >
            {contactInfo?.linkedIn}
          </a>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <FaFacebook size={32} fill="#1877F2" />
          <a
            href={contactInfo?.facebook}
            className="font-medium"
            target="_blank"
          >
            {contactInfo?.facebook}
          </a>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <RiWhatsappFill size={32} fill="#60D669" />
          <a
            href={contactInfo?.whatsApp}
            className="font-medium"
            target="_blank"
          >
            {contactInfo?.whatsApp}
          </a>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <FaTwitter size={32} fill="#55ACEE" />
          <a
            href={contactInfo?.twitter}
            className="font-medium"
            target="_blank"
          >
            {contactInfo.twitter}
          </a>
        </div>
      </div>
    </div>
  );
};

export default InstructorSocialInformation;
