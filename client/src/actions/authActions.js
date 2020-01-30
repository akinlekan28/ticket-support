import axios from "axios";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_SUCCESS,
  SET_CURRENT_USER
} from "./types";
import jwt_decode from "jwt-decode";
import setAuthToken from '../utils/setAuthToken';

//Register user
export const registerUser = userData => dispatch => {
  dispatch(clearErrors());
  return axios
    .post("/api/v1/user/register", userData)
    .then(res =>
      dispatch({
        type: GET_SUCCESS,
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

//Login user
export const loginUser = userData => dispatch => {
  dispatch(clearErrors());
  return axios
    .post("/api/v1/user/login", userData)
    .then(res => {
      //Save to local storage
      const { token } = res.data;

      //Set token to local storage
      localStorage.setItem("jwtToken", token);

      //Set auth token to header
      setAuthToken(token);

      //Decode token to get user data
      const decoded = jwt_decode(token);

      //Set current user
      dispatch(setCurrentUser(decoded));
    })
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

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//log user out
export const logoutUser = () => dispatch => {
  //remove token form localstorage
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to {} which also sets isAuthenticated to false
  dispatch(setCurrentUser({}));
};

//Clear Error
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
