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
//    userId: PropTypes.string
    items: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    userId: ''
  }

  componentWillMount = () => {
    // TODO:需要从前一个页面传入userId
    console.log('前一个页面传入的userId：'+this.props.userId)
    this.setState({
      userId: this.props.userId
    })
  }

  componentDidMount = () => {
    console.log('开始请求数据！')
    // 请求列表数据
    //todoActionCreators.search_all_item(this.state.userId)
    this.dataFunc(this.state.userId, (responseJson) => {
      console.log('获取的列表数据：'+JSON.stringify(responseJson))
      // 写入数据
      const {dispatch} = this.props
      dispatch(todoActionCreators.addItems(responseJson.reverse()))
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

        if(responseJson.status === 200) {
          // 数据添加成功
          const {dispatch} = this.props
          dispatch(todoActionCreators.addItem(responseJson.data))
        } else {
          console.log('数据添加不成功！')
        }
       /*       // 数据刷新
        this.dataFunc(this.state.userId, (responseJson) => {
          console.log('数据刷新：'+JSON.stringify(responseJson))
        })
        */
      })
    } else {
      console.log('插入数据为空！')
    }
  }

  addItemToServer = (item, userId, callback) => {
    let data = 'userId='+userId+'&content='+item

    new Client().postData('/addItem', data, (responseJson) => {
      callback(responseJson)
    })
   /* fetch('http://172.16.7.218:3000/addItem', {
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
      */
  }

  removeItem = (index) => {
    //    const {dispatch} = this.props
    const {items, dispatch} = this.props
    let itemId = items[index]._id
    let data = 'userId='+this.state.userId+'&itemId='+itemId+'&isDel=true'
    new Client().postData('/delItemFalse', data, (responseJson) => {
      if(responseJson.status === 200) {
        console.log('更改删除的状态：：'+JSON.stringify(responseJson))
        dispatch(todoActionCreators.removeItem(index))
    //    dispatch(todoActionCreators.removeCompleted())
//        dispatch(todoActionCreators.toggleItemCompleted(index))
        console.log('完成删除状态的更改！')
      } else {
        console.log('更改状态失败！')
      }
    })

   }

  removeCompleted = () => {
    const {dispatch} = this.props
    dispatch(todoActionCreators.removeCompleted())
  }

  toggleItemCompleted = (index) => {
    const {items, dispatch} = this.props
    let itemId = items[index]._id
    let isComplete = items[index].isComplete
    let data = 'userId='+this.state.userId+'&itemId='+itemId+'&isCompleted='+!isComplete
    new Client().postData('/changeStatus', data, (responseJson) => {
      if(responseJson.status === 200) {
        console.log('更改状态：：'+JSON.stringify(responseJson))
        dispatch(todoActionCreators.toggleItemCompleted(index))
        console.log('完成状态更改！')
      } else {
        console.log('更改状态失败！')
      }
    })
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
