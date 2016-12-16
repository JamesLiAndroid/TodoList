import React, { Component, PropTypes } from 'react'
import { View, ScrollView, StyleSheet, TextInput, Text } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import { todoActionCreators } from '../redux/'

import Title from '../components/Title'
import Footer from '../components/Footer'
import List from '../components/List'
import Input from '../components/Input'

import Client from '../network/Client'

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

  state = {
    userId: ''
  }

  componentWillMount = () => {
    // TODO:需要从前一个页面传入userId
    this.setState({
      userId: '584a25bffdce28247af5af5b'
    })
  }

  componentDidMount = () => {
    console.log('开始请求数据！')
    // 请求列表数据
    //todoActionCreators.search_all_item(this.state.userId)
    this.dataFunc('584a25bffdce28247af5af5b', (responseJson) => {
      console.log('获取的列表数据：'+JSON.stringify(responseJson))
      // 写入数据
      const {dispatch} = this.props
      dispatch(todoActionCreators.addItems(responseJson))
    })

  }

  dataFunc = (userId, callback) => {
    let data = 'userId='+this.state.userId
    new Client().postData('/searchAll', data, callback)
 /*     fetch('http://172.16.7.218:3000/searchAll', {
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
*/
  }

  addItem = (item) => {
    if(item) {
//      const {dispatch} = this.props
//      dispatch(todoActionCreators.addItem(item))
      this.addItemToServer(item, this.state.userId, (responseJson) => {
        console.log('数据添加状态：'+responseJson.status+'::'+responseJson.result)
        // 数据刷新
        this.dataFunc(this.state.userId, (responseJson) => {
          console.log('数据刷新：'+responseJson[0].content)
        })
      })
    } else {
      console.log('插入数据为空！')
    }
  }

  addItemToServer = (item, userId, callback) => {
    fetch('http://172.16.7.218:3000/addItem', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'userId='+userId+'&content='+item
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
