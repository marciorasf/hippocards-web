import React, { useState } from "react"
import { Route, Switch, useHistory } from "react-router-dom"

import { __is_dev_env__ } from "@/config"
import Loading from "@components/Loading"
import useDidMount from "@hooks/useDidMount"
import developmentRoutes from "@routes/development"
import privateRoutes from "@routes/private"
import publicRoutes from "@routes/public"
import apiService from "@services/api"
import errorService from "@services/error"
import { useUserStore } from "@stores/user"

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
    {__is_dev_env__ && developmentRoutes}
    <Route path="/" component={PrivateComponent} />
  </Switch>
)

export default Routes
