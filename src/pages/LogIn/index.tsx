import { Formik, Form } from "formik"
import React from "react"
import { Link } from "react-router-dom"

import {
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
} from "@material-ui/core"
import useStyles from "@pages/LogIn/styles"
import authService, { LoginInput } from "@services/auth"
import errorService from "@services/error"
import { useUserStore } from "@stores/user"

const LogIn: React.FC = () => {
  const userStore = useUserStore()
  const classes = useStyles()

  async function handleLogin(loginData: LoginInput) {
    try {
      const user = await authService.login(loginData)

      userStore.setUser({
        email: user.email,
      })

      window.location.href = "/categories"
      return
    } catch (err) {
      errorService.handle(err)
      const { message } = err.response.data
      return message as string
    }
  }

  return (
    <Container maxWidth="xs">
      <Spacing orientation="horizontal" size={10} />

      <Typography variant="h3">Log In</Typography>

      <Spacing orientation="horizontal" size={0.5} />

      <Typography variant="h3">Flashcards</Typography>

      <Spacing orientation="horizontal" size={12} />

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
            <Grid container direction="column">
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

              <Spacing orientation="horizontal" size={3} />

              <Grid item>
                <FormikPasswordInputField
                  name="password"
                  label="Password"
                  inputProps={{
                    required: true,
                  }}
                />
              </Grid>

              <Spacing orientation="horizontal" size={6} />

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

              <Spacing orientation="horizontal" size={1.5} />

              <Grid item className={classes.redirectLink}>
                <Typography variant="body2">
                  Doesn't have an account?{" "}
                  <MuiLink component={Link} to="/signup">
                    Sign Up
                  </MuiLink>
                </Typography>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default LogIn
