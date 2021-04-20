import React, { useState } from "react"

import { SearchInputField, Spacing } from "@components"
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ButtonBase,
  Collapse,
} from "@material-ui/core"
import {
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@material-ui/icons"
import { Filters, FilterValue } from "@pages/Category"
import useStyles from "@pages/Category/MobileFilters/styles"

type MobileFiltersProps = {
  searchText: string
  setSearchText: (value: string) => void
  filters: Filters
  setFilters: (value: Filters) => void
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  searchText,
  setSearchText,
  filters,
  setFilters,
}) => {
  const [expandFilters, setExpandFilters] = useState(false)

  const classes = useStyles()

  function handleToggleExpandFilters() {
    setExpandFilters(!expandFilters)
  }

  function handleChangeSearchText(value: string) {
    setSearchText(value)
  }

  function handleChangeFilterValue(
    filterKey: keyof Filters,
    value: FilterValue
  ) {
    setFilters({
      ...filters,
      [filterKey]: value,
    })
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
              Filter flashcards
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

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Bookmarked</InputLabel>

              <Select
                value={filters.isBookmarked}
                label="Bookmarked"
                onChange={({ target }) =>
                  handleChangeFilterValue(
                    "isBookmarked",
                    target.value as FilterValue
                  )
                }
              >
                <MenuItem value="both">Both</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Learned</InputLabel>

              <Select
                value={filters.isKnown}
                label="Learned"
                onChange={({ target }) =>
                  handleChangeFilterValue(
                    "isKnown",
                    target.value as FilterValue
                  )
                }
              >
                <MenuItem value="both">Both</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Collapse>
    </>
  )
}

export default MobileFilters
