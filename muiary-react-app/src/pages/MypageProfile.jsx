import { Grid } from "@mui/material";
import {
  addDoc,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import React from "react";
import EditProfilePic from "../components/EditProfilePic";
import { UserAuth } from "../context/AuthContext";
import styled from "styled-components";
import { useState } from "react";
import countryList from "react-select-country-list";
import { useMemo } from "react";
import Select from "react-select";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "../css/DatePicker.css";
import "../css/Calendar.css";
import { db } from "../firebase-config";
import { UserData } from "../context/UserDataContext";

const GridContainer = styled(Grid)`
  && {
    padding: 5%;
  }
`;

const StyledInput = styled.input`
  width: 60%;
  height: 25px;
  padding: 2%;
  border-radius: 25px;
  border: 1px solid ${(props) => props.theme.borderColor};
  font-size: 15px;
  :focus {
    outline: none;
    border: 2px solid #f1d18a;
  }
`;

const StyledTextArea = styled.textarea`
  width: 60%;
  padding: 2%;
  border-radius: 25px;
  border: 1px solid ${(props) => props.theme.borderColor};
  font-size: 15px;
  :focus {
    outline: none;
    border: 2px solid #f1d18a;
  }
`;

const TitleDiv = styled(Grid)`
  && {
    .title {
      font-size: 45px;
      font-weight: bold;
    }
    .divider {
      height: 1px;
      background-color: #ededed;
      border: none;
      margin-bottom: 4%;
    }
  }
`;

const StyledText = styled.p`
  font-size: 15px;
  font-weight: bold;
  padding-bottom: 8px;
`;

const Btn = styled.button`
  background-color: ${(props) => props.theme.buttonColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  width: 71px;
  height: 40px;
  margin: 3px;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.red};
    border: none;
    color: #fff;
  }
`;

const IconBtn = styled.button`
  border: none;
  background-color: inherit;
  align-content: center;
  cursor: pointer;
  transition: all ease 0.7s;
  :hover {
    transform: rotate(90deg);
  }
  i {
    font-size: 30px;
    color: ${(props) => props.theme.red};
  }
`;

const StyledPicker = styled(DatePicker)`
  && {
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 25px;
  }
`;

function MypageProfile() {
  const { user } = UserAuth();
  const { users } = UserData();

  const [isReadOnly, setIsReadOnly] = useState(true);
  const [showBtn, setShowBtn] = useState(false);

  const [value, onChange] = useState(new Date());

  const options = useMemo(() => countryList().getData(), []);
  const customSelect = useMemo(
    () => ({
      option: (provided, state) => ({
        ...provided,
        opacity: 0.8,
        padding: 20,
      }),
      control: (provided, { isReadOnly }) => ({
        ...provided,
        width: "60%",
        height: "48px",
        borderRadius: "25px",
        fontSize: "15px",
        backgroundColor: isReadOnly ? "inherit" : "inherit",
      }),
      singleValue: (provided, state) => ({
        ...provided,
        color: state.data.color,
      }),
    }),
    []
  );

  const setReadOnlyFalse = () => {
    setIsReadOnly(false);
    setShowBtn(true);
  };

  const [nickname, setNickname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "users", user.uid), {
      nickname: nickname,
      dateOfBirth: dateOfBirth,
      country: country,
      bio: bio,
    });
    // await setDoc(doc(db, `users/${user.uid}`), {
    //   nickname: nickname,
    //   dateOfBirth: dateOfBirth,
    //   country: country,
    //   bio: bio,
    // });
  };

  return (
    <>
      <GridContainer container>
        <Grid item xs={9}>
          <TitleDiv item>
            <p className="title">Profile</p>
            <hr className="divider" />
          </TitleDiv>
          <form onSubmit={handleUpdateProfile}>
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <StyledText>Email</StyledText>
                  <StyledInput placeholder={user.email} readOnly />
                </Grid>
                <Grid item xs={6}>
                  <StyledText>Nickname</StyledText>
                  <StyledInput
                    placeholder={users && users.nickname}
                    readOnly={isReadOnly}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <StyledText>Birthday</StyledText>
                  <StyledPicker
                    // onChange={(e) => {
                    //   setDateOfBirth(value);
                    // }}
                    value={value}
                    disabled={isReadOnly}
                  />
                </Grid>
                <Grid item xs={6}>
                  <StyledText>Country</StyledText>
                  <Select
                    // onChange={(e) => {
                    //   setCountry(e.target.options);
                    // }}
                    options={options}
                    styles={customSelect}
                    isDisabled={isReadOnly}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: "#F1D18A",
                        primary: "#F1D18A",
                        neutral10: "#dcdde1",
                        neutral20: "#dcdde1",
                        neutral30: "#dcdde1",
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <StyledText>Bio</StyledText>
                  <StyledTextArea
                    readOnly={isReadOnly}
                    placeholder={users && users.bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {showBtn && (
                    <>
                      <Btn type="submit">Submit</Btn>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={3}>
          <EditProfilePic />
          <Grid item>
            <IconBtn onClick={setReadOnlyFalse}>
              <i className="ri-settings-3-line"></i>
            </IconBtn>
          </Grid>
        </Grid>
      </GridContainer>
    </>
  );
}

export default MypageProfile;
