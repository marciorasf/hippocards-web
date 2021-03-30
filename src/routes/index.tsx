import React, { useState } from "react"
import { Route, Switch, useHistory } from "react-router-dom"

import Loading from "../components/Loading"
import useDidMount from "../hooks/useDidMount"
import apiService from "../services/api"
import errorService from "../services/error"
import { useUserStore } from "../store/user"
import privateRoutes from "./private"
import publicRoutes from "./public"

const PrivateComponent = () => {
  const [loading, setLoading] = useState(true)

  const history = useHistory()
  const userStore = useUserStore()

  const getInitialData = async () => {
    try {
      const { data }: any = await apiService.get("/ok")

      userStore.setUser({
        id: data.id,
        email: data.email,
      })
    } catch (error) {
      errorService.handle(error)
      history.push("/login")
    }

    setLoading(false)
  }

  useDidMount(() => {
    getInitialData()
  })

  return (
    <Loading loading={loading}>
      <Switch>{privateRoutes}</Switch>
    </Loading>
  )
}

const Routes = () => (
  <Switch>
    {publicRoutes}
    <Route path="/" component={PrivateComponent} />
  </Switch>
)

export default Routes
