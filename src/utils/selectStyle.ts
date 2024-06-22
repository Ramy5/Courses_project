import { StylesConfig, GroupBase } from 'react-select';

interface CustomOption {
  label: string;
  value: string;
}

const selectStyle: StylesConfig<CustomOption, false, GroupBase<CustomOption>> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#E6EAEE",
      borderRadius: "10px",
      boxShadow: "0px 4px 4px 0px #00000040",
      border: "0",
      minHeight: "44px",
      cursor: "pointer",
      padding: "6px 8px"
    }),
    option: (provided, state) => {
      let backgroundColor = "";
      let color = "";
      if (state.isSelected) {
        backgroundColor = "#393D94";
        color = "white";
      } else if (state.isFocused) {
        backgroundColor = "white";
        color = "#000";
      }
  
      return {
        ...provided,
        backgroundColor,
        color,
        fontWeight: "500",
      };
    },
    singleValue: (provided) => ({
      ...provided,
      color: "black",
      fontWeight: "500",
    }),
    valueContainer: (provided) => ({
      ...provided,
    //   overflowX: "auto",
    //   overflowY: "hidden",
      whiteSpace: "nowrap",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "10px",
      boxShadow: "0px 4px 4px 0px #00000040",
      backgroundColor: "#E6EAEE",
    }),
  };
  
  export default selectStyle;