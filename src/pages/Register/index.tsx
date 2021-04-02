import { Formik, Form } from "formik"
import React from "react"
import { useHistory } from "react-router-dom"

import { Header, InputField, Spacing } from "@components"
import { Button, Grid } from "@material-ui/core"
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
      errorService.handle(err.response)
    }
  }

  async function handleRegister(registerData: CreateUserInput) {
    try {
      await userService.create(registerData)

      handleLogin(registerData)
      return
    } catch (err) {
      errorService.handle(err.response)
      const { message } = err.response.data
      return message as string
    }
  }

  return (
    <Grid container>
      <Grid item>
        <Header />
      </Grid>

      <Grid item xs={12}>
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
                    type="email"
                    required
                  />
                </Grid>

                <Grid item>
                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                    required
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
      </Grid>
    </Grid>
  )
}

export default Register
