import { t } from "i18next";
import { ChangeEvent } from "react";

interface MainCheckBox_TP {
  name: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  checked?: boolean;
  labelClassName?: string;
  label?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MainCheckBox = (props: MainCheckBox_TP) => {
  const {
    name,
    id,
    disabled,
    className,
    checked,
    labelClassName,
    label,
    onChange,
    onClick,
  } = props;

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id || name}
        disabled={disabled}
        className={`${className} w-5 h-5 cursor-pointer`}
        checked={checked}
        name={name}
        onChange={onChange}
        onClick={onClick}
      />
      <label
        htmlFor={(id || name) as string}
        className={`${labelClassName} text-lg`}
      >
        {t(`${label}`)}
      </label>
    </div>
  );
};

export default MainCheckBox;
