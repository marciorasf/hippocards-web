import { Formik, Form } from "formik"
import React from "react"
import { useHistory } from "react-router-dom"

import { Button, Container, Grid } from "@material-ui/core"

import InputField from "@components/InputField"
import Spacing from "@components/Spacing"
import apiService from "@services/api"
import errorService from "@services/error"
import { useUserStore } from "@stores/user"

type RegisterData = {
  email: string
  password: string
}

type LoginData = RegisterData

const Register: React.FC = () => {
  const userStore = useUserStore()
  const history = useHistory()

  async function handleLogin(loginData: LoginData) {
    try {
      const { data } = await apiService.post("/login", loginData)

      userStore.setUser({
        email: data.email,
      })

      history.push("/categories")
    } catch (err) {
      errorService.handle(err.response)
    }
  }

  async function handleRegister(registerData: RegisterData) {
    try {
      await apiService.post("/users", registerData)

      handleLogin(registerData)
    } catch (err) {
      errorService.handle(err.response)
      const { message } = err.response.data
      return message
    }
  }

  return (
    <Container>
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
                <InputField name="email" label="Email" type="email" required />
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
    </Container>
  )
}

export default Register
