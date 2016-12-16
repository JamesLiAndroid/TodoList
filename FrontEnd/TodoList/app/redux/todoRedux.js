import Client from '../network/Client'

const types = {
  // SEARCH_ALL_ITEM: 'SEARCH_ALL_ITEM',
  ADD_ITEM: 'ADD_ITEM',
  ADD_ITEMS: 'ADD_ITEMS',
  REMOVE_ITEM: 'REMOVE_ITEM',
  TOGGLE_ITEM_COMPLETED: 'TOGGLE_ITEM_COMPLETED',
  REMOVE_COMPLETED: 'REMOVE_COMPLETED',
 // ERROR: 'ERROR'
}

export const actionCreators = {
/*  search_all_item: (userId) => (dispatch) => {
    console.log('开始请求全部数据。。。')
    let data = 'userId=' + userId
    new Client().postData('/searchAll', data, (responseJson) => {
      console.log('查询所有的item：'+JSON.stringify(responseJson))
      if(Array.isArray(responseJson)) {
        dispatch(actionCreators.addItems(responseJson))
      } else {
        dispatch(actionCreators.error(responseJson))
      }

    })
  },
*/
  addItem: (item) => {
    console.log('写入备忘录！')
    return {type: types.ADD_ITEM, payload: item}
  },

  addItems: (items) => {
    console.log('批量写入！')
    return {type: types.ADD_ITEMS, payload: items}
  },

  removeItem: (index) => {
    return {type: types.REMOVE_ITEM, payload: index}
  },

  toggleItemCompleted: (index) => {
    return {type: types.TOGGLE_ITEM_COMPLETED, payload: index}
  },

  removeCompleted: (item) => {
    return {type: types.REMOVE_COMPLETED, payload: item}
  },

  error: (error) => {
    return { type: types.ERROR, payload: error}
  }

}

const initialState = {
  items: [],
  // error: ''
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
    case types.ADD_ITEMS: {
      console.log('批量添加数据！。。。。')
      return {
        ...state,
        items: [...payload, ...items]
      }
    }
    case types.REMOVE_ITEM: {
      return {
        ...state,
        items: items.filter((item, i) => i !== payload)
      }
    }

    case types.TOGGLE_ITEM_COMPLETED: {
      return {
        ...state,
        items: items.map((item, i) => {
          if(i === payload) {
            return { label: item.label, completed: !item.completed}
          }

          return item
        })
      }
    }

    case types.REMOVE_COMPLETED: {
      return {
        ...state,
        items: items.filter((item) => !item.completed)
      }
    }

/*    case types.ERROR: {
      return {
        ...state,
        error: payload
      }
    }
*/
    default: {
      return state
    }
  }
}
