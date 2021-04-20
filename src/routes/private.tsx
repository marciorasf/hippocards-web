import React from "react"
import { Route } from "react-router-dom"

import Categories from "@pages/Categories"
import Category from "@pages/Category"

const privateRoutes = [
  <Route key="category" exact path="/categories/:id" component={Category} />,
  <Route
    key="categories-dashboard"
    exact
    path="/categories"
    component={Categories}
  />,
  <Route key="*" path="/" component={Categories} />,
]

export default privateRoutes
