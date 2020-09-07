import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
import SignUpPage from "./pages/signup-page/SignUpPage";
import { logout } from "./actions/auth-actions/actions";
import HomePage from "./pages/home-page/HomePage";
import ChatPage from "./pages/chat-page/ChatPage";
import VoucherPage from "./pages/voucher-page/VoucherPage";

const App = props => {
  const user = useSelector(state => state.authReducer.user);
  const [isUserVerified, setIsUserVerified] = useState(false);
  useEffect(() => {
    if (props.isLoggedIn && user.phone) {
      setIsUserVerified(true);
    }
  }, [user, props.isLoggedIn]);
  return (
    <div className="app">
      <Switch location={props.history.location}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/chat" component={ChatPage} />
        <AuthRoute
          authenticated={props.isLoggedIn}
          path="/signup"
          component={SignUpPage}
        />
        {/* <AuthRoute
          authenticated={props.isLoggedIn}
          path="/chat"
          component={ChatPage}
        /> */}
        <AuthRoute
          authenticated={props.isLoggedIn}
          path="/voucher"
          component={VoucherPage}
        />
      </Switch>
    </div>
  );
};

function AuthRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

function GuestRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      //exact
      render={props =>
        !authenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

const mapStateToProps = reduxStore => {
  return {
    isLoggedIn: reduxStore.authReducer.isLoggedIn,
    user: reduxStore.authReducer.user,
    isLoadingUser: reduxStore.authReducer.isLoadingUser
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(App)
);
