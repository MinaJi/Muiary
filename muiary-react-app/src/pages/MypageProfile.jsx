import { Grid } from "@mui/material";
import React from "react";
import EditProfilePic from "../components/EditProfilePic";
import { UserAuth } from "../context/AuthContext";
import styled from "styled-components";
import { useState } from "react";
import countryList from "react-select-country-list";
import { useMemo } from "react";
import Select from "react-select";

const GridContainer = styled(Grid)`
  && {
    padding: 5%;
  }
`;

// const CustomSelect = styled(Select)`
//   & .Select {
//     &__control {
//       display: flex;
//       align-items: center;
//       border-radius: 0;
//       border: none;
//       height: 100%;

//       &--is-focused {
//         box-shadow: 0 0 1px gray;
//         border-color: transparent !important;
//       }

//       &--menu-is-open {
//         border-color: transparent;
//         box-shadow: none;

//         :hover {
//           border-color: transparent;
//         }

//         svg {
//           color: white;
//         }
//       }
//     }

//     &__menu {
//       margin-top: 15px;
//       top: calc(100% - 2px);
//       box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.16);

//       border-top: 0;
//       &-list {
//         padding: 0;
//         justify-content: center;
//         align-items: center;
//       }
//     }

//     &__option {
//       height: 40px;
//       display: "flex";
//       align-items: "center";
//       padding: 9px 0px 9px 15px;
//       border-top: 1px solid gray;
//       color: black;
//       background-color: #ff0000;
//       &--is-selected {
//         color: black;
//         background-color: gray;
//         font-weight: bold;
//       }
//       &--is-focused {
//         box-shadow: none;
//         background-color: #ff0000;
//       }
//     }
//   }
// `;

const StyledInput = styled.input`
  padding: 2%;
  border-radius: 18px;
  border: 1px solid gray;
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
    }
  }
`;

const StyledText = styled.p`
  font-size: 15px;
  font-weight: bold;
  padding-bottom: 8px;
`;

function MypageProfile() {
  const { user } = UserAuth();
  const [isReadOnly, setIsReadOnly] = useState(true);
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
        width: 200,
        border: "1px solid gray",
        borderRadius: "18px",
        // padding: "2%",
        fontSize: "15px",
        backgroundColor: isReadOnly ? "inherite" : "inherite",
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

  return (
    <>
      <GridContainer container>
        <Grid item xs={9}>
          <TitleDiv item>
            <p className="title">Profile</p>
            <hr className="divider" />
          </TitleDiv>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <StyledText>Email</StyledText>
                <StyledInput placeholder={user.email} readOnly />
              </Grid>
              <Grid item xs={6}>
                <StyledText>Nickname</StyledText>
                <StyledInput placeholder="닉네임" readOnly={isReadOnly} />
              </Grid>
              <Grid item xs={6}>
                <StyledText>Birthday</StyledText>
                <StyledInput placeholder="생일" readOnly={isReadOnly} />
              </Grid>
              <Grid item xs={6}>
                <StyledText>Country</StyledText>
                <Select
                  options={options}
                  styles={customSelect}
                  isDisabled={isReadOnly}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledText>Bio</StyledText>
                <StyledInput placeholder="bio" readOnly={isReadOnly} />
              </Grid>
              {showBtn && (
                <>
                  <button type="submit">완료</button>
                </>
              )}
              <Grid item>
                <button onClick={setReadOnlyFalse}>
                  <i className="ri-settings-3-line"></i>
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <EditProfilePic />
        </Grid>
      </GridContainer>
    </>
  );
}

export default MypageProfile;
