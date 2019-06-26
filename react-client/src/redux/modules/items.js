import api from '../../api'

export const FETCH_ALL = 'e-commerce/items/FETCH_ALL'
export const FETCH_ALL_FULFILLED = 'e-commerce/items/FETCH_ALL_FULFILLED'
export const FETCH_BY_ID = 'e-commerce/items/FETCH_BY_ID'
export const FETCH_BY_ID_FULFILLED = 'e-commerce/items/FETCH_BY_ID_FULFILLED'
export const SET_SELECTED = 'e-commerce/items/SET_SELECTED'
export const CLEAR_SELECTED = 'e-commerce/items/CLEAR_SELECTED'
export const SET_FILTER = 'e-commerce/items/SET_FILTER'
export const CLEAR_FILTER = 'e-commerce/items/CLEAR_FILTER'
export const CREATE = 'e-commerce/items/CREATE'
export const CREATE_FULFILLED = 'e-commerce/items/CREATE_FULFILLED'
export const UPDATE = 'e-commerce/items/UPDATE'
export const UPDATE_FULFILLED = 'e-commerce/items/UPDATE_FULFILLED'
export const DELETE = 'e-commerce/items/DELETE'
export const DELETE_FULFILLED = 'e-commerce/items/DELETE_FULFILLED'

export const fetchAllItems = () => {
  return {
    type: FETCH_ALL,
    payload: api.get('/items')
  }
}

export const fetchItemById = itemId => {
  return {
    type: FETCH_BY_ID,
    payload: api.get(`/items/${itemId}`)
  }
}

export const setSelected = id => {
  return {
    type: SET_SELECTED,
    payload: id
  }
}

export const clearSelected = () => {
  return {
    type: CLEAR_SELECTED
  }
}

export const setFilter = filter => {
  return {
    type: SET_FILTER,
    payload: filter
  }
}

export const clearFilter = () => {
  return {
    type: CLEAR_FILTER
  }
}

export const createItem = (formData, token) => {
  return {
    type: CREATE,
    payload: api.post(
      '/items',
      formData,
      {
        headers: {
          Authorization: token
        }
      }
    )
  }
}

export const updateItem = (itemId, formData, token) => {
  return {
    type: UPDATE,
    payload: api.put(
      `/items/${itemId}`,
      formData,
      {
        headers: {
          Authorization: token
        }
      }
    )
  }
}

export const deleteItem = (itemId, token) => {
  return {
    type: DELETE,
    payload: api.delete(
      `/items/${itemId}`,
      {
        headers: {
          Authorization: token
        }
      }
    )
  }
}

const initialState = {
  all: [],
  selected: '',
  filter: {}
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_FULFILLED: {
      let { items } = action.payload.data
      if (state.filter.seller) {
        items = items.filter(item => item.seller._id === state.filter.seller)
      }
      return { ...state, all: items }
    }
    case FETCH_BY_ID_FULFILLED: {
      let { item } = action.payload.data
      return { ...state, all: [ ...state.all, item ] }
    }
    case SET_SELECTED:
      return { ...state, selected: action.payload }
    case CLEAR_SELECTED:
      return { ...state, selected: '' }
    case SET_FILTER:
      return { ...state, filter: action.payload }
    case CLEAR_FILTER:
      return { ...state, filter: {} }
    case CREATE_FULFILLED:
      return {
        ...state,
        all: [
          ...state.all,
          action.payload.data.item
        ]
      }
    case UPDATE_FULFILLED: {
      let items = [ ...state.all ]
      const { item } = action.payload.data
      const idx = items.findIndex(it => it._id === item._id)

      items.splice(idx, 1, item)

      return {
        ...state,
        all: items
      }
    }
    case DELETE_FULFILLED: {
      const { item } = action.payload.data
      return {
        ...state,
        all: state.all.filter(it => it._id !== item._id)
      }
    }
    default:
      return state
  }
}
