import React, { useState } from "react"

import { SearchInputField, Spacing } from "@components"
import { Grid, Typography, ButtonBase, Collapse } from "@material-ui/core"
import {
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@material-ui/icons"
import useStyles from "@pages/Categories/MobileFilters/styles"

type MobileFiltersProps = {
  searchText: string
  setSearchText: (value: string) => void
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  searchText,
  setSearchText,
}) => {
  const [expandFilters, setExpandFilters] = useState(false)

  const classes = useStyles()

  function handleToggleExpandFilters() {
    setExpandFilters(!expandFilters)
  }

  function handleChangeSearchText(value: string) {
    setSearchText(value)
  }

  return (
    <>
      <ButtonBase
        onClick={handleToggleExpandFilters}
        className={classes.filtersButton}
      >
        <Grid container alignItems="center" justify="space-between" spacing={2}>
          <Grid item>
            <FilterIcon />
          </Grid>

          <Grid item xs>
            <Typography variant="body1" align="left">
              Filter categories
            </Typography>
          </Grid>

          <Grid item>
            {expandFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Grid>
        </Grid>
      </ButtonBase>

      <Collapse in={expandFilters}>
        <Spacing orientation="horizontal" size={1} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SearchInputField
              label="Search"
              value={searchText}
              onChange={handleChangeSearchText}
            />
          </Grid>
        </Grid>
      </Collapse>
    </>
  )
}

export default MobileFilters
