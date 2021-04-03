import { useField } from "formik"
import React, { useState, InputHTMLAttributes } from "react"

import {
  InputProps,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core"
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@material-ui/icons"

type PasswordInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  inputProps?: InputProps
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  label,
  inputProps,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  function handleToggleShowPassword() {
    setShowPassword(!showPassword)
  }

  const [field, { error }] = useField(props)
  return (
    <TextField
      fullWidth
      label={label}
      id={field.name}
      error={Boolean(error)}
      helperText={error}
      variant="outlined"
      InputProps={{
        type: "password",
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleToggleShowPassword}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
        ...inputProps,
      }}
      {...field}
    />
  )
}

export default PasswordInputField
