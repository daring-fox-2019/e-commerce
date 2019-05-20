import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/'
})

const auth = (token) => ({
  headers: {
    Authorization: token
  }
})

const register = (payload) => {
  return api.post('/auth/register', payload)
}

const login = (payload) => {
  return api.post('/auth/login', payload)
}

const fetchItems = () => {
  return api.get('/items')
}

const fetchItem = (itemId) => {
  return api.get(`/items/${itemId}`)
}

const createItem = (payload, token) => {
  return api.post('/items', payload, auth(token))
}

const addItem = (itemId, token) => {
  return api.put(`/cart/${itemId}`, {}, auth(token))
}

const removeItem = (itemId, token) => {
  return api.delete(`/cart/${itemId}`, auth(token))
}

const clearCart = (token) => {
  return api.delete('/cart', auth(token))
}

const fetchCart = (token) => {
  return api.get('/cart', auth(token))
}

export default {
  axios: api,
  register,
  login,
  fetchItems,
  fetchItem,
  createItem,
  addItem,
  clearCart,
  fetchCart,
  removeItem
}
