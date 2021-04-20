import React from "react"
import { Route } from "react-router-dom"

import Landing from "@pages/Landing"
import LogIn from "@pages/LogIn"
import SignUp from "@pages/SignUp"

const publicRoutes = [
  <Route exact key="landing" path="/" component={Landing} />,
  <Route exact key="login" path="/login" component={LogIn} />,
  <Route exact key="signup" path="/signup" component={SignUp} />,
]

export default publicRoutes
