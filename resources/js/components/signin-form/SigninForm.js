import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/auth-actions/actions";
import ArrowIcon from "../svg/ArrowIcon";
import { Form, Input, Button } from "antd";

import "./signin-form.scss";

const SigninForm = props => {
  const dispatch = useDispatch();
  const { getFieldDecorator } = props.form;
  const formErrors = useSelector(reduxStore => reduxStore.errorsReducer.errors);
  const authError = useSelector(
    reduxStore => reduxStore.errorsReducer.authError
  );
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, data) => {
      if (!err) {
        dispatch(signin(data));
      }
    });
  };

  return (
    <Form className="signin-form" onSubmit={handleSubmit}>
      <h3 className="title">
        Pour vous connecter, utilisez votre identifiant:
      </h3>
      <Form.Item>
        {getFieldDecorator("email")(
          <Input
            name="email"
            addonAfter={formErrors["email"]}
            addonBefore={"Adress e-mail "}
            placeholder="laverit@contact.com"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password")(
          <Input
            name="password"
            addonAfter={formErrors["password"]}
            addonBefore={"Mot de passe "}
            type="password"
            placeholder="Mot de passe"
          />
        )}
      </Form.Item>
      <span className="auth-error">{authError ? authError : null}</span>
      <Form.Item className="submit">
        <Button type="primary" htmlType="submit" className="submit-button">
          <ArrowIcon />
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedSigninForm = Form.create({ name: "normal_login" })(SigninForm);

export default WrappedSigninForm;
