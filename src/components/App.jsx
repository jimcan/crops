import { ThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toggleDarkMode } from '../redux/actions';
import { darkTheme, lightTheme } from '../themes';
import Header from './Header';
import HomePage from './HomePage';
import SettingsPage from './SettingsPage'

const { ipcRenderer } = window.require('electron')

function App({ dispatch, page, theme, darkMode }) {
  
  useEffect(() => {
    ipcRenderer.send('change-theme', theme)
    ipcRenderer.on('system-theme-changed', isDarkMode => {
      const shouldToggleDarkMode =
        theme === 'dark' || (theme === 'system' && isDarkMode)
      dispatch(toggleDarkMode(shouldToggleDarkMode))
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  return (
    <ThemeProvider
      theme={darkMode ? darkTheme : lightTheme}
    >
      <Header />
      {
        page === 'home'
          ? <HomePage />
          : <SettingsPage />
      }
    </ThemeProvider>
  )
}

export default connect(
  ({ page, settings }) => ({
    page,
    theme: settings.theme,
    darkMode: settings.darkMode
  })
)(App)
