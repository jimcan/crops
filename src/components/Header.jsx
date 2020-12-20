import { AppBar, Button, Drawer, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import React, { useState } from 'react'

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 10px'
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center'
  },
  rightSide: {
    display: 'flex',
    alignItems: 'center'
  },
  drawer: {
    width: 250
  }
})

export default function Header() {
  const classes = useStyles()
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerIsOpen(p => !p)
  }

  return (
    <>
      <AppBar variant='dense'>
        <div className={classes.header}>
          <div className={classes.leftSide}>
            <IconButton onClick={toggleDrawer}>
              <Menu />
            </IconButton>
            <Typography>Logo</Typography>
          </div>
          <div className={classes.rightSide}>
            <Button color='inherit'>Home</Button>
            <Button color='inherit'>About</Button>
            <Button color='inherit'>Contact Us</Button>
          </div>
        </div>
      </AppBar>
      <Drawer anchor='left' open={drawerIsOpen} onClose={toggleDrawer}>
        <div className={classes.drawer}></div>
      </Drawer>
    </>
  )
}
