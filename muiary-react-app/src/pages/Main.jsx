import styled from "styled-components";
import React from "react";
import MainFooter from "../components/MainFooter";
import MainPage from "./MainPage";
import MainHeader from "../components/MainHeader";

const Div = styled.div`
  height: auto;
  /* min-height: 100%;
  padding-bottom: 100px; */
`;

function Main() {
  return (
    <Div>
      <MainHeader />
      <MainPage />
      <MainFooter />
    </Div>
  );
}

export default Main;
