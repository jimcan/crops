import { createReducer } from './utilities'
import { IS_DRAWER_OPEN } from '../actions'

export default createReducer(true, {
  [IS_DRAWER_OPEN]: toggleOpenDrawer
})

function toggleOpenDrawer(state, action) {
  return action.drawerState
}
