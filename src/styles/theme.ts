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
  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
    },
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    button: {},
    caption: {},
    overline: {},
  },
})

export default theme
