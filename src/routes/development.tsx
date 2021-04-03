import React from "react"
import { Route } from "react-router-dom"

import PaletteDemo from "@pages/Development/Palette"
import TypographyDemo from "@pages/Development/Typography"

const developmentRoutes = [
  <Route
    exact
    key="typography"
    path="/dev/typography"
    component={TypographyDemo}
  />,
  <Route exact key="palette" path="/dev/palette" component={PaletteDemo} />,
]

export default developmentRoutes
