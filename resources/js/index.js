import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider, connect, useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import store from "./stores/store-dev";

import App from "./App";

import "antd/dist/antd.min.css";
import "./stylesheets/main.scss";
import { getAuthUser } from "./actions/auth-actions/actions";
import NamingLogo from "./components/svg/NamingLogo";

export const history = createBrowserHistory();

const WrappedApp = props => {
  const isLoadingUser = useSelector(state => state.authReducer.isLoadingUser);
  useEffect(() => {
    store.dispatch(getAuthUser());
  }, []);

  return (
    <>
      {isLoadingUser ? (
        <div className="loading-screen">
          <NamingLogo />
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

const mapStateToProps = reduxStore => {
  return {
    isLoadingUser: reduxStore.authReducer.isLoadingUser
  };
};

const ConnectedWrappedApp = connect(mapStateToProps)(WrappedApp);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedWrappedApp store={store}>
      <Router history={history}>
        <App />
      </Router>
    </ConnectedWrappedApp>
  </Provider>,
  document.getElementById("root")
);
