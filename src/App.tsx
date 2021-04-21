import React from "react"

import Routes from "@/routes"
import { Container } from "@material-ui/core"

function App() {
  return (
    <Container style={{ height: "100vh" }} maxWidth={false} disableGutters>
      <Routes />
    </Container>
  )
}

export default App
