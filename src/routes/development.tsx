import React from "react"
import { Route } from "react-router-dom"

import TypographyDemo from "../pages/Development/Typography"

const developmentRoutes = [
  <Route
    exact
    key="typography"
    path="/dev/typography"
    component={TypographyDemo}
  />,
]

export default developmentRoutes
