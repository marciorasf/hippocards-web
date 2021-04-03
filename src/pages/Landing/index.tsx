import React from "react"

import { Header, PageContentContainer, Spacing } from "@components"
import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core"

type TodoItem = {
  label: string
  done: boolean
}

const todoItems: TodoItem[] = [
  { label: "Add palette page", done: false },
  { label: "Improve basic design", done: false },
  { label: "See flashcard answer on card click", done: false },
  { label: "Mark flashcard as known", done: false },
  { label: "Mark flashcard as bookmarked", done: false },
  { label: "Add filter on CategoryPage", done: false },
  {
    label: "Add FAB on CategoryPage when createFlashcard card is not visible",
    done: false,
  },
  { label: "Redesign app", done: false },
  { label: "Create Study Mode", done: false },
]

const Landing: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12}>
        <PageContentContainer>
          <Typography variant="h3">Landing</Typography>

          <Spacing orientation="horizontal" size={4} />

          <Typography variant="h4">To Do</Typography>

          <List dense>
            {todoItems.map((item) => (
              <ListItem key={item.label}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    value={item.done}
                  />
                </ListItemIcon>

                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </PageContentContainer>
      </Grid>
    </Grid>
  )
}

export default Landing
