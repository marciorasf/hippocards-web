import React from "react"

import { Drawer, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

type SidebarProps = {
  open: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const classes = useStyles()

  return (
    <Drawer open={open} onClose={onClose}>
      <div>Ola</div>
    </Drawer>
  )
}

export default Sidebar
