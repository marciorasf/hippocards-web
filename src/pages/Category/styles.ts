import { makeStyles } from "@material-ui/core"

export const flashcardCardHeight = 250

const useStyles = makeStyles((_theme) => ({
  card: {
    height: flashcardCardHeight,
  },
}))

export default useStyles
