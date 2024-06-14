import { StylesConfig } from "react-select";

// ADD CUSTOM STYLES FOR SELECT IN THE APP
interface selectOption_TP {
  value: string;
  label: string;
}

export const customStyles: StylesConfig<selectOption_TP, false> = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#00B8D9" : "#CED4DA",
    boxShadow: state.isFocused
      ? "0 0 0 0.2rem rgba(0, 136, 217, 0.25)"
      : "none",
    borderRadius: "4px",
    minHeight: "40px",
    backgroundColor: state.isDisabled ? "#E9ECEF" : "white",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#00B8D9"
      : state.isFocused
      ? "#E6F0FF"
      : null,
    color: state.isSelected ? "white" : "#495057",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",

    ":hover": {
      backgroundColor: state.isSelected ? "#00B8D9" : "#F0F0F0",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#495057",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#F0F0F0",
    borderRadius: "20px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#495057",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#868E96",
    ":hover": {
      backgroundColor: "#CED4DA",
      color: "#495057",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#ADB5BD",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
