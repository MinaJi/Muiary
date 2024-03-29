import { Grid } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
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
import { Tooltip } from "../components/tooltips/Tooltip";

const GridContainer = styled(Grid)`
  && {
    padding: 5%;
  }
`;

const StyledInput = styled.input`
  color: ${(props) => props.theme.textColor};
  width: 60%;
  height: 25px;
  padding: 2%;
  border-radius: 25px;
  border: ${(props) => props.theme.inputBorder};
  background-color: ${(props) => props.theme.inputBg};
  font-size: 15px;
  ::placeholder {
    color: ${(props) => props.theme.placeholderText};
  }
  :focus {
    outline: none;
    border: 2px solid #f1d18a;
  }
`;

const StyledTextArea = styled.textarea`
  color: ${(props) => props.theme.textColor};
  width: 60%;
  height: 60px;
  padding: 2%;
  border-radius: 25px;
  border: ${(props) => props.theme.inputBorder};
  background-color: ${(props) => props.theme.inputBg};
  font-size: 15px;
  overflow: hidden;
  ::placeholder {
    color: ${(props) => props.theme.placeholderText};
  }
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
      display: inline-block;
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
  :hover {
    background-color: ${(props) => props.theme.red};
    border: none;
    color: #fff;
  }
`;

const IconBtn = styled.button`
  margin-top: 13px;
  float: right;
  border: none;
  background-color: transparent;
  align-content: center;
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
    border: ${(props) => props.theme.inputBorder};
    border-radius: 25px;
    background-color: ${(props) => props.theme.inputBg};
  }
  .react-date-picker__inputGroup__input {
    color: ${(props) => props.theme.placeholderText};
  }
  .react-calendar {
    background-color: ${(props) => props.theme.inputBg};
  }
`;

const SelectGrid = styled(Grid)`
  .react-select .react-select__control {
    background-color: ${(props) => props.theme.inputBg};
    border: ${(props) => props.theme.inputBorder};
  }
`;

const SelectPlaceholder = styled.div`
  color: ${(props) => props.theme.placeholderText};
`;

function MypageProfile() {
  const { user } = UserAuth();
  const { users } = UserData();
  const [isDisabled, setIsDisabled] = useState(true);
  const [showBtn, setShowBtn] = useState(false);

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
        // backgroundColor: isReadOnly ? "inherit" : "inherit",
      }),
      singleValue: (provided, state) => ({
        ...provided,
        color: state.data.color,
      }),
    }),
    []
  );

  const setDisabledFalse = () => {
    setIsDisabled(false);
    setShowBtn(true);
  };

  const usersRef = doc(db, `users/${user.uid}`);
  const [nickname, setNickname] = useState(users.nickname);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState(users.bio);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await updateDoc(usersRef, {
      nickname: nickname || users.nickname,
      bio: bio || users.bio,
      country: country || users.country,
      dateOfBirth: dateOfBirth || users.dateOfBirth,
    });
    alert("업데이트 완료");
  };

  const [dateValue, setDateValue] = useState(new Date());

  const changeHandler = (country) => {
    setCountry(country);
  };

  return (
    <>
      <GridContainer container>
        <Grid item xs={9}>
          <TitleDiv item>
            <p className="title">Profile</p>
            <Tooltip message="Edit profile" direction="icon-bottom">
              <IconBtn onClick={setDisabledFalse}>
                <i className="ri-settings-3-line"></i>
              </IconBtn>
            </Tooltip>
            <hr className="divider" />
          </TitleDiv>
          <form onSubmit={handleUpdateProfile}>
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <StyledText>Email</StyledText>
                  <StyledInput placeholder={user.email} disabled />
                </Grid>
                <Grid item xs={6}>
                  <StyledText>Nickname</StyledText>
                  <StyledInput
                    placeholder={users && users.nickname}
                    disabled={isDisabled}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <StyledText>Birthday</StyledText>
                  <StyledPicker
                    value={dateValue}
                    disabled={isDisabled}
                    onChange={(value) => {
                      setDateValue(value);
                      setDateOfBirth(new Date(value));
                    }}
                  />
                </Grid>
                <SelectGrid item xs={6}>
                  <StyledText>Country</StyledText>
                  <Select
                    className="react-select"
                    classNamePrefix="react-select"
                    placeholder={
                      <SelectPlaceholder>{users}</SelectPlaceholder> && (
                        <SelectPlaceholder>
                          {users?.country?.label}
                        </SelectPlaceholder>
                      )
                    }
                    onChange={changeHandler}
                    value={country}
                    options={options}
                    styles={customSelect}
                    isDisabled={isDisabled}
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
                </SelectGrid>
                <Grid item xs={6}>
                  <StyledText>Bio</StyledText>
                  <StyledTextArea
                    disabled={isDisabled}
                    placeholder={users && users.bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {showBtn && (
                    <>
                      <Btn type="submit">Save</Btn>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={3}>
          <EditProfilePic />
        </Grid>
      </GridContainer>
    </>
  );
}

export default MypageProfile;
