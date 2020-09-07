import React, { useEffect } from "react";
import gsap, { Bounce } from "gsap";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import NamingLogo from "../svg/NamingLogo";
import { validateAccount } from "../../actions/auth-actions/actions";
import { withRouter } from "react-router-dom";

import "./signup-form.scss";

const SignupForm = props => {
  const { getFieldDecorator } = props.form;
  const dispatch = useDispatch();
  const formErrors = useSelector(reduxStore => reduxStore.errorsReducer.errors);
  const user = useSelector(reduxStore => reduxStore.authReducer.user);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, data) => {
      if (!err) {
        dispatch(validateAccount(data));
      }
    });
  };
  useEffect(() => {
    if (user.phone) {
      props.history.push("/chat");
    }
  }, [user]);
  const buttonGoTop = () => {
    gsap.to(".submit-button", { y: -10, duration: 0.05, ease: Bounce });
  };
  const buttonGoDown = () => {
    gsap.to(".submit-button", { y: 0, duration: 0.05 });
  };
  return (
    <Form className="signup-form" onSubmit={handleSubmit}>
      <NamingLogo />
      <div className="row-one">
        <Form.Item>
          {getFieldDecorator("name", {
            initialValue: user.name
          })(
            <Input
              name="name"
              addonAfter={formErrors["name"]}
              addonBefore={"Nom & prénom "}
              type="text"
              placeholder="Nom & prénom"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("email", {
            initialValue: user.email
          })(
            <Input
              name="name"
              addonAfter={formErrors["email"]}
              addonBefore={"adresse email "}
              type="email"
              placeholder="adresse email"
            />
          )}
        </Form.Item>
      </div>
      <div className="row-one">
        <Form.Item>
          {getFieldDecorator("phone")(
            <Input
              addonAfter={formErrors["phone"]}
              addonBefore={"N Téléphone "}
              placeholder="N Téléphone"
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("birth_date")(
            <Input
              name="birth_date"
              addonAfter={formErrors["birth_date"]}
              addonBefore={"Date de naissance "}
              placeholder="Date de naissance"
              type="date"
            />
          )}
        </Form.Item>
      </div>

      <Form.Item className="submit">
        <Button
          onMouseEnter={buttonGoTop}
          onMouseLeave={buttonGoDown}
          type="primary"
          htmlType="submit"
          className="submit-button"
        >
          ija inbox
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedSignupForm = Form.create({ name: "normal_login" })(SignupForm);

export default withRouter(WrappedSignupForm);
