import { t } from "i18next"
import {
    toast,
    ToastOptions as ToastOptions_TP,
    ToastPosition,
  } from "react-toastify"
  
  const toastOptions: ToastOptions_TP = {
    position: "top-right",
    autoClose: 900,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  }
  
  const STYLES = {
    success: "bg-mainColor text-white",
    error: "bg-mainRed text-white",
    info: "bg-blue-400 text-white",
  }
  
  type ToastType = keyof typeof STYLES 
  
  export const notify = (
    type: ToastType = "success",
    msg?: string,
    position: ToastPosition = "top-right",
    autoClose?: number
  ) => {
    let message = msg || `${t("operation accomplished successfully")}`
  
    if (type === "error" && !!!msg) {
      message = `${t("something went wrong, try again later.")}`
    }
    const className = STYLES[type]
  
    toast[type](message, {
      ...toastOptions,
      autoClose,
      className,
      position,
    })
  }