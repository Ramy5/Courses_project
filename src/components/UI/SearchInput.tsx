import { Form, Formik } from "formik";
import BaseInput from "./BaseInput";
import SearchImg from "../../assets/navBar/search.svg";
import { useRTL } from "../../hooks/useRTL";
import { SetStateAction } from "react";

type InitialValues_TP = {
  search: string;
};

interface SearchInput_TP {
  onChange?: (e: any) => void;
  name: string;
  id?: string;
  className?: string;
  placeholder: string;
  value?: string;
}

const SearchInput: React.FC<SearchInput_TP> = ({
  onChange,
  value,
  name,
  id,
  className,
  placeholder,
}) => {
  const isRTL = useRTL();

  const initialValues: InitialValues_TP = {
    search: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {}}
      validationSchema={""}
    >
      <Form className="relative">
        <img
          src={SearchImg}
          alt="Search"
          className={`${
            isRTL ? "right-2" : "left-2"
          } absolute z-10 w-5 h-5 -translate-y-1/2 top-1/2`}
        />
        <BaseInput
          type="search"
          id={id || name}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={`border-[1px] border-[#545454] ps-8 m-0 ${className}`}
        />
      </Form>
    </Formik>
  );
};

export default SearchInput;
