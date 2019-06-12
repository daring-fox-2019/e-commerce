import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promise from 'redux-promise-middleware'

import itemsReducer from './modules/items'
import authReducer from './modules/auth'
import cartReducer from './modules/cart'

const rootReducer = combineReducers({
  items: itemsReducer,
  auth: authReducer,
  cart: cartReducer
})

export default () => createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(promise)
  )
)
