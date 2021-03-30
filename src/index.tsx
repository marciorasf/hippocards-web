import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import { CssBaseline, ThemeProvider } from "@material-ui/core"

import App from "./App"
import UserStoreProvider from "./store/user"
import theme from "./styles/theme"

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserStoreProvider>
          <App />
        </UserStoreProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
