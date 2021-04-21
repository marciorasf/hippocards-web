import React from "react"

import { makeStyles } from "@material-ui/core"
import { Skeleton as MuiSkeleton, SkeletonProps } from "@material-ui/lab"

const useStyles = makeStyles({
  skeleton: {
    transform: "scale(1)",
  },
})

const Skeleton: React.FC<SkeletonProps> = (props) => {
  const classes = useStyles()

  return <MuiSkeleton {...props} className={classes.skeleton} />
}

export default Skeleton
