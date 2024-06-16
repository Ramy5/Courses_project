interface MainCheckBox_TP {
  name: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  checked?: boolean;
  labelClassName?: string;
  label: string;
}

const MainCheckBox = (props: MainCheckBox_TP) => {
  const { name, id, disabled, className, checked, labelClassName, label } =
    props;

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id || name}
        disabled={disabled}
        className={`${className} w-5 h-5 cursor-pointer`}
        checked={checked}
        name={name}
      />
      <label
        htmlFor={(id || name) as string}
        className={`${labelClassName} text-lg`}
      >
        {label}
      </label>
    </div>
  );
};

export default MainCheckBox;
