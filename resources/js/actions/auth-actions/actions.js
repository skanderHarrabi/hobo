/*
@
 This file contains the actions creators
@
*/

import {
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILURE,
  GET_AUTH_REQUEST,
  LOGOUT_REQUEST,
  CONNECT_THE_USER,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  VALIDATE_ACCOUNT_REQUEST,
  VALIDATE_ACCOUNT_FAILURE,
  VALIDATE_ACCOUNT_SUCCESS
} from "./types";
import { message, notification } from "antd";
import AuthServices from "./service";
import { removeErrors, setErrors } from "../errors-actions/actions";

export function getAuthUser() {
  return async dispatch => {
    await dispatch({
      type: GET_AUTH_REQUEST
    });
    try {
      const response = await AuthServices.getAuthUserRequest();
      await dispatch({
        type: GET_AUTH_SUCCESS,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: GET_AUTH_FAILURE
      });
    }
  };
}

export function signin(values) {
  return async dispatch => {
    dispatch({ type: SIGNIN_REQUEST });
    try {
      const response = await AuthServices.signinRequest(values);
      dispatch({ type: SIGNIN_SUCCESS, payload: response.data });
      localStorage.setItem(
        process.env.MIX_APP_TOKEN_NAME,
        response.data.access_token
      );

      message.success("Bienvenu", 5);
    } catch (e) {
      dispatch({ type: SIGNIN_FAILURE });
    }
  };
}

export function signup(body) {
  return async dispatch => {
    dispatch({ type: SIGNUP_REQUEST });
    try {
      const response = await AuthServices.signupRequest(body);
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
      localStorage.setItem(
        process.env.MIX_APP_TOKEN_NAME,
        response.data.access_token
      );
      message.success("Merci pour votre confiance, Bienvenue!", 5);
    } catch (e) {
      dispatch({ type: SIGNUP_ERROR });
    }
  };
}

export function logout() {
  return async dispatch => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
      //await AuthServices.logoutRequest();
      localStorage.removeItem(process.env.MIX_APP_TOKEN_NAME);
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (e) {
      dispatch({ type: LOGOUT_FAILURE });
    }
  };
}

export function connectTheUser(token) {
  return dispatch => {
    localStorage.setItem(process.env.MIX_APP_TOKEN_NAME, token);
    dispatch({
      type: CONNECT_THE_USER,
      payload: {
        token: token
      }
    });
  };
}

const openNotification = () => {
  notification.open({
    message: "Compte à jour",
    description: "Votre compte a été mis à jour."
  });
};

export function updateTheUser(body, userId) {
  return async dispatch => {
    dispatch(removeErrors());
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    try {
      const response = await AuthServices.updateTheUserRequest(body, userId);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: response.data
      });
      openNotification();
      dispatch(removeErrors());
    } catch (e) {
      dispatch({
        type: UPDATE_USER_FAILURE
      });
    }
  };
}

export function validateAccount(body) {
  return async dispatch => {
    dispatch({ type: VALIDATE_ACCOUNT_REQUEST });
    try {
      const response = await AuthServices.validateAccountRequest(body);
      dispatch({ type: VALIDATE_ACCOUNT_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({ type: VALIDATE_ACCOUNT_FAILURE });
      dispatch(setErrors(e.response.data));
    }
  };
}
