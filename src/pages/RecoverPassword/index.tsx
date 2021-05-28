import { Formik, Form } from "formik"
import React, { useState } from "react"

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
  const [emailSent, setEmailSent] = useState(false)

  async function handleRequestRecoverPassword(email: string) {
    try {
      await userService.requestRecoverPassword(email)

      setEmailSent(true)

      return true
    } catch (err) {
      errorService.handle(err)

      setEmailSent(false)

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

              {emailSent && (
                <>
                  <Spacing orientation="horizontal" size={2} />

                  <Grid item>
                    <Typography
                      variant="h6"
                      align="center"
                      style={{ color: "#81c784" }}
                    >
                      Email sent successfully :)
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default RecoverPassword
