import React from "react"

import Routes from "@/routes"
import { Container } from "@material-ui/core"

function App() {
  return (
    <Container maxWidth={false} disableGutters>
      <Routes />
    </Container>
  )
}

export default App
