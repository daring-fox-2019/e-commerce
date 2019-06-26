import api from '../../api'

export const FETCH = 'e-commerce/cart/FETCH'
export const FETCH_FULFILLED = 'e-commerce/cart/FETCH_FULFILLED'
export const ADD = 'e-commerce/cart/ADD'
export const ADD_FULFILLED = 'e-commerce/cart/ADD_FULFILLED'

export const fetchCart = token => {
  return {
    type: FETCH,
    payload: api.get('/cart', { headers: { Authorization: token }})
  }
}

export const addItem = (itemId, token) => {
  console.log(token)
  return {
    type: ADD,
    payload: api.put(`/cart/${itemId}`, {}, { headers: { Authorization: token }})
  }
}

const initialState = []

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_FULFILLED:
      return action.payload.data.cart
    case ADD_FULFILLED:
      return action.payload.data.cart
    default:
      return state
  }
}
