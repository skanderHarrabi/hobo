/*
@
 This file contains the actions creators
@
*/

import {
  SET_ERRORS,
  REMOVE_ERRORS,
  SET_AUTH_ERROR,
  CLEAR_AUTH_ERROR
} from "./types";

export function setErrors(data) {
  return async dispatch => {
    dispatch({
      type: SET_ERRORS,
      payload: data
    });
  };
}

export function removeErrors() {
  return async dispatch => {
    dispatch({
      type: REMOVE_ERRORS
    });
  };
}

export function setAuthError(error) {
  return async dispatch => {
    dispatch({
      type: SET_AUTH_ERROR,
      payload: error
    });
  };
}
export function clearAuthError() {
  return async dispatch => {
    dispatch({
      type: CLEAR_AUTH_ERROR
    });
  };
}
