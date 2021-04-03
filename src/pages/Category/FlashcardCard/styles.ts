import { makeStyles } from "@material-ui/core"

import { flashcardCardHeight } from "../styles"

const useStyles = makeStyles((_theme) => ({
  card: {
    height: flashcardCardHeight,
  },
}))

export default useStyles
