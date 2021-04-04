import { Formik, Form } from "formik"
import React from "react"
import { useHistory } from "react-router-dom"

import { Header, InputField, PasswordInputField, Spacing } from "@components"
import { Typography, Button, Grid, Container } from "@material-ui/core"
import authService, { LoginInput } from "@services/auth"
import errorService from "@services/error"
import userService, { CreateUserInput } from "@services/user"
import { useUserStore } from "@stores/user"

const Register: React.FC = () => {
  const userStore = useUserStore()
  const history = useHistory()

  async function handleLogin(loginData: LoginInput) {
    try {
      const user = await authService.login(loginData)

      userStore.setUser({
        email: user.email,
      })

      history.push("/categories")
    } catch (err) {
      errorService.handle(err)
    }
  }

  async function handleRegister(registerData: CreateUserInput) {
    try {
      await userService.create(registerData)

      handleLogin(registerData)
      return
    } catch (err) {
      errorService.handle(err)
      const { message } = err.response.data
      return message as string
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12}>
        <Container maxWidth="xs">
          <Spacing orientation="horizontal" size={6} />

          <Typography variant="h4">Register</Typography>

          <Spacing orientation="horizontal" size={4} />

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const message = await handleRegister(values)

              if (message === "email_in_use") {
                return setErrors({
                  email: "Email already in use",
                })
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <InputField
                      name="email"
                      label="Email"
                      inputProps={{
                        type: "email",
                        required: true,
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <PasswordInputField
                      name="password"
                      label="Password"
                      inputProps={{
                        required: true,
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                      disabled={isSubmitting}
                    >
                      register
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
      </Grid>
    </Grid>
  )
}

export default Register
