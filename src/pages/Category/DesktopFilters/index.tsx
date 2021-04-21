import React from "react"

import { SearchInputField, Spacing } from "@components"
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core"
import { Filters, FilterValue } from "@pages/Category"
import useStyles from "@pages/Category/DesktopFilters/styles"

type DesktopFiltersProps = {
  searchText: string
  setSearchText: (value: string) => void
  filters: Filters
  setFilters: (value: Filters) => void
}

const DesktopFilters: React.FC<DesktopFiltersProps> = ({
  searchText,
  setSearchText,
  filters,
  setFilters,
}) => {
  const classes = useStyles()

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
      <Typography className={classes.title} variant="body1">
        Filter flashcards
      </Typography>

      <Spacing orientation="horizontal" size={1.5} />

      <Grid container spacing={2}>
        <Grid item md={4} sm={6}>
          <SearchInputField
            label="Search"
            value={searchText}
            onChange={handleChangeSearchText}
          />
        </Grid>

        <Grid item md={2} sm={3}>
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

        <Grid item md={2} sm={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Learned</InputLabel>

            <Select
              value={filters.isKnown}
              label="Learned"
              onChange={({ target }) =>
                handleChangeFilterValue("isKnown", target.value as FilterValue)
              }
            >
              <MenuItem value="both">Both</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default DesktopFilters
