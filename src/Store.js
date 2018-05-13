import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'

import listings from './reducers/Listings'
import filtering from './reducers/Filtering'
import facet from './reducers/Facet'

let middlewares = [thunkMiddleware]

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require(`redux-logger`)
  middlewares.push(logger)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  combineReducers({
    listings,
    filtering,
    facet
  }),
  composeEnhancers(applyMiddleware(...middlewares))
)

window.store = store

export default store
