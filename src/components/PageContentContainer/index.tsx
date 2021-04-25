import React from "react"

import { Container } from "@material-ui/core"

type PageContentContainerProps = {
  children: React.ReactElement | React.ReactElement[]
}

const PageContentContainer: React.FC<PageContentContainerProps> = ({
  children,
}) => {
  return <Container maxWidth="md">{children}</Container>
}

export default PageContentContainer
