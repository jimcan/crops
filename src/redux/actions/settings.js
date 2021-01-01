import {
  TOGGLE_DARK_MODE,
  CHANGE_THEME,
  TOGGLE_LAUNCH_AT_STARTUP
} from './constants'

export function toggleDarkMode(value) {
  return {
    type: TOGGLE_DARK_MODE,
    value,
  }
}

export function changeTheme(value) {
  return {
    type: CHANGE_THEME,
    value,
  }
}

export function toggleLaunchAtStartup(value) {
  return {
    type: TOGGLE_LAUNCH_AT_STARTUP,
    value,
  }
}