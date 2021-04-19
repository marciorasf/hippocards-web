import { Formik, Form } from "formik"
import React from "react"
import { useHistory, Link } from "react-router-dom"

import {
  Header,
  FormikInputField,
  FormikPasswordInputField,
  Spacing,
} from "@components"
import {
  Typography,
  Button,
  Grid,
  Container,
  Link as MuiLink,
  makeStyles,
} from "@material-ui/core"
import authService, { LoginInput } from "@services/auth"
import errorService from "@services/error"
import userService, { CreateUserInput } from "@services/user"
import { useUserStore } from "@stores/user"

const useStyles = makeStyles({
  redirectLink: {
    alignSelf: "flex-end",
  },
})

const SignUp: React.FC = () => {
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
    } catch (err) {
      errorService.handle(err)
    }
  }

  async function handleSignUp(signUpData: CreateUserInput) {
    try {
      await userService.create(signUpData)

      handleLogin(signUpData)
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

          <Typography variant="h4">Sign Up</Typography>

          <Spacing orientation="horizontal" size={4} />

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const message = await handleSignUp(values)

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
                    <MuiLink component={Link} to="/Login">
                      Already have an account?
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
                      sign up
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

export default SignUp
