/*
@
 This file contains the requests ( services )
@
*/

import axiosInstance from "../../config/axios-instance";

function logoutRequest() {
  return axiosInstance({
    method: "get",
    url: "auth/logout",
    data: null
  });
}

function signinRequest(body) {
  return axiosInstance({
    method: "post",
    url: "auth/signin",
    data: body
  });
}

function signupRequest(body) {
  return axiosInstance({
    method: "post",
    url: "auth/signup",
    data: body
  });
}
function validateAccountRequest(body) {
  return axiosInstance({
    method: "post",
    url: process.env.MIX_BACKEND_PREFIX + "/validate-account",
    data: body
  });
}

function getAuthUserRequest() {
  return axiosInstance({
    method: "get",
    url: process.env.MIX_BACKEND_PREFIX + "/is-auth"
  });
}

function updateTheUserRequest(body, userId) {
  console.log(body, userId);
  return axiosInstance({
    method: "put",
    url: "/users/" + userId,
    data: { ...body, _method: "patch" }
  });
}

const AuthServices = {
  signinRequest,
  signupRequest,
  logoutRequest,
  getAuthUserRequest,
  updateTheUserRequest,
  validateAccountRequest
};

export default AuthServices;
