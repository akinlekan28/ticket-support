import axios from "axios";
import { GET_ERRORS, CLEAR_ERRORS, ADD_USER, SET_CURRENT_USER } from "./types";

//Register user
export const registerUser = userData => dispatch => {
  dispatch(clearErrors());
  return axios
    .post("/api/users/register", userData)
    .then(res =>
      dispatch({
        type: ADD_USER,
        payload: res.data
      })
    )
    .catch(
      err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }),
      dispatch(() => {
        setTimeout(function() {
          dispatch(clearErrors());
        }, 5000);
      })
    );
};


//Clear Error
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};