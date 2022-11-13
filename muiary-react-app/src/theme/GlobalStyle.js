import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset}
body {
    height: 100vh;
    background-color: ${(props) => props.theme.bgColor};
    font-family: 'Montserrat', sans-serif;
}
button {
    font-family: 'Montserrat', sans-serif;
}
`;
