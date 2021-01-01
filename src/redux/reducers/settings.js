import {
  TOGGLE_DARK_MODE,
  CHANGE_THEME,
  TOGGLE_LAUNCH_AT_STARTUP
} from '../actions'
import { updateObject, createReducer } from './utilities'

const defaultSettings = {
  darkMode: true,
  theme: 'system',
  launchAtStartup: false
}

export default createReducer(defaultSettings, {
  [TOGGLE_DARK_MODE]: toggleDarkMode,
  [CHANGE_THEME]: changeTheme,
  [TOGGLE_LAUNCH_AT_STARTUP]: toggleLaunchAtStartup
})

function toggleDarkMode(state, action) {
  return updateObject(state, { darkMode: action.value })
}

function changeTheme(state, action) {
  return updateObject(state, { theme: action.value })
}

function toggleLaunchAtStartup(state, action) {
  return updateObject(state, { launchAtStartup: action.value })
}