import {
  CLEAR_AUTH_ERROR,
  REMOVE_ERRORS,
  SET_AUTH_ERROR,
  SET_ERRORS
} from "../actions/errors-actions/types";

const intialState = {
  message: "",
  errors: [],
  authError: null
};

const errorsReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        errors: action.payload.errors
      };

    case REMOVE_ERRORS:
      return intialState;

    case SET_AUTH_ERROR:
      return {
        ...state,
        authError: action.payload
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        authError: null
      };

    default:
      return state;
  }
};

export default errorsReducer;
