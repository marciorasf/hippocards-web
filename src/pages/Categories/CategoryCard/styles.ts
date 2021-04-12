import { makeStyles } from "@material-ui/core"

import { categoryCardHeight } from "../styles"

const useStyles = makeStyles((_theme) => ({
  card: {
    minHeight: categoryCardHeight,
    height: "100%",
  },
}))

export default useStyles
