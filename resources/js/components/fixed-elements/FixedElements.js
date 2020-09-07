import * as React from "react";
import Heart1Image from "../../img/heart1.png";
import Heart2Image from "../../img/heart2.png";
import gsap from "gsap";
import { useEffect } from "react";

import "./fixed-elements.scss";

export function FixedElements({ flipHearts }) {
  useEffect(() => {
    gsap
      .fromTo(
        ".heart1",
        { x: 0, y: 0 },
        { rotate: 10, y: 20, x: 20, duration: 2, repeat: -1 }
      )
      .yoyo(true);
    gsap
      .fromTo(
        ".heart2",
        { x: 0, y: 0 },
        { rotate: -5, y: -20, x: -20, duration: 1, repeat: -1 }
      )
      .yoyo(true);
  }, []);
  return (
    <div className="fixed-elements">
      <img
        className={`heart1 ${flipHearts ? "flipped" : ""}`}
        src={Heart1Image}
        alt="img"
      />
      <img
        className={`heart2 ${flipHearts ? "flipped" : ""}`}
        src={Heart2Image}
        alt="img"
      />
    </div>
  );
}

export default FixedElements;
