import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'roboto-regular';
    src: url('/assets/font/Roboto-Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: 'roboto-medium';
    src: url('/assets/font/Roboto-Medium.ttf') format('truetype');
  }
  @font-face {
    font-family: 'roboto-bold';
    src: url('/assets/font/Roboto-Bold.ttf') format('truetype');
  }

  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }

  body, input, textarea, select, button, a{
    font-size: 1rem;
    font-family: ${({ theme }) => theme.font.family.regular};
    color: #0F1111;
  }

  @media (max-width: 1080px){
    html{
      font-size: 93.75%;  /* 15px */
    }
  }
  @media (max-width: 720px){
    html{
      font-size: 87.5%; /* 14px */
    }
  }
  body{
    background: #EAEDED;
    min-height: 100vh;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.font.family.medium};
    font-weight: normal;
    margin: 0px;
    padding: 0px;
  }
  p {
    margin: 0px;
    padding: 0px;
  }
  ul, ol {
    margin: 0px;
    padding: 0px;
  }
  li{
    list-style-type: none;
  }

  a,button,input,textarea {
    cursor: pointer;
    text-decoration:none;
    color: inherit;
    outline: none;
  }
  textarea {
    border: solid 1px #B8B8B8;
  }
  button {
    border: none;
    &:disabled {
      background-color:#efefef4d !important;
      color:#1010104d !important;
      border: 1px solid #7676764d !important;
      opacity: 100% !important;
    }
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
