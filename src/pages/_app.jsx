import { ThemeProvider } from "styled-components"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { SessionProvider } from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.min.css';

import { GlobalStyles } from "../styles/global-styles"
import { theme } from "../styles/theme"

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <GlobalStyles />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  )
}
