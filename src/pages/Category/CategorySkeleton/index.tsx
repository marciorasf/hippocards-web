import React from "react"

import Skeleton from "@components/Skeleton"
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  IconButton,
} from "@material-ui/core"
import {
  MoreVert as MoreVertIcon,
  BookmarkBorder as NotBookmarkedIcon,
  CheckCircleOutlined as UnknownIcon,
} from "@material-ui/icons"
import useCommonStyles from "@styles/commonStyles"

const CategorySkeleton: React.FC = () => {
  const commonClasses = useCommonStyles()

  const cards = [0, 1]

  return (
    <Grid container spacing={2} alignItems="stretch">
      {cards.map((cardId) => (
        <Grid key={cardId} item md={4} sm={6} xs={12}>
          <Card className={commonClasses.fullHeight}>
            <CardHeader
              title={<Skeleton width={144} height={28} />}
              action={
                <IconButton aria-label="settings" disabled>
                  <MoreVertIcon />
                </IconButton>
              }
            />

            <CardContent>
              <Skeleton width="100%" height={184} />
            </CardContent>

            <CardActions>
              <Grid container justify="flex-end">
                <Grid item>
                  <IconButton disabled>
                    <NotBookmarkedIcon />
                  </IconButton>
                </Grid>

                <Grid item>
                  <IconButton disabled>
                    <UnknownIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default CategorySkeleton
