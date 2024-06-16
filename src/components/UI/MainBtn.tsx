import Loading from "./Loading";

interface MainBtn_TP {
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onclick?: () => void;
  btnText: string;
}

const MainBtn = (props: MainBtn_TP) => {
  const {
    type = "button",
    className,
    disabled,
    loading,
    onclick,
    btnText,
  } = props;

  return (
    <button
      type={type}
      className={`${className} rounded-full bg-[#393D94] hover:bg-[#393D94]/90 hover:shadow-lg transition-all duration-300 text-white py-4 px-6`}
      disabled={disabled || loading}
      onClick={onclick}
    >
      {loading && <Loading />}
      {btnText}
    </button>
  );
};

export default MainBtn;
