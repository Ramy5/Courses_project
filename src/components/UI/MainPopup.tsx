import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import { useRTL } from "../../hooks/useRTL";

type MainPopup_TP = {
  children: ReactNode;
  className?: string;
  onClose: () => void;
};

const MainPopup: React.FC<MainPopup_TP> = ({
  children,
  className,
  onClose,
}: MainPopup_TP) => {
  const isRTL = useRTL();

  return (
    <div>
      <div
        className="fixed top-0 left-0 z-40 w-full h-full bg-black opacity-70"
        onClick={onClose}
      ></div>
      <div
        className={`fixed w-[95vw] lg:w-[80vw] xl:w-[50vw] p-6 text-white transform -translate-x-1/2 -translate-y-1/2 bg-mainColor top-1/2 left-1/2 min-h-1/3 rounded-xl z-50 ${className}`}
      >
        <IoMdClose
          onClick={onClose}
          size={24}
          className={`absolute text-white transition-all duration-200 cursor-pointer top-5 ${
            isRTL ? "left-6 right-auto" : "right-6 left-auto"
          }hover:scale-110`}
        >
          X
        </IoMdClose>
        {children}
      </div>
    </div>
  );
};

export default MainPopup;
