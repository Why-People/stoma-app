import React from "react";
import "./scss/background.scss";

interface BackgroundProps {
  particles: number;
}

export const Background: React.FC<BackgroundProps> = ({ particles }) => {
  return (
    <React.Fragment>
      {Array.from({ length: particles }, (_, i) => (
        <div key={i} className="particle"></div>
      ))}
    </React.Fragment>
  );
};
