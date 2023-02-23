import { Avatar, Grid } from "@mui/material";
import { FastAverageColor } from "fast-average-color";
import React from "react";
import styled from "styled-components";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  background-color: #00000095;
`;

// const BackgroundDarker = styled.div`
//   background-color: rgba(0, 0, 0, 255);
//   width: 100vw;
//   height: 100vh;
//   position: fixed;
//   display: flex;
//   top: 0;
//   justify-content: center;
//   align-items: center;
// `;

const ModalContainer = styled(Grid)`
  && {
    .avatar {
      width: 400px;
      height: 400px;
    }
  }
`;

function ProfileImageModal({ imgSrc }) {
  const fac = new FastAverageColor();

  fac
    .getColorAsync(imgSrc)
    .then((color) => {
      // console.log(color.value[3]);
      // [3]번째에 255말고 다른숫자 넣고set한다음에그걸hex코드로변호ㅑㄴ ?가능함?
      color.value[3] = 
      document.getElementById("background").style.backgroundColor =
        color.hex + "ab";
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <Background id="background" className="background">
      {/* <BackgroundDarker> */}
        <ModalContainer>
          <Grid item>
            <Avatar className="avatar" src={imgSrc} />
          </Grid>
        </ModalContainer>
      {/* </BackgroundDarker> */}
    </Background>
  );
}

export default ProfileImageModal;
