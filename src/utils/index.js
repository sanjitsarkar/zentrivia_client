const ACTION_TYPE_LOADING = "LOADING";
const ACTION_TYPE_SUCCESS = "SUCCESS";
const ACTION_TYPE_FAILURE = "FAILURE";

export { ACTION_TYPE_FAILURE, ACTION_TYPE_SUCCESS, ACTION_TYPE_LOADING };
export const API_URL = "http://localhost:5000/api";

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
