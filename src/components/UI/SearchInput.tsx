import { Form, Formik } from "formik";
import BaseInput from "./BaseInput";
import SearchImg from "../../assets/navBar/search.svg";
import { useRTL } from "../../hooks/useRTL";

type InitialValues_TP = {
  search: string;
};

const SearchInput = () => {
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
          } absolute z-50 w-5 h-5 -translate-y-1/2 top-1/2`}
        />
        <BaseInput
          type="text"
          id="search"
          name="search"
          placeholder="search"
          className="border-[1px] border-[#545454] ps-8 m-0"
        />
      </Form>
    </Formik>
  );
};

export default SearchInput;
