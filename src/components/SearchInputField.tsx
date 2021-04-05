import React from "react"

import { InputProps, TextField, InputAdornment } from "@material-ui/core"
import { Search as SearchIcon } from "@material-ui/icons"

type SearchInputFieldProps = {
  label: string
  value?: string
  onChange: (value: string) => any
  inputProps?: InputProps
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({
  label,
  value,
  onChange,
  inputProps,
}) => {
  function onChangeAdapter(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    onChange(event.target.value)
  }

  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChangeAdapter}
      variant="standard"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{<SearchIcon />}</InputAdornment>
        ),
        ...inputProps,
      }}
    />
  )
}

export default SearchInputField
