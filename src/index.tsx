import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import App from "@/App"
import { CssBaseline, ThemeProvider } from "@material-ui/core"
import UserStoreProvider from "@stores/user"
import theme from "@styles/theme"

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UserStoreProvider>
          <App />
        </UserStoreProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
