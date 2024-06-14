import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

/**
  USE THESE HOOKS INSTEAD OF useSelector AND useDispatch IN REDUX TOOLKIT TO USE THEM INSTANTLY WITHOUT WRITE ANY TYPES
*/
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
