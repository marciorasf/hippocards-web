import React from "react"
import { Link } from "react-router-dom"

import { Spacing } from "@components"
import { Container, Link as MuiLink, Typography } from "@material-ui/core"

const InvalidTokenPage: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Spacing orientation="horizontal" size={10} />

      <Typography variant="h6">Your token may have expired :/</Typography>

      <Spacing orientation="horizontal" size={2} />

      <Typography variant="h6">
        Please request to{" "}
        <MuiLink component={Link} to="/recover-password">
          recover your password
        </MuiLink>{" "}
        again and we'll send you an email with a new link
      </Typography>
    </Container>
  )
}

export default InvalidTokenPage
