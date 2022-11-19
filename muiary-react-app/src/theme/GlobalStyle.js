import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset}
body {
    height: 100vh;
    background-color: ${(props) => props.theme.bgColor};
    font-family: 'Montserrat', sans-serif;
    /* color: #232931; */
    color: ${(props) => props.theme.textColor}
}
button {
    font-family: 'Montserrat', sans-serif;
}
`;
