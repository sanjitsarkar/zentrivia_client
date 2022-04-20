const ACTION_TYPE_LOADING = "LOADING";
const ACTION_TYPE_SUCCESS = "SUCCESS";
const ACTION_TYPE_FAILURE = "FAILURE";

export { ACTION_TYPE_FAILURE, ACTION_TYPE_SUCCESS, ACTION_TYPE_LOADING };
export const API_URL = "https://zentrivia.herokuapp.com/api";

export const formatError = (err) => {
  if (err.response) {
    return err.response.data.errors.join(", ");
  }
  return err.message;
};
