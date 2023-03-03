import React from "react";
import styled from "styled-components";

const Background = styled.div`
  top: 0;
  left: 0;
  background-color: #00000093;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
`;

function LoadingPage() {
  return <Background>LoadingPage...</Background>;
}

export default LoadingPage;
