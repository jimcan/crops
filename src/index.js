import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { pageReducer, drawerReducer, settingsReducer } from './redux/reducers'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'

const store = createStore(
  combineReducers({
    page: pageReducer,
    drawer: drawerReducer,
    settings: settingsReducer
  })
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)   
