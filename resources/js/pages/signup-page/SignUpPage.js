import React from "react";
import SignupForm from "../../components/signup-form/SignupForm";

import "./signup-page.scss";
import LayoutOne from "../../components/layout-one/LayoutOne";
import { withRouter } from "react-router-dom";

const SignUpPage = () => {
  return (
    <LayoutOne offset={true}>
      <SignupForm />
    </LayoutOne>
  );
};

export default withRouter(SignUpPage);
