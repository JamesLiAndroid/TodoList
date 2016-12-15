import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import 'whatwg-fetch'

import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import { loginActionCreators } from '../redux/'
import Title from '../components/Title'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },

  loginArea: {
    padding: 10
  },

  childContainer: {
    flexDirection: 'column'
  },

  itemName: {
    fontSize: 15,
    color: '#CD5C5C',
    flex: 1
  },

  itemInput: {
    flex: 5,
    height: 50
  },

  btn: {
    backgroundColor: 'skyblue',
    height: 50,
    margin: 10
  },

  btnText: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10
  }
})

const mapStateToProps = (state) => ({
  username: state.login.username,
  password: state.login.password
})

class Login extends Component {

  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    currentUsername: '',
    currentPassword: ''
  }

  toRegister() {

  }

  changeName = (text) => {
    console.log('写入用户名：'+text)
    this.setState({currentUsername: text})
  }

  changePassword = (text) => {
    console.log('写入密码：'+text)
    this.setState({currentPassword: text})
  }

  onNameChange = () => {
    const {dispatch} = this.props
    const {currentUsername} = this.state
    console.log('用户名：'+ currentUsername)
    if(!currentUsername) return
    dispatch(loginActionCreators.addUserName(currentUsername))
    console.log('写入用户名完成！')
    //this.setState({username: content})
  }

  onPasswordChange = () => {
    const {dispatch} = this.props
    const {currentPassword} = this.state
    console.log('密码：'+ currentPassword)
    dispatch(loginActionCreators.addPassword(currentPassword))
    console.log('写入密码完成！')
    //this.setState({password: content})
  }

  login = () => {
    const {username, password} = this.props
    console.log(username+'::'+password)

    if(username && password) {
      console.log(username+'::'+password)
      this.loginFunc(username, password, (responseJson) => {
        console.log('status:'+responseJson.status+'::::'+'result:'+responseJson.result)
        console.log('登陆返回的数据为：'+responseJson.userId)
        if(responseJson.userId) {
          const {dispatch} = this.props
          dispatch(loginActionCreators.addUserId(responseJson.userId))
          console.log('写入UserId成功!')
        }
      })
    } else {
      console.log('用户名或密码未输入')
    }
  }

  loginFunc = (username, password, callback) => {
      fetch('http://172.16.7.218:3000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'username='+username+'&password='+password
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

  render() {
    //const {username, password} = this.props
    return (
      <View style={styles.container}>
        <Title> 登录 </Title>
        <View style={styles.loginArea}>
          <View style={styles.childContainer}>
            <Text style={styles.itemname}>用户名</Text>
            <TextInput
              style={styles.itemInput}
              placeholder={'请输入用户名'}
              numberOfLines={1}
              onChangeText={this.changeName}
              onSubmitEditing={this.onNameChange}
              autoFocus={true}
            />
          </View>
          <View style={styles.childContainer}>
            <Text style={styles.itemname}>密码</Text>
            <TextInput
              style={styles.itemInput}
              placeholder={'请输入密码'}
              secureTextEntry={true}
              numberOfLines={1}
              onChangeText={this.changePassword}
              onSubmitEditing={this.onPasswordChange}
              KeyboardType={'numbers-and-punctuation'}
              password={true}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={this.login}>
            <Text style={styles.btnText}>登录</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={this.toRegister}>
            <Text style={styles.btnText}>注册</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps)(Login)
