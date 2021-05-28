import { Formik, Form } from "formik"
import React, { useState } from "react"
import { useParams } from "react-router"

import { FormikInputField, Loading, Spacing } from "@components"
import useDidMount from "@hooks/useDidMount"
import {
  Typography,
  Button,
  Grid,
  Container,
  CircularProgress,
} from "@material-ui/core"
import errorService from "@services/error"
import userService from "@services/user"

import InvalidTokenPage from "./InvalidToken"

const ChangePassword: React.FC = () => {
  const params = useParams() as { token: string }
  const { token } = params
  const [isTokenValid, setIsTokenValid] = useState<boolean>()
  const [verifyingToken, setVerifyingToken] = useState(true)

  async function verifyToken() {
    try {
      await userService.verifyRecoverPasswordToken(token)
      setIsTokenValid(true)
    } catch (err) {
      setIsTokenValid(false)
    }

    setVerifyingToken(false)
  }

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

  useDidMount(() => {
    verifyToken()
  })

  return (
    <Container maxWidth="xs">
      <Loading loading={verifyingToken}>
        {isTokenValid ? (
          <>
            <Spacing orientation="horizontal" size={10} />

            <Typography variant="h6">Enter your new password</Typography>

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
                    email:
                      "An error ocurred, please contact marciorasf@gmail.com",
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
                            <CircularProgress
                              size={16}
                              style={{ color: "white" }}
                            />
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
          </>
        ) : (
          <InvalidTokenPage />
        )}
      </Loading>
    </Container>
  )
}

export default ChangePassword
