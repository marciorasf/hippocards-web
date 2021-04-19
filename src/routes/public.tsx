import React from "react"
import { Route } from "react-router-dom"

import About from "@pages/About"
import Landing from "@pages/Landing"
import Login from "@pages/Login"
import SignUp from "@pages/SignUp"

const publicRoutes = [
  <Route exact key="landing" path="/" component={Landing} />,
  <Route exact key="login" path="/login" component={Login} />,
  <Route exact key="signup" path="/signup" component={SignUp} />,
  <Route exact key="about" path="/about" component={About} />,
]

export default publicRoutes
