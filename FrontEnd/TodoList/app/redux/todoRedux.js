const types = {
  ADD_ITEM: 'ADD_ITEM'
}

export const actionCreators = {
  addItem: (item) => {
    return {type: types.ADD_ITEM, payload: item}
  }
}

const initialState = {
  items: [],
}

export const reducer = (state = initialState, action) => {
  const {type, payload} = action
  const {items} = state

  switch(type) {
    case types.ADD_ITEM: {
      return {
        ...state,
        items: [{ label: payload, completed: false}, ...items]
      }
    }
    default: {
      return state
    }
  }
}
