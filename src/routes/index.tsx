import React, { useState } from "react"
import { Redirect, Route, Switch, RouteProps } from "react-router-dom"

import { __is_dev_env__ } from "@/config"
import { Loading } from "@components"
import useDidMount from "@hooks/useDidMount"
import { Grid, CircularProgress } from "@material-ui/core"
import About from "@pages/About"
import Categories from "@pages/Categories"
import Category from "@pages/Category"
import ChangePassword from "@pages/ChangePassword"
import Landing from "@pages/Landing"
import LogIn from "@pages/LogIn"
import RecoverPassword from "@pages/RecoverPassword"
import SignUp from "@pages/SignUp"
import developmentRoutes from "@routes/development"
import authService from "@services/auth"
import errorService from "@services/error"
import { useUserStore } from "@stores/user"

type CustomRouteProps = RouteProps & {
  isLoggedIn: boolean
}

const LoggedInRoute: React.FC<CustomRouteProps> = ({
  component,
  isLoggedIn,
  ...rest
}) => {
  if (isLoggedIn) {
    return <Route component={component} {...rest} />
  }

  return <Redirect to={{ pathname: "/login" }} />
}

const NotLoggedInRoute: React.FC<CustomRouteProps> = ({
  component,
  isLoggedIn,
  ...rest
}) => {
  if (!isLoggedIn) {
    return <Route component={component} {...rest} />
  }

  return <Redirect to={{ pathname: "/categories" }} />
}

const LoadDataComponent = () => {
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const userStore = useUserStore()

  const getInitialData = async () => {
    try {
      const user = await authService.ok()

      userStore.setUser({
        id: user.id,
        email: user.email,
      })

      setIsLoggedIn(true)
    } catch (error) {
      errorService.handle(error)
      setIsLoggedIn(false)
    }

    setLoading(false)
  }

  useDidMount(() => {
    getInitialData()
  })

  return (
    <Loading
      loading={loading}
      customLoadingElement={
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{
            height: "100%",
            minHeight: "100vh",
          }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      }
    >
      <Switch>
        <LoggedInRoute
          isLoggedIn={isLoggedIn}
          exact
          path="/categories/:id"
          component={Category}
        />
        <LoggedInRoute
          isLoggedIn={isLoggedIn}
          exact
          path="/categories"
          component={Categories}
        />
        <NotLoggedInRoute
          exact
          isLoggedIn={isLoggedIn}
          path="/login"
          component={LogIn}
        />
        <NotLoggedInRoute
          exact
          isLoggedIn={isLoggedIn}
          path="/signup"
          component={SignUp}
        />
        <NotLoggedInRoute
          path="/recover-password"
          isLoggedIn={isLoggedIn}
          exact
          component={RecoverPassword}
        />
        <Route
          path="/change-password/:token"
          exact
          component={ChangePassword}
        />
        <Route path="/about" exact component={About} />
        <Route path="/" component={Landing} />
      </Switch>
    </Loading>
  )
}

const Routes = () => (
  <Switch>
    {__is_dev_env__ && developmentRoutes}
    <Route path="/" component={LoadDataComponent} />
  </Switch>
)

export default Routes
