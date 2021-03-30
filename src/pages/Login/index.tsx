import { Formik, Form } from "formik"
import React from "react"
import { useHistory } from "react-router-dom"

import { Button, Container, Grid } from "@material-ui/core"

import InputField from "../../components/InputField"
import apiService from "../../services/api"
import errorService from "../../services/error"
import { useUserStore } from "../../store/user"

const Login: React.FC = () => {
  const userStore = useUserStore()
  const history = useHistory()

  return (
    <Container>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const { data } = await apiService.post("/login", values)

            userStore.setUser({
              email: data.email,
            })

            history.push("/categories")
          } catch (err) {
            errorService.handle(err.response)
            const { message } = err.response.data

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
                  login
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default Login
