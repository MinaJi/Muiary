import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";

function Muiary() {
  return (
    <>
      <>
        <MainHeader />
      </>
      <>
        <Outlet />
      </>
      <>
        <MainFooter />
      </>
    </>
  );
}

export default Muiary;
