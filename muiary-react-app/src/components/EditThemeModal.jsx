import { Divider, Grid } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { ChromePicker } from "react-color";
import { MdClose } from "react-icons/md";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import CheckIcon from "@mui/icons-material/Check";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.modalBg};
  top: 0;
  left: 0;
  z-index: 300;
`;

const ModalContainer = styled(Grid)`
  && {
    background-color: ${(props) => props.theme.bgColor};
    width: max-content;
    min-width: 320px;
    height: max-content;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 15px;
    box-shadow: ${(props) => props.theme.modalBoxShadow};
    .btn-wrapper {
      display: flex;
      justify-content: flex-end;
    }
    .close-btn {
      background-color: transparent;
      border: none;
      font-size: 28px;
      :hover {
        color: #f73859;
      }
    }
    .title-wrapper {
      margin-bottom: 28px;
      font-size: 20px;
      padding-left: 5%;
      font-weight: 700;
    }
  }
`;

const ContainerWrapper = styled(Grid)`
  && {
    width: 300px;
    align-items: center;
    justify-content: center;
    padding: 5px;
    font-weight: 500;
  }
`;

const ButtonContainer = styled(Grid)`
  && {
    padding: 15px;
    margin-top: 5px;
    button {
      border: none;
      border-radius: 20px;
      padding: 10px;
    }
    .reset-btn {
      background-color: transparent;
      border: 1px solid silver;
    }
    .set-btn-wrapper {
      text-align: right;
    }
    .set-btn {
      background-color: black;
      color: white;
      :hover {
        background-color: #f73859;
      }
    }
  }
`;

const ColorPickerContainer = styled(Grid)`
  && {
    padding: 10px 10px 10px 0px;
    button {
      border: none;
      background-color: transparent;
    }
  }
`;

const Btn = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.082) 0px 0px 5px;
`;

function EditThemeModal({
  setEditModal,
  username,
  userBgColor,
  userTextColor,
  setUserBgColor,
  setUserTextColor,
}) {
  const [bgColorPicker, setBgColorPicker] = useState(false);
  const [textColorPicker, setTextColorPicker] = useState(false);
  const [bgColor, setBgColor] = useState(userBgColor);
  const [textColor, setTextColor] = useState(userTextColor);

  const openBgColorPicker = () => {
    setBgColorPicker((prev) => !prev);
  };
  const openTextColorPicker = () => {
    setTextColorPicker((prev) => !prev);
  };

  const handleResetTheme = () => {
    setBgColor("");
    setTextColor("");
  };

  const handleSetTheme = async () => {
    try {
      await setDoc(doc(db, "userTheme", username), {
        backgroundColor: bgColor,
        textColor: textColor,
      })
        .then(setUserBgColor(bgColor), setUserTextColor(textColor))
        .then(setEditModal(false));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background>
      <ModalContainer container>
        <Grid item className="btn-wrapper">
          <button
            className="close-btn"
            onClick={(e) => {
              setEditModal(false);
            }}
          >
            <MdClose />
          </button>
        </Grid>
        <Grid item className="title-wrapper">
          <p>Theme settings</p>
        </Grid>
        <Grid container>
          <Grid item>
            <ContainerWrapper container alignItems="center">
              <Grid item xs={7}>
                <span>Background Color</span>
              </Grid>
              <Grid item>
                <Btn
                  onClick={openBgColorPicker}
                  style={{ backgroundColor: `${bgColor}` }}
                  id="bg-btn"
                />
              </Grid>
            </ContainerWrapper>
          </Grid>
          <Grid item>
            {bgColorPicker && (
              <ColorPickerContainer container direction="column">
                <Grid item>
                  <ChromePicker
                    color={bgColor}
                    onChange={(color) => {
                      setBgColor(color.hex);
                    }}
                  />
                </Grid>
              </ColorPickerContainer>
            )}
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item>
            <ContainerWrapper container alignItems="center">
              <Grid item xs={7}>
                <span>Text Color</span>
              </Grid>
              <Grid item>
                <Btn
                  onClick={openTextColorPicker}
                  style={{ backgroundColor: `${textColor}` }}
                />
              </Grid>
            </ContainerWrapper>
          </Grid>
          <Grid item>
            {textColorPicker && (
              <ColorPickerContainer container direction="column">
                <Grid item>
                  <ChromePicker
                    color={textColor}
                    onChange={(color) => {
                      setTextColor(color.hex);
                    }}
                  />
                </Grid>
              </ColorPickerContainer>
            )}
          </Grid>
        </Grid>
        <ButtonContainer container>
          <Grid item xs={6}>
            <button onClick={handleResetTheme} className="reset-btn">
              Reset
            </button>
          </Grid>
          <Grid item xs={6} className="set-btn-wrapper">
            <button onClick={handleSetTheme} className="set-btn">
              <CheckIcon fontSize="inherit" />
              Apply
            </button>
          </Grid>
        </ButtonContainer>
      </ModalContainer>
    </Background>
  );
}

export default EditThemeModal;
