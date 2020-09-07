import {
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT_REQUEST,
  DISCONNECT_THE_USER,
  CONNECT_THE_USER,
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILURE,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE, VALIDATE_ACCOUNT_REQUEST, VALIDATE_ACCOUNT_SUCCESS, VALIDATE_ACCOUNT_FAILURE
} from "../actions/auth-actions/types";

const intialState = {
  user: null,
  isLoggedIn: false,
  isLoadingUser: true,
  token: null
};

const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_AUTH_REQUEST:
      return {
        ...state,
        isLoadingUser: true
      };
    case GET_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isLoadingUser: false
      };

    case GET_AUTH_FAILURE:
      return {
        ...state,
        isLoadingUser: false,
        isLoggedIn: false
      };

    // Sign in
    case SIGNIN_REQUEST:
      return state;

    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
        token: action.payload.access_token
      };
    case SIGNIN_FAILURE:
      return state;

    //Sign up
    case SIGNUP_REQUEST:
      return state;
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
        token: action.payload.access_token
      };
    case SIGNUP_ERROR:
      return state;

    // Logout

    case LOGOUT_REQUEST:
      return state;

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        token: null
      };
    case LOGOUT_FAILURE:
      return state;

    // Connect & disconnect user ( no interaction with the server )
    case DISCONNECT_THE_USER:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        token: null
      };

    case CONNECT_THE_USER:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token // getting token from local storage
      };

    // update the user
    case UPDATE_USER_REQUEST:
      return {
        ...state
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state
      };
    // account validation
    case VALIDATE_ACCOUNT_REQUEST:
      return state;
    case VALIDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case VALIDATE_ACCOUNT_FAILURE:
      return state;
    default:
      return state;
  }
};

export default authReducer;
