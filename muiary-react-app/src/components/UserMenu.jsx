import React from "react";
import { Box, Divider, Grid } from "@mui/material";
import styled from "styled-components";
import ToggleSwitch from "./ToggleSwitch";
import { useTheme } from "../context/themeProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserAuth } from "../context/AuthContext";

const StyledGrid = styled(Grid)`
  && {
    margin-top: 100px;
    width: 100%;
  }
  .toggle-switch-wrapper {
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 10px;
    margin-top: 35px;
    padding: 5px;
    padding-left: 8px;
    width: max-content;
  }
  .wrapper-sapn {
    font-size: 12px;
    margin-right: 100px;
  }
`;

const StyledDivider = styled(Divider)`
  && {
    width: 320px;
    background-color: 1px solid ${(props) => props.theme.borderColor};
  }
`;

const Btn = styled.button`
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.textColor};
  height: 40px;
  width: 100%;
  text-align: left;
  margin: 5px;
  cursor: pointer;
  transition: color 0.25s;
  :hover {
    color: ${(props) => props.theme.red};
    font-weight: 600;
  }
`;

function UserMenu() {
  const [ThemeMode, toggleTheme] = useTheme();
  const navi = useNavigate();
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
      navi("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
        <StyledGrid container direction="column" alignItems="center">
          <Grid item>
            {user ? (
              <Btn onClick={() => navi("/mypage")}>Mypage</Btn>
            ) : (
              <Btn onClick={() => navi("/signup")}>Sign up</Btn>
            )}
            <StyledDivider />
          </Grid>
          <Grid item>
            {user ? (
              <Btn onClick={handleSignOut}>Sign out</Btn>
            ) : (
              <Btn onClick={() => navi("/signin")}>Sign in</Btn>
            )}
            <StyledDivider />
          </Grid>
          <Grid container alignItems="center" className="toggle-switch-wrapper">
            <Grid item className="wrapper-sapn">
              <span>Theme</span>
            </Grid>
            <Grid item className="switch">
              <ToggleSwitch toggle={toggleTheme} mode={ThemeMode} />
            </Grid>
          </Grid>
        </StyledGrid>
      </Box>
    </motion.div>
  );
}

export default UserMenu;
