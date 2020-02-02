import axios from "axios";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_SUCCESS,
  SET_CURRENT_USER,
  GET_USERS,
  DELETE_USER,
  GET_PROFILE
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

//get users
export const getUsers = () => async dispatch => {
    try {
      const users = await axios.get("/api/v1/user");
      dispatch({
        type: GET_USERS,
        payload: users.data
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
}

//delete users
export const softDeleteUser = userData => async dispatch => {
    try {
      const users = await axios.put(`/api/v1/user/delete/${userData.id}`, userData);
      dispatch(getUsers())
      return dispatch({
        type: DELETE_USER,
        payload: users.data
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
}
//get user profile
export const getprofile = userId => async dispatch => {
    try {
      const users = await axios.get(`/api/v1/user/me/${userId}`);
      return dispatch({
        type: GET_PROFILE,
        payload: users.data
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
}

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
