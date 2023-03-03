import React from "react";
import styled from "styled-components";

const Div = styled.div`
  position: absolute;
  cursor: pointer;
  .vinyl {
    position: relative;
    display: inline-block;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-color: #040504;
    box-shadow: 1px 1px 10px #000;
  }
  .light,
  .light-alt {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    border-radius: 50%;
    animation: reflection 20s infinite ease-in-out;
  }
  .light {
    background-image: linear-gradient(
      top,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
  }
  .light-alt {
    background-image: linear-gradient(
      -160deg,
      transparent 40%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 60%
    );
  }

  .macaron {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    margin: -16% 0 0 -16%;
    width: 33.33%;
    height: 33.33%;
    border-radius: 50%;
    .cover {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 6;
      display: block;
      margin: -4% 0 0 -4%;
      width: 8%;
      height: 8%;
      border-radius: 50%;
      background: white;
      box-shadow: inset 0 0 2px #000;
      content: "";
    }
  }

  .grooves {
    position: absolute;
    top: 2%;
    right: 2%;
    bottom: 2%;
    left: 2%;
    z-index: 5;
    border-radius: 50%;
    background-image: radial-gradient(
      center center,
      circle closest-side,
      transparent 43%,
      transparent 53%,
      #000 54%,
      transparent 54%,
      transparent 64%,
      #000 65%,
      transparent 65%,
      transparent 75%,
      #000 76%,
      transparent 76%,
      transparent 86%,
      #000 87%,
      transparent 87%,
      transparent 97%,
      #000 98%,
      transparent 98%
    );
    background-image: -webkit-radial-gradient(
      center center,
      circle closest-side,
      transparent 43%,
      transparent 53%,
      #000 54%,
      transparent 54%,
      transparent 64%,
      #000 65%,
      transparent 65%,
      transparent 75%,
      #000 76%,
      transparent 76%,
      transparent 86%,
      #000 87%,
      transparent 87%,
      transparent 97%,
      #000 98%,
      transparent 98%
    );
  }

  .play .macaron,
  .play .grooves,
  .play .macaron .cover {
    animation: rotation 4s infinite linear;
  }

  .paused .macaron,
  .paused .grooves,
  .paused .macaron .cover {
    animation-play-state: paused;
  }

  .vinyl-picture-disc .macaron {
    top: 0%;
    left: 0%;
    z-index: 4;
    margin: 0;
    width: 100%;
    height: 100%;
    &:after {
      margin: -1.25% 0 0 -1.25%;
      width: 2.5%;
      height: 2.5%;
      background: white;
    }
  }

  .song {
    display: block;
    margin: 50px 50px 0;
    width: 400px;
    text-align: center;
    audio {
      display: none;
    }
  }

  @keyframes rotation {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes reflection {
    0% {
      filter: blur(5px);
      transform: rotate(0);
    }
    25% {
      transform: rotate(5deg);
    }
    50% {
      filter: blur(10px);
      transform: rotate(0);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      filter: blur(5px);
      transform: rotate(0);
    }
  }
`;

function Vinyl({ artwork }) {
  return (
    <Div>
      <div class="vinyl vinyl-1 paused">
        <div class="grooves"></div>
        <div class="light"></div>
        <div class="light-alt"></div>
        <div class="macaron">
          <img class="cover" alt="cover" src={artwork}></img>
        </div>
      </div>
    </Div>
  );
}

export default Vinyl;
