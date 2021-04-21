import { Formik, Form } from "formik"
import React from "react"

import { FormikInputField } from "@components"
import useDidMount from "@hooks/useDidMount"
import useIsMobile from "@hooks/useIsMobile"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@material-ui/core"
import { CreateCategoryInput, UpdateCategoryInput } from "@services/category"
import handleBackButton from "@utils/handleBackButton"

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
  const isMobile = useIsMobile()

  useDidMount(() => {
    if (isMobile) {
      handleBackButton(onClose)
    }
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormikInputField
                    name="name"
                    label="Name"
                    inputProps={{
                      required: true,
                    }}
                  />
                </Grid>
              </Grid>
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
