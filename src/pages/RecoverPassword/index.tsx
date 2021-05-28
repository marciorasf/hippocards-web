import { Formik, Form } from "formik"
import React from "react"

import { FormikInputField, Spacing } from "@components"
import {
  Typography,
  Button,
  Grid,
  Container,
  CircularProgress,
} from "@material-ui/core"
import errorService from "@services/error"
import userService from "@services/user"

const RecoverPassword: React.FC = () => {
  async function handleRequestRecoverPassword(email: string) {
    try {
      await userService.requestRecoverPassword(email)
      return true
    } catch (err) {
      errorService.handle(err)

      const { message } = err.response.data
      return message as string
    }
  }

  return (
    <Container maxWidth="xs">
      <Spacing orientation="horizontal" size={10} />

      <Typography variant="h6">
        We'll send you a link to change your password
      </Typography>

      <Spacing orientation="horizontal" size={6} />

      <Formik
        initialValues={{ email: "" }}
        onSubmit={async ({ email }, { setErrors }) => {
          const message = await handleRequestRecoverPassword(email)

          if (message === "user_not_found") {
            return setErrors({
              email: "Email not found",
            })
          }

          if (typeof message === "string") {
            return setErrors({
              email: "An error ocurred, please contact marciorasf@gmail.com",
            })
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container direction="column">
              <Grid item>
                <FormikInputField
                  name="email"
                  label="Email"
                  inputProps={{
                    type: "email",
                    required: true,
                    autoFocus: true,
                  }}
                />
              </Grid>

              <Spacing orientation="horizontal" size={4} />

              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                  endIcon={
                    isSubmitting && (
                      <CircularProgress size={16} style={{ color: "white" }} />
                    )
                  }
                >
                  send email
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default RecoverPassword
