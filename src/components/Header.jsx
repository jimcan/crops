import { AppBar, Button, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { connect } from 'react-redux'
import { changePage } from '../redux/actions'
import { toggleOpenDrawer } from '../redux/actions/drawer'
import SideDrawer from './SideDrawer'

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
  link: {
    color: 'inherit'
  },
  active: {
    color: 'inherit',
    fontWeight: 'bold'
  }
})

const pages = [
  { page: 'home', name: 'Home' },
  { page: 'settings', name: 'Settings' }
]

function Header({
  page,
  drawerState,
  goTo,
  toggleDrawer
}) {
  const classes = useStyles()

  const toPage = (e, page) => {
    e.preventDefault()
    goTo(page)
  }

  return (
    <>
      <AppBar variant='dense'>
        <div className={classes.header}>
          <div className={classes.leftSide}>
            <IconButton
              style={{ color: 'white' }}
              onClick={e => {
                e.preventDefault()
                toggleDrawer(!drawerState)
              }}
            >
              <Menu />
            </IconButton>
            <Typography>Logo</Typography>
          </div>
          <div className={classes.rightSide}>
            {
              pages.map(p => (
                <Button
                  key={p.page}
                  className={page === p.page ? classes.active : classes.link}
                  onClick={e => toPage(e, p.page)}
                >
                  { p.name }
                </Button>
              ))
            }
          </div>
        </div>
      </AppBar>
      <SideDrawer/>
    </>
  )
}

export default connect(
  ({ page, drawer }) => ({ page, drawerState: drawer }),
  dispatch => ({
    goTo(page) {
      dispatch(changePage(page))
    },
    toggleDrawer(drawerState) {
      dispatch(toggleOpenDrawer(drawerState))
    }
  })
)(Header)