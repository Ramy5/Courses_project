interface MainRadio_TP {
  name: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  checked?: boolean;
  labelClassName?: string;
  label: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MainRadio = (props: MainRadio_TP) => {
  const {
    name,
    id,
    disabled,
    className,
    checked,
    labelClassName,
    label,
    value,
    onChange,
  } = props;

  return (
    <div className="flex items-center gap-2 ">
      <input
        type="radio"
        id={id || name}
        disabled={disabled}
        className={`${className} w-5 h-5 cursor-pointer`}
        checked={checked}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={(id || name) as string}
        className={`${labelClassName} text-lg cursor-pointer`}
      >
        {label}
      </label>
    </div>
  );
};

export default MainRadio;
