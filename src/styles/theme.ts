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
      fontVariant: "small-caps",
      fontWeight: 500,
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
      fontVariant: "small-caps",
      fontWeight: 500,
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontVariant: "small-caps",
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
      fontVariant: "small-caps",
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
      fontVariant: "small-caps",
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
      fontVariant: "small-caps",
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 400,
    },
    subtitle2: {
      fontWeight: 400,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontWeight: 700,
    },
    overline: {
      fontWeight: 600,
    },
  },
})

export default theme
