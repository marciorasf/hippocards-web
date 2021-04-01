import { Formik, Form } from "formik"
import React from "react"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core"

import InputField from "../../../components/InputField"
import {
  CreateFlashcardData,
  UpdateFlashcardData,
} from "../../../interfaces/flashcard"

type FlashcardDialogProps = {
  open: boolean
  title: string
  onClose: () => void
  onOk: (data: CreateFlashcardData | UpdateFlashcardData) => Promise<void>
  okButtonLabel: string
  initialValues?: CreateFlashcardData | UpdateFlashcardData
}

const FlashcardDialog: React.FC<FlashcardDialogProps> = ({
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
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <InputField name="question" label="Question" required />

              <InputField name="answer" label="Answer" required />
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

export default FlashcardDialog
