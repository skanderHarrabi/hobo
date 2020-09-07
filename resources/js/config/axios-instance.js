import axios from "axios";
import store from "../stores/store-dev";
import { logout } from "../actions/auth-actions/actions";
import { history } from "../index";
import {
  clearAuthError,
  setAuthError,
  setErrors
} from "../actions/errors-actions/actions";

const token = localStorage.getItem("halber_token");

const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
});

axiosInstance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    store.dispatch(clearAuthError());
    return config;
  },
  function(error) {
    // Do something with request error
    // cnx is down maybe
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    switch (error.response.status) {
      case 401:
        // unauthorized -> token is invalid or expired
        // User must reconnect!
        if (history.location.pathname === process.env.MIX_APP_LOGIN_PATH) {
          // determine if the user is already  in the Login page
          if (process.env.MIX_APP_LOCALE === "en") {
            // if locale is English
            store.dispatch(
              setAuthError(
                `Your ${process.env.MIX_APP_EMAIL_OR_USERNAME} or password is incorrect`
              )
            );
          }
          if (process.env.MIX_APP_LOCALE === "fr") {
            // if locale is French
            store.dispatch(
              setAuthError(
                `Votre ${process.env.MIX_APP_EMAIL_OR_USERNAME} ou le mot de passe est incorrect`
              )
            );
          }
        } else {
          store.dispatch(logout());
          history.push(process.env.MIX_APP_LOGIN_PATH);
        }
        break;
      case 422:
        // something is wrong with the data you send
        // like email is required valid etc...
        store.dispatch(setErrors(error.response.data));
        break;
      default:
        break;
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
