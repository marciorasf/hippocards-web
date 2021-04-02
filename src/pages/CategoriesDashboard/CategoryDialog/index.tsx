import { Formik, Form } from "formik"
import React from "react"

import InputField from "@components/InputField"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core"
import { CreateCategoryInput, UpdateCategoryInput } from "@services/category"

type CategoryDialogProps = {
  open: boolean
  title: string
  onClose: () => void
  onOk: (data: CreateCategoryInput | UpdateCategoryInput) => Promise<void>
  okButtonLabel: string
  initialValues?: CreateCategoryInput | UpdateCategoryInput
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  open,
  title,
  onClose,
  onOk,
  okButtonLabel,
  initialValues,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={{
          name: "",
          ...initialValues,
        }}
        onSubmit={async (values) => {
          await onOk(values)
          onClose()
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <InputField name="name" label="Name" required />
            </DialogContent>
            <DialogActions>
              <Button
                disabled={isSubmitting}
                onClick={onClose}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {okButtonLabel}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

export default CategoryDialog
