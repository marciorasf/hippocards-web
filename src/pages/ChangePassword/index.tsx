import { Formik, Form } from "formik"
import React, { useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

import { FormikPasswordInputField, Loading, Spacing } from "@components"
import useDidMount from "@hooks/useDidMount"
import {
  Typography,
  Button,
  Grid,
  Container,
  CircularProgress,
  Link as MuiLink,
} from "@material-ui/core"
import errorService from "@services/error"
import userService from "@services/user"

import InvalidTokenPage from "./InvalidToken"

const ChangePassword: React.FC = () => {
  const params = useParams() as { token: string }
  const paramsToken = params.token
  const [isTokenValid, setIsTokenValid] = useState<boolean>()
  const [verifyingToken, setVerifyingToken] = useState(true)
  const [passwordChanged, setPasswordChanged] = useState(false)

  async function verifyToken(token: string) {
    try {
      await userService.verifyRecoverPasswordToken(token)
      setIsTokenValid(true)
    } catch (err) {
      errorService.handle(err)

      setIsTokenValid(false)
    }

    setVerifyingToken(false)
  }

  async function handleChangePassword(password: string, token: string) {
    try {
      await userService.changePassword(password, token)

      setPasswordChanged(true)

      return true
    } catch (err) {
      errorService.handle(err)

      setPasswordChanged(false)

      const { message } = err.response.data
      return message as string
    }
  }

  useDidMount(() => {
    verifyToken(paramsToken)
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
              initialValues={{ password: "" }}
              onSubmit={async ({ password }, { setErrors }) => {
                const message = await handleChangePassword(
                  password,
                  paramsToken
                )

                if (message === "invalid_token") {
                  return setErrors({
                    password: "Invalid token",
                  })
                }

                if (message === "user_not_found") {
                  return setErrors({
                    password:
                      "We couldn't find your account. Please contact marciorasf@gmail.com",
                  })
                }

                if (typeof message === "string") {
                  return setErrors({
                    password:
                      "An error ocurred, please contact marciorasf@gmail.com",
                  })
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Grid container direction="column">
                    <Grid item>
                      <FormikPasswordInputField
                        name="password"
                        label="New password"
                        inputProps={{
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
                        change password
                      </Button>
                    </Grid>

                    {passwordChanged && (
                      <>
                        <Spacing orientation="horizontal" size={2} />

                        <Grid item>
                          <Typography
                            variant="h6"
                            align="center"
                            style={{ color: "#81c784" }}
                          >
                            Password changed successfully :)
                          </Typography>
                        </Grid>

                        <Spacing orientation="horizontal" size={1} />

                        <Grid item>
                          <Typography variant="h6" align="center">
                            Now you can{" "}
                            <MuiLink component={Link} to="/login">
                              login
                            </MuiLink>
                          </Typography>
                        </Grid>
                      </>
                    )}
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
