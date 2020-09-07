import * as React from "react";
import Phone from "../../components/phone/Phone";
import HoboButton from "../../components/button/HoboButton";
import { useSelector } from "react-redux";
import LayoutOne from "../../components/layout-one/LayoutOne";

import "./home-page.scss";

const HomePage = () => {
  return (
    <LayoutOne>
      <div className="home-page">
        <Phone>
          <HelloMsg />
        </Phone>
      </div>
    </LayoutOne>
  );
};

export default HomePage;

const HelloMsg = () => {
  const user = useSelector(state => state.authReducer.user);

  return (
    <div className="hello-msg">
      {user && user.picked ? (
        <p style={{ direction: "rtl" }}>
          تحب تزيد نحكيو ؟ ايجا لل Store
          <br />
          تلقاني في
          <br />
          Manar City / Tunis City
          <br />
          Mall of Sousse
          <br />
          Lac Miami / Azur City
        </p>
      ) : (
        <p style={{ direction: "rtl" }}>
          أهلا بيك في الChicken Trip
          <br />
          و في الSaint-Valentin
          <br />
          HOBO باش يفرح بيك
          <br />
          حاضر لل ChaTrip؟
        </p>
      )}

      <HoboButton
        callback={() =>
          (window.location =
            process.env.MIX_BACKEND_PREFIX + "/redirect/facebook")
        }
        text="إيجا Inbox"
      />
    </div>
  );
};
