import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import Router from "./Router";
import { GlobalStyle } from "./theme/GlobalStyle";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <GlobalStyle />
          <Router />
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
