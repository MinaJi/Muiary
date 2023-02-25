import { Avatar, Grid } from "@mui/material";
import { FastAverageColor } from "fast-average-color";
import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  top: 0;
  .close-icon-div {
    position: absolute;
    padding: 20px;
    button {
      font-size: 25px;
      border-radius: 50%;
      border: none;
      width: 38px;
      height: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      :hover {
        box-shadow: rgba(255, 255, 255, 0.193) 0px 0px 10px;
      }
    }
  }
`;

const ModalContainer = styled(Grid)`
  && {
    justify-content: center;
    align-items: center;
    .avatar {
      width: 400px;
      height: 400px;
    }
  }
`;

function ProfileImageModal({ imgSrc, setProfileImageModal }) {
  const fac = new FastAverageColor();

  fac
    .getColorAsync(imgSrc)
    .then((color) => {
      document.getElementById("background").style.background =
        "linear-gradient(rgba(0, 0, 0, 0.63), rgba(0, 0, 0, 0.63))," +
        color.hex +
        "ab";
      document.getElementById("close-btn").style.background =
        "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))," +
        color.hex +
        "ab";
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <Background id="background">
      <div className="close-icon-div">
        <button
          id="close-btn"
          onClick={() => {
            setProfileImageModal(false);
          }}
        >
          <MdClose />
        </button>
      </div>
      <ModalContainer container>
        <Grid item>
          <Avatar className="avatar" src={imgSrc} />
        </Grid>
      </ModalContainer>
    </Background>
  );
}

export default ProfileImageModal;
