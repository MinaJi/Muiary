import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import { theme, ThemeProviderMode } from "./context/themeProvider";
import { UserDataContextProvider } from "./context/UserDataContext";
import Router from "./Router";
import { GlobalStyle } from "./theme/GlobalStyle";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ThemeProviderMode>
            <GlobalStyle />
            <AuthContextProvider>
              <UserDataContextProvider>
                <Router />
              </UserDataContextProvider>
            </AuthContextProvider>
          </ThemeProviderMode>
        </ThemeProvider>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
