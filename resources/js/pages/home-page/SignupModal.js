import * as React from 'react';
import {useState} from "react";
import {Button, DatePicker, Form, Input, Modal, Select, Steps} from "antd";
import ArrowIcon from "../../components/svg/ArrowIcon";
import {validateAccount} from "../../actions/auth-actions/actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

export function SignupModal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const user = useSelector(state => state.authReducer.user);

  useEffect(() => {
    if (user && !user.valid) {
      setCurrentStep(1);
      setIsVisible(true);
    }
  }, [user]);

  return (
    <div>
      <button onClick={() => setIsVisible(true)}>
        signup
      </button>
      <Modal
        title="Sign up form"
        centered
        visible={isVisible}
        onOk={() => setIsVisible(false)}
        onCancel={() => setIsVisible(false)}
      >
        <Steps current={currentStep} onChange={(v) => {
          /* if (!user.valid) {
             return;
           }*/
        }}>
          <Steps.Step status="process" title="Login Fb"/>
          <Steps.Step status="process" title="Info"/>
        </Steps>
        {currentStep === 0 ? <FirstStep/> : <SecondStep/>}
      </Modal>
    </div>
  );
}

export default SignupModal;

const FirstStep = () => {
  return (
    <h1 onClick={() => {
      window.location = process.env.MIX_BACKEND_PREFIX + "/redirect/facebook";
    }}>Login with facebook</h1>
  )
};

const _SecondStep = (props) => {
  const {getFieldDecorator} = props.form;
  const dispatch = useDispatch();
  const [city, setCity] = useState(undefined);
  const [birthDate, setBirthDate] = useState(undefined);
  const user = useSelector(
    reduxStore => reduxStore.authReducer.user
  );
  const formErrors = useSelector(
    reduxStore => reduxStore.errorsReducer.errors
  );
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, data) => {
      if (!err) {
        dispatch(validateAccount({...data, city: city, birth_date: birthDate}));
      }
    });
  };
  return (
    <Form className="signup-form" onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator("name", {
          initialValue: user.name
        })(
          <Input
            addonAfter={formErrors["name"]}
            addonBefore={"Nom & prénom "}
            placeholder="Nom & Prénom"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("email", {
          initialValue: user.email
        })(
          <Input
            disabled
            name="email"
            addonAfter={formErrors["email"]}
            addonBefore={"Adress e-mail "}
            placeholder="laverit@contact.com"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("phone")(
          <Input
            name="phone"
            addonAfter={formErrors["phone"]}
            addonBefore={"Phone "}
            placeholder="EX: 1221221122"
          />
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator("birth_date")(
          <DatePicker onChange={(date, dateString) => {
            setBirthDate(date);
          }}/>
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator("city")(
          <>
                        <span className="select-error">
                            {formErrors["city"]}
                        </span>
            <Select
              placeholder="Your city"
              style={{width: 120}}
              onChange={e => setCity(e)}
            >
              <Select.Option value={"ok"}>
                TEST
              </Select.Option>
            </Select>
          </>
        )}
      </Form.Item>

      <Form.Item className="submit">
        <Button
          type="primary"
          htmlType="submit"
          className="submit-button"
        >
          <ArrowIcon/>
        </Button>
      </Form.Item>
    </Form>
  )
};
const SecondStep = Form.create({name: "normal_login"})(_SecondStep);
