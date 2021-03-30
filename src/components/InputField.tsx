import { useField } from "formik"
import React, { InputHTMLAttributes } from "react"

import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  required,
  ...props
}) => {
  const [field, { error }] = useField(props)
  return (
    <FormControl error={!!error}>
      <InputLabel htmlFor={field.name}>{label}</InputLabel>
      <Input {...field} type={type} required={required} id={field.name} />
      {error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  )
}

export default InputField
