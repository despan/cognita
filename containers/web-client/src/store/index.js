import {
  combineReducers,
  createStore,
  applyMiddleware
} from 'redux'

import thunk from 'redux-thunk'

import * as reducers from './reducers'

const reducer = combineReducers(reducers)
const middleware = applyMiddleware(thunk)

export default createStore(reducer, middleware)
