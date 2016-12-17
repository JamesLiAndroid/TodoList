import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Actions, Scene, Router} from 'react-native-router-flux'

import configureStore from './store/configureStore'

import App from './containers/App'
import Login from './containers/Login'
import Register from './containers/Register'
import Content from './containers/Content'

const store = configureStore()

const scenes = Actions.create(
  <Scene key='root'>
    <Scene key='login' component={Login} title='Login' />
    <Scene key='register' component={Register} title='Register' />
    <Scene key='main' component={App} title='TodoList' />
    <Scene key='item' component={Content} title='ItemContent' />
  </Scene>
)

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router scenes={scenes} />
      </Provider>
    )
  }
}
