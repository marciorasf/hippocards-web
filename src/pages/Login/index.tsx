import { Formik, Form } from "formik"
import React from "react"
import { Link, useHistory } from "react-router-dom"

import {
  Header,
  FormikInputField,
  FormikPasswordInputField,
  Spacing,
} from "@components"
import {
  Button,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  makeStyles,
} from "@material-ui/core"
import authService, { LoginInput } from "@services/auth"
import errorService from "@services/error"
import { useUserStore } from "@stores/user"

const useStyles = makeStyles({
  redirectLink: {
    alignSelf: "flex-end",
  },
})

const Login: React.FC = () => {
  const userStore = useUserStore()
  const history = useHistory()
  const classes = useStyles()

  async function handleLogin(loginData: LoginInput) {
    try {
      const user = await authService.login(loginData)

      userStore.setUser({
        email: user.email,
      })

      history.push("/categories")
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

          <Typography variant="h4">Login</Typography>

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
                    <FormikInputField
                      name="email"
                      label="Email"
                      inputProps={{
                        type: "email",
                        required: true,
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <FormikPasswordInputField
                      name="password"
                      label="Password"
                      inputProps={{
                        required: true,
                      }}
                    />
                  </Grid>

                  <Grid item className={classes.redirectLink}>
                    <MuiLink component={Link} to="/register">
                      Doesn't have an account?
                    </MuiLink>
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
      </Grid>
    </Grid>
  )
}

export default Login
