import { AppBar, createMuiTheme, IconButton, makeStyles, MenuItem, Select, Switch, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import React from 'react'
import { connect } from 'react-redux'
import { changePage, changeTheme, toggleLaunchAtStartup } from '../redux/actions'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  body: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
  },
  settings: {
    width: 500,
    marginTop: theme.spacing(2),
    [theme.breakpoints.down(640)]: {
      width: '80%',
    },
  },
  setting: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  arrowBack: {
    // color: theme.overrides.MuiAppBar.colorPrimary.color,
  },
}))


const muiInnerTheme = (outerTheme) =>
  createMuiTheme({
    ...outerTheme,
    typography: {
      ...outerTheme.typography,
      body1: {
        ...outerTheme.typography.body1,
        fontSize: 15,
      },
    },
  })

const muiDarkInnerTheme = (outerTheme) => {
  const innerTheme = muiInnerTheme(outerTheme);
  return createMuiTheme({
    ...innerTheme,
    palette: {
      ...innerTheme.palette,
      text: {
        ...innerTheme.palette.text,
        primary: '#fff',
      },
    },
  })
}

function SettingsPage({
  dispatch,
  theme,
  launchAtStartup
}) {
  const classes = useStyles()

  const handleGoBack = e => { 
    e.preventDefault()
    dispatch(changePage('home'))
  }
  
  const handleThemeChange = e => {
    e.preventDefault()
    dispatch(changeTheme(e.target.value))
  }

  const handleToggleLaunchAtStartup = e => {
    e.preventDefault()
    dispatch(toggleLaunchAtStartup(e.target.checked))
  }

  return (
    <ThemeProvider
      theme={(outerTheme) => 
        outerTheme.palette.type === 'dark'
          ? muiDarkInnerTheme(outerTheme)
          : muiInnerTheme(outerTheme)
      }
    >
      <div className={classes.root}>
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton edge='start' onClick={handleGoBack}>
              <ArrowBack className={classes.arrowBack} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <div className={classes.body}>
          <div className={classes.settings}>
            <div className={classes.setting}>
              <Typography>Theme</Typography>
              <Select onChange={handleThemeChange} value={theme}>
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="system">System</MenuItem>
              </Select>
            </div>
            <div className={classes.setting}>
              <Typography>Launch at startup (minimized)</Typography>
              <Switch
                color="primary"
                checked={launchAtStartup}
                onChange={handleToggleLaunchAtStartup}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default connect(
  ({ settings }) => ({
    theme: settings.theme,
    launchAtStartup: settings.launchAtStartup
  })
)(SettingsPage)
