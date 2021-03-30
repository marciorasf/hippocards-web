import React from "react"
import { Route } from "react-router-dom"

import CategoriesDashboard from "../pages/CategoriesDashboard"
import Category from "../pages/Category"
import Landing from "../pages/Landing"

const privateRoutes = [
  <Route key="category" exact path="/categories/:id" component={Category} />,
  <Route
    key="categories-dashboard"
    exact
    path="/categories"
    component={CategoriesDashboard}
  />,
  <Route key="*" path="/" component={Landing} />,
]

export default privateRoutes
