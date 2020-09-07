import * as React from "react";
import Logo from "../svg/Logo";
import FixedElements from "../fixed-elements/FixedElements";
import HoboLogo from "../svg/HoboLogo";

import "./layout-one.scss";

export function LayoutOne({ children, offset }) {
  return (
    <div className="layout-one">
      <FixedElements />
      {/* <div className="hobo-logo">
        <HoboLogo />
      </div>*/}
      <div className={`logo ${offset ? "offset" : ""}`}>
        <Logo />
      </div>
      {children}
    </div>
  );
}

export default LayoutOne;
