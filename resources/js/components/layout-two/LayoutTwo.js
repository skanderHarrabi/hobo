import * as React from "react";
import Logo from "../svg/Logo";
import FixedElements from "../fixed-elements/FixedElements";
import HoboLogo from "../svg/HoboLogo";

import "./layout-two.scss";

export function LayoutTwo({ children, hidePhone }) {
  return (
    <div className={`layout-two ${hidePhone ? "hide-phone" : ""}`}>
      <FixedElements flipHearts={true} />
      <div className="logo">
        <Logo />
        <HoboLogo />
      </div>
      {children}
    </div>
  );
}

export default LayoutTwo;
