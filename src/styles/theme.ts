import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3695EC",
    },
    secondary: {
      main: "#ED574E",
    },
    background: {
      paper: "#303030",
      default: "#202020",
    },
    header: {
      main: "#1D1D1D",
    },
  },
})

export default theme
