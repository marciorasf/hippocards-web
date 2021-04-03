import { makeStyles } from "@material-ui/core"

export const flashcardCardHeight = 250

const useStyles = makeStyles((_theme) => ({
  card: {
    minHeight: flashcardCardHeight,
    height: "100%",
  },
}))

export default useStyles
