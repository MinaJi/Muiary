import React from "react";
import { Box, Grid } from "@mui/material";
import styled from "styled-components";
import ToggleSwitch from "./ToggleSwitch";
import { useTheme } from "../context/themeProvider";

const StyledBox = styled(Grid)`
  && {
    margin-top: 65px;
    width: 100%;
    height: calc(100vh - 65px);
  }
`;

const Btn = styled.button`
  background-color: ${(props) => props.theme.buttonColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  width: 70px;
  height: 40px;
  margin: 3px;
  cursor: pointer;
`;

function UserMenu() {
  const [ThemeMode, toggleTheme] = useTheme();

  return (
    <>
      <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
        <StyledBox container justifyContent="center">
          <Grid item>
            <Btn>Sign in</Btn>
          </Grid>
          <Grid item>
            <Btn>Sign up</Btn>
          </Grid>
          <Grid item>
            <ToggleSwitch toggle={toggleTheme} mode={ThemeMode} />
          </Grid>
        </StyledBox>
      </Box>
    </>
  );
}

export default UserMenu;
