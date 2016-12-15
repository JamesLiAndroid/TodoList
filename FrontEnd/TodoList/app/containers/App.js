import React, { Component, PropTypes } from 'react'
import { View, ScrollView, StyleSheet, TextInput, Text } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import { todoActionCreators } from '../redux/'

import Title from '../components/Title'
import Footer from '../components/Footer'
import List from '../components/List'
import Input from '../components/Input'
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = (state) => ({
  items: state.todo.items,
})

class App extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  loginFunc = (userId, callback) => {
      fetch('http://172.16.7.218:3000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'userId='+userId
      })
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        callback(responseJson)
      })
      .catch((error) => {
        console.error(error)
      })

  }


  componentDidMount = () => {
    // 请求列表数据
    
  }

  addItem = (item) => {
    const {dispatch} = this.props
    dispatch(todoActionCreators.addItem(item))
  }

  removeItem = (index) => {
    const {dispatch} = this.props
    dispatch(todoActionCreators.removeItem(index))
  }
  removeCompleted = () => {
    const {dispatch} = this.props
    dispatch(todoActionCreators.removeCompleted())
  }

  toggleItemCompleted = (index) => {
    const {dispatch} = this.props
    dispatch(todoActionCreators.toggleItemCompleted(index))
  }

  render() {
    const {items} = this.props
    return (
      <View style={styles.container}>
        <Title>TodoList</Title>
        <Input placeholder={'Enter an item'} onSubmit={this.addItem} />
        <View style={styles.divider} />
        <List
          items={items}
          onRemoveItem={this.removeItem}
          onToggleItemCompleted={this.toggleItemCompleted}
        />
        <View style={styles.divider} />
        <Footer onRemoveCompleted={this.removeCompleted}/>
      </View>
    )
  }
}

export default connect(mapStateToProps)(App)
