import { makeStyles } from "@material-ui/core"

import { flashcardCardHeight } from "../styles"

const useStyles = makeStyles((_theme) => ({
  card: {
    minHeight: flashcardCardHeight,
    height: "100%",
  },
}))

export default useStyles
