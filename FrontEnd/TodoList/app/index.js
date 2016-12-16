import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'

import App from './containers/App'
import Login from './containers/Login'
import Register from './containers/Register'
import Content from './containers/Content'

const store = configureStore()

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <Content />
      </Provider>
    )
  }
}
