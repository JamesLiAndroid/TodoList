import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

//import { connect } from 'react-redux'
//import { Actions } from 'react-native-router-flux'

//import { actionCreators } from '../redux/todoRedux'

import Input from '../components/Input'
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

export default class Login extends Component {
/*
  static propTypes = {
    username: PropTypes.string,
    password: PropTypes.string
  }
*/
/*
  state = {
    username: '',
    password: ''
  }
*/
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

 //   this.onNameChange = this.onNameChange.bind(this)
 //   this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  login() {
    let username = this.state.username
    let password = this.state.password

    console.log(username+'::'+password)
    if(username && password) {

    } else {
      console.log('用户名和密码未输入')
    }
  }

  toRegister() {

  }

  onNameChange = (content) => {
    console.log(content)
    this.setState({username: content})
  }

  onPasswordChange = (content) => {
    this.setState({password: content})
  }

  render() {
    return (
      <View style={styles.container}>
        <Title> 登录 </Title>
        <View style={styles.loginArea}>
          <View style={styles.childContainer}>
            <Text style={styles.itemname}>用户名</Text>
            <Input
              style={styles.itemInput}
              placeholder={'请输入用户名'}
              numberOfLines={1}
              onChangeText={this.onNameChange.bind(this)}
              autoFocus={true}
            />
          </View>
          <View style={styles.childContainer}>
            <Text style={styles.itemname}>密码</Text>
            <Input
              style={styles.itemInput}
              placeholder={'请输入密码'}
              secureTextEntry={true}
              numberOfLines={1}
              onChangeText={this.onPasswordChange.bind(this)}
              KeyboardType={'numbers-and-punctuation'}
              autoFocus={true}
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
