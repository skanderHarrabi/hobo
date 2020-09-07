import * as React from "react";

import PhoneImg from "../../img/phone.png";
import Dots from "../dots/Dots";
import { useSelector } from "react-redux";
import NamingLogo from "../svg/NamingLogo";
import "./phone.scss";
import { useEffect } from "react";
import gsap from "gsap";

export function Phone({ children }) {
  const isLoading = useSelector(state => state.questionsReducer.isLoading);
  const isGameEnd = useSelector(state => state.questionsReducer.end);
  const questions = useSelector(state => state.questionsReducer.questions);

  useEffect(() => {
    gsap.fromTo(
      ".phone-wrapper",
      { y: 100, opacity: 0, duration: 0.1 },
      { y: 0, opacity: 1 }
    );
  }, []);
  useEffect(() => {
    if (questions.length > 0) {
      let out = document.getElementById("children");
      out.scrollTop = out.scrollHeight - out.clientHeight;
    }
  }, [questions]);
  return (
    <div className="phone">
      <NamingLogo />
      <div className="phone-wrapper">
        <img className="phone-img" src={PhoneImg} alt="img" />
        <div className="phone-content">
          <div id="children" className="children">
            {children}
            {isLoading && !isGameEnd ? <Dots /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Phone;
