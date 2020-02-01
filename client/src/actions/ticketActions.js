import axios from "axios";
import {
  GET_ALL_TICKETS,
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_LOADING,
  GET_COMMENTS,
  ADD_TICKET
} from "./types";

//Get all user tickets
export const getTickets = () => async dispatch => {
  try {
    const tickets = await axios.get("/api/v1/ticket");
    dispatch({
      type: GET_ALL_TICKETS,
      payload: tickets.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

//Get all ticket comments
export const getComments = () => async dispatch => {
  try {
    const comments = await axios.get("/api/v1/comment");
    dispatch({
      type: GET_COMMENTS,
      payload: comments.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

//Add a ticket
export const addTicket = ticketData => async dispatch => {
  try {
    const ticket = await axios.post("/api/v1/ticket", ticketData);
    return dispatch({
      type: ADD_TICKET,
      payload: ticket.data.ticket
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
    dispatch(() => {
      setTimeout(function() {
        dispatch(clearErrors());
      }, 5000);
    });
  }
};

//Set loading state
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

//Clear Error
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
