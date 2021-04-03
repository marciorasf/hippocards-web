import { useField } from "formik"
import React, { InputHTMLAttributes } from "react"

import { InputProps, TextField } from "@material-ui/core"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  inputProps?: InputProps
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  inputProps,
  ...props
}) => {
  const [field, { error }] = useField(props)
  return (
    <TextField
      fullWidth
      label={label}
      id={field.name}
      variant="outlined"
      error={Boolean(error)}
      helperText={error}
      InputProps={inputProps}
      {...field}
    />
  )
}

export default InputField
