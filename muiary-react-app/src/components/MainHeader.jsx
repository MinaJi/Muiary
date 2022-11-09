import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeProvider";
import ToggleSwitch from "./ToggleSwitch";
import UserMenu from "./UserMenu";

const Header = styled(Grid)`
  && {
    height: 65px;
    background-color: ${(props) => props.theme.headerBgColor};
    backdrop-filter: blur(20px);
    width: 100%;
    position: fixed;
    padding-left: 15px;
    @media screen and (max-width: 576px) {
      border-bottom: 1px solid ${(props) => props.theme.borderColor};
    }
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

const TextBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: inherit;
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`;

const Img = styled.img`
  height: 50px;
  display: flex;
  cursor: pointer;
`;

const StyledIconBtn = styled(IconButton)`
  && {
    color: ${(props) => props.theme.textColor};
  }
`;

const pages = ["menu1", "menu2", "menu3"];

function MainHeader({ handleOpenUserMenu }) {
  const navi = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [ThemeMode, toggleTheme] = useTheme();

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Header position="static" alignItems="ceter">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Img
              src="/static/logoonlytext.png"
              alt="logo"
              onClick={() => navi("/")}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <StyledIconBtn
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </StyledIconBtn>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
            <Img
              src="/static/logoonlytext.png"
              alt="logo"
              onClick={() => navi("/")}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <TextBtn
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </TextBtn>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Btn onClick={() => navi("/signup")}>Sign up</Btn>
            <Btn onClick={() => navi("/signin")}>Sign in</Btn>
            <ToggleSwitch toggle={toggleTheme} mode={ThemeMode} />
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <StyledIconBtn
              size="large"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              <AddIcon />
            </StyledIconBtn>
          </Box>
        </Toolbar>
        {/* <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
          {userMenu && <UserMenu />}
        </Box> */}
      </Container>
    </Header>
  );
}

export default MainHeader;
