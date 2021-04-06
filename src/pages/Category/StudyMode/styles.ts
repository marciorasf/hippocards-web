import { makeStyles } from "@material-ui/core"

export const flashcardCardHeight = 250

const useStyles = makeStyles((_theme) => ({
  modal: {
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(3px)",
  },
}))

export default useStyles
