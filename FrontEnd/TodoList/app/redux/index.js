// 组合reducer，而不是去创建多个store
import { combineReducers } from 'redux'

import * as loginRedux from './loginRedux'
import * as todoRedux from './todoRedux'

export const reducer = combineReducers({
  login: loginRedux.reducer,
  todo: todoRedux.reducer
})

export const loginActionCreators= loginRedux.actionCreators
export const todoActionCreators = todoRedux.actionCreators