import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './reducers'

const inititalState = {}

const middleware = [
    applyMiddleware(thunk, logger),
    ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])
  ]

const store = createStore(
    rootReducer, 
    inititalState, 
    compose(...middleware)
)

export default store