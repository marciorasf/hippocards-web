import React from "react"

import { Typography, Container, Grid } from "@material-ui/core"

import Spacing from "../../../components/Spacing"

const TypographyDemo = () => {
  return (
    <Container maxWidth="md">
      <Grid container direction="column" spacing={2}>
        <Spacing orientation="horizontal" size={2} />

        <Grid item>
          <Typography variant="h1">
            h1: Cupidatat nulla culpa do esse.Ad Lorem culpa nostrud veniam sit
            veniam doloreLorem incididunt
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h2">
            h2: Cupidatat nulla culpa do esseSit dolore consectetur fugiat
            adipisicing excepteur qui ex ci
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h3">
            h3: Cupidatat nulla culpa do esseUt sit commodo irure consequat enim
            excepteur sint eiusmod elit dolore nisi quis nisi qui..
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h4">
            h4: Cupidatat nulla culpa do esseAnim dolor reprehenderit labore
            incididunt esse nostrud labore incididunt adipisicing.Ex amet est
            amet labore adipisicing non commodo dolor ullamco reprehenderit ut
            ullamco..
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h5">
            h5: Cupidatat nulla culpa do esseLabore incididunt commodo cillum
            culpa voluptate minim cillum mollit id.Ullamco consequat quis qui
            laborum ullamco nostrud incididunt.Exercitation ut aliqua eu
            nostrud..
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">
            h6: Cupidatat nulla culpa do esseIrure excepteur proident
            exercitation fugiat sint voluptate consequat adipisicing non
            deserunt..
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="subtitle1">
            subtitle1: Cupidatat nulla culpa do esseQui amet elit ipsum non ut
            fugiat officia.Laborum enim et ex irure Lorem sunt pariatur est
            mollit incididunt..
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="subtitle2">
            subtitle2: Cupidatat nulla culpa do esseUllamco officia ad et qui
            nisi voluptate laborum id ex nulla nisi sint sunt ullamco.Laboris
            irure quis elit id do incididunt proident eiusmod elit reprehenderit
            elit fugiat eu..
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body1">
            body1: Cupidatat nulla culpa do esseLaborum dolor cupidatat nostrud
            aliquip reprehenderit pariatur tempor dolor elit ea.Exercitation
            Lorem laboris voluptate excepteur esse ut deserunt occaecat officia
            mollit do elit aute quis..
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            body2: Cupidatat nulla culpa do esseCillum aliquip ea ullamco id
            labore fugiat esse.Excepteur fugiat quis cillum mollit laborum ipsum
            deserunt amet proident enim Lorem enim id nisi..
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="button">
            button: Cupidatat nulla culpa do esseEa quis et enim veniam
            aute.Aute deserunt sunt Lorem eiusmod dolore in.Labore nisi dolor ea
            do ullamco amet..
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="caption">
            caption: Cupidatat nulla culpa do essDolore anim sint
            reprehenderSunt cillum amet proident Lorem.Et veniam veniam deserunt
            ut qui.it iLorem officia sit magna ea incididunt pariatur
            consectetur cillum Lorem reprehenderit enim culpa qui officia.psum
            nostrud.e.
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="overline">
            overline: Cupidatat nulla culpa do esEnim id consequat irure nostrud
            Lorem incididunt labore do ullamco culpa eu minim ex
            adipisicing.Ipsum ipsum cillum enim sint.se.
          </Typography>
        </Grid>

        <Spacing orientation="horizontal" size={2} />
      </Grid>
    </Container>
  )
}

export default TypographyDemo
