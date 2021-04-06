import React from "react"
import { Route } from "react-router-dom"

import About from "@pages/About"
import Landing from "@pages/Landing"
import Login from "@pages/Login"
import Register from "@pages/Register"

const publicRoutes = [
  <Route exact key="landing" path="/" component={Landing} />,
  <Route exact key="login" path="/login" component={Login} />,
  <Route exact key="register" path="/register" component={Register} />,
  <Route exact key="about" path="/about" component={About} />,
]

export default publicRoutes
