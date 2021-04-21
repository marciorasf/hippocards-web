import React from "react"

import Skeleton from "@components/Skeleton"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from "@material-ui/core"
import { MoreVert as MoreVertIcon } from "@material-ui/icons"
import useCommonStyles from "@styles/commonStyles"

const CategoriesSkeleton: React.FC = () => {
  const commonClasses = useCommonStyles()

  const cards = [0, 1, 2]

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
              <Box display="flex" justifyContent="center" p={1}>
                <Skeleton width={184} height={184} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default CategoriesSkeleton
