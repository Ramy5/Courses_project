import { Form, Formik } from "formik";
import BaseInput from "./BaseInput";
import SearchImg from "../../assets/navBar/search.svg";

type InitialValues_TP = {
  search: string;
};

const SearchInput = () => {
    
  const initialValues: InitialValues_TP = {
    search: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log("🚀 ~ NavBar ~ values:", values);
      }}
      validationSchema={""}
    >
      <Form className="relative">
        <img
          src={SearchImg}
          alt="Search"
          className="absolute z-50 w-5 h-5 -translate-y-1/2 top-1/2 right-2"
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
