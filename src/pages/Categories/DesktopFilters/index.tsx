import React from "react"

import { SearchInputField, Spacing } from "@components"
import { Grid, Typography } from "@material-ui/core"
import useStyles from "@pages/Categories/DesktopFilters/styles"

type DesktopFiltersProps = {
  searchText: string
  setSearchText: (value: string) => void
}

const DesktopFilters: React.FC<DesktopFiltersProps> = ({
  searchText,
  setSearchText,
}) => {
  const classes = useStyles()

  function handleChangeSearchText(value: string) {
    setSearchText(value)
  }

  return (
    <>
      <Typography className={classes.title} variant="body1">
        Filter categories
      </Typography>

      <Spacing orientation="horizontal" size={1.5} />

      <Grid container>
        <Grid item xs={4}>
          <SearchInputField
            label="Search"
            value={searchText}
            onChange={handleChangeSearchText}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default DesktopFilters
