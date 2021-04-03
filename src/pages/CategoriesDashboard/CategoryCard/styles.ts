import { makeStyles } from "@material-ui/core"

import { categoryCardHeight } from "../styles"

const useStyles = makeStyles((_theme) => ({
  card: {
    height: categoryCardHeight,
  },
}))

export default useStyles
