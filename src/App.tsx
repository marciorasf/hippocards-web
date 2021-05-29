import React from "react"

import Routes from "@/routes"
import { Container } from "@material-ui/core"

function App() {
  return (
    <Container maxWidth={false} disableGutters style={{ minHeight: "100vh" }}>
      <Routes />
    </Container>
  )
}

export default App
