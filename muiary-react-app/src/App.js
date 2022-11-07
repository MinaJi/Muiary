import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/themeProvider";
import Router from "./Router";
import { GlobalStyle } from "./theme/GlobalStyle";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <AuthContextProvider>
            <GlobalStyle />
            <Router />
          </AuthContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
