import { Formik, Form } from "formik"
import React from "react"
import { useHistory } from "react-router-dom"

import Header from "@components/Header"
import InputField from "@components/InputField"
import Spacing from "@components/Spacing"
import { Button, Grid } from "@material-ui/core"
import apiService from "@services/api"
import errorService from "@services/error"
import { useUserStore } from "@stores/user"

type LoginData = {
  email: string
  password: string
}

const Login: React.FC = () => {
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
      const { message } = err.response.data
      return message
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12}>
        <Spacing orientation="horizontal" size={4} />

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const message = await handleLogin(values)

            if (message === "user_not_found") {
              return setErrors({
                email: "Email not found",
              })
            }

            if (message === "wrong_password") {
              return setErrors({
                password: "Wrong password",
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
                    login
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

export default Login
