import React from "react";
import { Box, Container, Divider, Grid } from "@mui/material";
import styled from "styled-components";
import ToggleSwitch from "./ToggleSwitch";
import { useTheme } from "../context/themeProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const StyledGrid = styled(Grid)`
  && {
    margin-top: 100px;
    width: 100%;
    height: calc(100vh - 65px);
  }
`;

const StyledDivider = styled(Divider)`
  && {
    width: 350px;
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
  const navi = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
        <Container>
          <StyledGrid container direction="column" alignItems="center">
            <Grid item>
              <Btn onClick={() => navi("/signup")}>Sign up</Btn>
              <StyledDivider />
            </Grid>
            <Grid item>
              <Btn onClick={() => navi("/signin")}>Sign in</Btn>
              <StyledDivider />
            </Grid>
            <Grid item>
              <ToggleSwitch toggle={toggleTheme} mode={ThemeMode} />
            </Grid>
          </StyledGrid>
        </Container>
      </Box>
    </motion.div>
  );
}

export default UserMenu;
