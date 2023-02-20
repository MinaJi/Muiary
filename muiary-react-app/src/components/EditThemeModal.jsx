import { Grid } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { ChromePicker } from "react-color";
import { MdClose } from "react-icons/md";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { UserAuth } from "../context/AuthContext";

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
    height: max-content;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 25px;
    box-shadow: ${(props) => props.theme.modalBoxShadow};
    .btn-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 15px;
    }
    .close-btn {
      background-color: transparent;
      border: none;
      font-size: 30px;
      cursor: pointer;
      :hover {
        color: #f73859;
      }
    }
  }
`;

const Btn = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.082) 0px 0px 5px;
  cursor: pointer;
`;

function EditThemeModal({ setEditModal, username }) {
  const [bgColorPicker, setBgColorPicker] = useState(false);
  const [textColorPicker, setTextColorPicker] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");

  const openBgColorPicker = () => {
    setBgColorPicker(true);
  };
  const openTextColorPicker = () => {
    setTextColorPicker(true);
  };

  const setColorHandler = (e) => {
    if (document.getElementById("bg-btn")) {
      setBgColorPicker(false);
    } else {
      setTextColorPicker(false);
    }
  };

  const handleSetTheme = async () => {
    try {
      await setDoc(doc(db, "userTheme", username), {
        backgroundColor: bgColor,
        textColor: textColor,
      });
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
        <Grid container>
          <Grid item xs={9}>
            <p>Background Color</p>
          </Grid>
          <Grid item xs={3}>
            <Btn
              onClick={openBgColorPicker}
              style={{ backgroundColor: `${bgColor}` }}
            />
          </Grid>
        </Grid>
        {bgColorPicker && (
          <Grid container direction="column">
            <Grid item>
              <ChromePicker
                color={bgColor}
                onChange={(color) => {
                  setBgColor(color.hex);
                }}
              />
            </Grid>
            <Grid item>
              <button id="bg-btn" onClick={setColorHandler}>
                선택
              </button>
            </Grid>
          </Grid>
        )}
        <Grid container>
          <Grid item xs={9}>
            <p>Text Color</p>
          </Grid>
          <Grid item xs={3}>
            <Btn
              onClick={openTextColorPicker}
              style={{ backgroundColor: `${textColor}` }}
            />
          </Grid>
        </Grid>
        {textColorPicker && (
          <Grid container direction="column">
            <Grid item>
              <ChromePicker
                color={textColor}
                onChange={(color) => {
                  setTextColor(color.hex);
                }}
              />
            </Grid>
            <Grid item>
              <button id="text-btn" onClick={setColorHandler}>
                선택
              </button>
            </Grid>
          </Grid>
        )}
        <Grid item>
          <button>Reset theme</button>
        </Grid>
        <Grid item>
          <button onClick={handleSetTheme}>선택완료</button>
        </Grid>
      </ModalContainer>
    </Background>
  );
}

export default EditThemeModal;
