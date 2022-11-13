import React, { createContext, useCallback, useContext, useState } from "react";
import { darkTheme, lightTheme } from "../theme/theme";
import { ThemeProvider as StyledProvider } from "styled-components";
import { createTheme } from "@mui/material";

const ThemeContext = createContext({});

const ThemeProviderMode = ({ children }) => {
  const LocalTheme = window.localStorage.getItem("theme") || "light";
  const [ThemeMode, setThemeMode] = useState(LocalTheme);
  const themeObject = ThemeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ ThemeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

function useTheme() {
  const context = useContext(ThemeContext);
  const { ThemeMode, setThemeMode } = context;

  const toggleTheme = useCallback(() => {
    if (ThemeMode === "light") {
      setThemeMode("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      setThemeMode("light");
      window.localStorage.setItem("theme", "light");
    }
  }, [ThemeMode]);

  return [ThemeMode, toggleTheme];
}

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});

export { ThemeProviderMode, useTheme, theme };
