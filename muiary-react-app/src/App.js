import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import { theme, ThemeProviderMode } from "./context/themeProvider";
import Router from "./Router";
import { GlobalStyle } from "./theme/GlobalStyle";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ThemeProviderMode>
            <GlobalStyle />
            <AuthContextProvider>
              <Router />
            </AuthContextProvider>
          </ThemeProviderMode>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
