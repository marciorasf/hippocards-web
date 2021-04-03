import { makeStyles } from "@material-ui/core"

export const categoryCardHeight = 250

const useStyles = makeStyles((_theme) => ({
  card: {
    height: categoryCardHeight,
  },
}))

export default useStyles
