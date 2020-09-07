import * as React from "react";

import "./hobo-button.scss";
import { withRouter } from "react-router-dom";
import gsap, { Bounce } from "gsap";

export function HoboButton({ text, callback }) {
  const buttonGoTop = () => {
    gsap.to(".hobo-button", { y: -10, duration: 0.05, ease: Bounce });
  };
  const buttonGoDown = () => {
    gsap.to(".hobo-button", { y: 0, duration: 0.05 });
  };
  return (
    <button
      onMouseLeave={buttonGoDown}
      onMouseEnter={buttonGoTop}
      onClick={callback}
      className="hobo-button"
    >
      {text}
    </button>
  );
}

export default withRouter(HoboButton);
