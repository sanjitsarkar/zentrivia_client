import toast from "react-hot-toast";
import { callApi } from "./callApi";

const ACTION_TYPE_LOADING = "LOADING";
const ACTION_TYPE_SUCCESS = "SUCCESS";
const ACTION_TYPE_FAILURE = "FAILURE";

export { ACTION_TYPE_FAILURE, ACTION_TYPE_SUCCESS, ACTION_TYPE_LOADING };
export { callApi };
export const API_URL = "https://zentrivia.herokuapp.com/api";

export const formatError = (err) => {
  if (err.response.data.errors) {
    return err.response.data.errors.join(", ");
  }
  return err.message;
};

export const GUEST_CREDENTIAL = {
  email: "johndoe@gmail.com",
  password: "123456",
};

export const initialSignupCredState = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

export const initialLoginCredState = { email: "", password: "" };
export const notify = (content, type = "success") => toast(content, { type });
export const PROFILE_PIC_PLACEHOLDER =
  "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-7.jpg";
