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
import { UserAuth } from "../context/AuthContext";

const Header = styled(Grid)`
  && {
    height: 65px;
    background-color: ${(props) => props.theme.headerBgColor};
    backdrop-filter: blur(20px);
    width: 100%;
    position: fixed;
    padding-left: 15px;
    z-index: 100;
    @media screen and (max-width: 900px) {
      border-bottom: 1px solid ${(props) => props.theme.borderColor};
    }
  }
`;

const Btn = styled.button`
  background-color: ${(props) => props.theme.buttonColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  width: 72px;
  height: 40px;
  margin: 3px;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.red};
    border: none;
    color: #fff;
  }
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

const list = [
  {
    pages: "My muiary",
    url: "/mymuiary",
  },
  {
    pages: "menu1",
    url: "/menu2",
  },
];

function MainHeader({ handleOpenUserMenu }) {
  const navi = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [ThemeMode, toggleTheme] = useTheme();
  const { user, logOut } = UserAuth();

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      navi("/");
    } catch (error) {
      console.log(error.message);
    }
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
              {list.map((item, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" onClick={() => navi(item.url)}>
                    {item.pages}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
            <Img
              style={{ marginTop: "7px" }}
              src="/static/logoonlytext.png"
              alt="logo"
              onClick={() => navi("/")}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {list.map((item, i) => (
              <TextBtn
                key={i}
                onClick={() => navi(item.url)}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {item.pages}
              </TextBtn>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {user ? (
              <Btn onClick={() => navi("/mypage")}>My page</Btn>
            ) : (
              <Btn onClick={() => navi("/signup")}>Sign up</Btn>
            )}
            {user ? (
              <Btn onClick={handleSignOut}>Sign out</Btn>
            ) : (
              <Btn onClick={() => navi("/signin")}>Sign in</Btn>
            )}
            <div style={{ marginTop: "5px" }}>
              <ToggleSwitch toggle={toggleTheme} mode={ThemeMode} />
            </div>
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
      </Container>
    </Header>
  );
}

export default MainHeader;
