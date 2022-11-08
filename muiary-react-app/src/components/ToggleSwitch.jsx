import React from "react";
import styled from "styled-components";
import cx from "classnames";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  .switch {
    opacity: 0;
    height: 0;
    width: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #dcdde1;
    transition: 0.3s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.3s;

  }

  input:checked + .slider {
    background-color: #111417;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .slider.rounded {
    border-radius: 34px;
  }

  .slider.rounded:before {
    border-radius: 50%;
  }
`;

const ToggleSwitch = ({ toggle, mode, rounded = true }) => {
  const sliderCX = cx("slider", {
    rounded: rounded,
  });

  return (
    <Label>
      <input
        type="checkbox"
        className="switch"
        onChange={toggle}
        mode={mode}
        checked={mode === "dark"}
      />
      <span className={sliderCX}>
        <a className="icon">
          {mode === "dark" ? <RiMoonClearFill /> : <RiSunFill />}
          </a>
      </span>
    </Label>
  );
};

export default ToggleSwitch;
