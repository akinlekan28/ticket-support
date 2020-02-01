import {
  GET_ALL_TICKETS,
  SET_LOADING,
  REMOVE_LOADING,
  GET_COMMENTS,
  ADD_TICKET,
  CLOSE_TICKET
} from "../actions/types";

const initialState = {
  ticket: {},
  tickets: [],
  comments: [],
  loading: false,
  test: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        loading: false
      };

    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };

    case ADD_TICKET:
      return {
        ...state,
        ticket: action.payload,
        tickets: [action.payload, ...state.tickets]
      };

    case CLOSE_TICKET:
      return {
        ...state,
        ticket: action.payload
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    case REMOVE_LOADING:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
