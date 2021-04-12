import { makeStyles } from "@material-ui/core"

export const categoryCardHeight = 250

const useStyles = makeStyles((_theme) => ({
  card: {
    minHeight: categoryCardHeight,
    height: "100%",
  },
}))

export default useStyles
