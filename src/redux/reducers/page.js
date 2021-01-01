import { createReducer } from './utilities'
import { CHANGE_PAGE } from '../actions'

export default createReducer('home', {
  [CHANGE_PAGE]: changePage
})

function changePage(state, action) {
  return action.page
}
