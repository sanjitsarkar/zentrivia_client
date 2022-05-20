import toast from "react-hot-toast";
export { callApi } from "./callApi";
export { uploadImages } from "./cloudinaryService";
export { ACTION_TYPE_FAILURE, ACTION_TYPE_SUCCESS, ACTION_TYPE_LOADING };

const ACTION_TYPE_LOADING = "LOADING";
const ACTION_TYPE_SUCCESS = "SUCCESS";
const ACTION_TYPE_FAILURE = "FAILURE";

export const API_URL = "https://zentrivia.herokuapp.com/api";

export const formatError = (err) => {
  if (err?.response?.data?.errors) {
    return err?.response?.data?.errors.join(", ");
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
export const initialQuizState = {
  title: "",
  quizDifficulty: "",
  categoryId: "",
  quizDesc: "",
};
export const initialQuestionState = {
  title: "",
  quizId: "",
  options: [
    { value: "", isCorrect: true },
    { value: "", isCorrect: false },
    { value: "", isCorrect: false },
    { value: "", isCorrect: false },
  ],
};
export function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}
export const initialLoginCredState = { email: "", password: "" };
export const initialProfileState = { name: "", profilePictureURL: "" };
export const notify = (content, type = "success") => toast(content, { type });
export const PROFILE_PIC_PLACEHOLDER =
  "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-7.jpg";
export const QUIZ_COVER_PLACEHOLDER =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrTqWO5uNGlWvFPbTZ5D4louJmj10rApxkeA&usqp=CAU";
