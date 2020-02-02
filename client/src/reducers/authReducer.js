import {
  SET_CURRENT_USER,
  SET_LOADING,
  REMOVE_LOADING,
  GET_USERS,
  DELETE_USER,
  GET_PROFILE
} from "../actions/types";
import isEmpty from "../utils/is-empty";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
  users: [],
  profile: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };

    case DELETE_USER:
      return {
        ...state
      };

    case SET_LOADING:
      return { loading: true };

    case REMOVE_LOADING:
      return { loading: false };

    default:
      return state;
  }
}
