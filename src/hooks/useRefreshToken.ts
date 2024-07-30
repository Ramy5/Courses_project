import customFetch from "../utils/axios";
import { useAppSelector } from "./reduxHooks";

const useRefreshToken = () => {
  const { user } = useAppSelector((slice: any) => slice.user);

  const refresh = async () => {
    const response = await customFetch("", {
      withCredentials: true,
    });
  };

  return refresh;
};

export default useRefreshToken;
