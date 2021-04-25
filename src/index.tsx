import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import App from "@/App"
import { ScrollToTop } from "@components"
import { CssBaseline, ThemeProvider } from "@material-ui/core"
import UserStoreProvider from "@stores/user"
import theme from "@styles/theme"
import "@styles/global.css"

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UserStoreProvider>
          <ScrollToTop />
          <App />
        </UserStoreProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
