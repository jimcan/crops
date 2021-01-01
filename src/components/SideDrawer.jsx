import { Drawer, makeStyles } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { toggleOpenDrawer } from '../redux/actions/drawer'

const useStyles = makeStyles({  
  drawer: {
    width: 250
  }
})

function SideDrawer({ open, onClose }) {
  const classes = useStyles()

  return (
    <Drawer      
      open={open}
      onClose={e => {
        e.preventDefault()
        onClose(!open)
      }}
    >
      <div className={classes.drawer}>
        <h3>Drawer</h3>
      </div>       
    </Drawer>
  )
}

export default connect(
  ({ drawer }) => ({ open: drawer }),
  dispatch => ({
    onClose(isDrawerOpen) {
      dispatch(toggleOpenDrawer(isDrawerOpen))
    }
  })
)(SideDrawer)