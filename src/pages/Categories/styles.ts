import { makeStyles } from "@material-ui/core"

export const categoryCardHeight = 250

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: categoryCardHeight,
    height: "100%",
  },
  filtersButton: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    width: `calc(100% + 2 * ${theme.spacing(1)}px)`,
    margin: theme.spacing(0, -1),
  },
}))

export default useStyles
