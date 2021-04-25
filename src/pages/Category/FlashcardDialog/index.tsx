import { Formik, Form } from "formik"
import React from "react"

import { FormikInputField } from "@components"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  IconButton,
  makeStyles,
  CircularProgress,
} from "@material-ui/core"
import { Close as CloseIcon } from "@material-ui/icons"
import { CreateFlashcardInput } from "@services/flashcard"

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))

type FlashcardDialogProps = {
  open: boolean
  title: string
  onClose: () => void
  onOk: (data: CreateFlashcardInput) => Promise<void>
  okButtonLabel: string
  initialValues?: CreateFlashcardInput
}

const FlashcardDialog: React.FC<FlashcardDialogProps> = ({
  open,
  title,
  onClose,
  onOk,
  okButtonLabel,
  initialValues,
}) => {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Formik
        initialValues={{
          question: "",
          answer: "",
          ...initialValues,
        }}
        onSubmit={async (values) => {
          await onOk(values)
          onClose()
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <DialogTitle>
              {title}
              <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={onClose}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormikInputField
                    name="question"
                    label="Question"
                    inputProps={{
                      required: true,
                      multiline: true,
                      autoFocus: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormikInputField
                    name="answer"
                    label="Answer"
                    inputProps={{
                      required: true,
                      multiline: true,
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
                endIcon={
                  isSubmitting && (
                    <CircularProgress size={16} style={{ color: "white" }} />
                  )
                }
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

export default FlashcardDialog
