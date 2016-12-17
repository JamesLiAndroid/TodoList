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

import Client from '../network/Client'
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

class Register extends Component {

  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    currentUsername: '',
    currentPassword: '',
    currentRePassword: ''
  }

  back() {

  }

  changeName = (text) => {
    console.log('写入用户名：'+text)
    this.setState({currentUsername: text})
  }

  changePassword = (text) => {
    console.log('写入密码：'+text)
    this.setState({currentPassword: text})
  }

  changeRePassword = (text) => {
    console.log('写入RE密码：'+text)
    this.setState({currentRePassword: text})
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

  onRePasswordChange = () => {

  }

  register = () => {
    const {currentUsername, currentPassword, currentRePassword} = this.state
    console.log(currentUsername+'::'+currentPassword+'::'+currentRePassword)

    if(currentUsername && currentPassword && currentRePassword) {
      if(currentPassword !== currentRePassword) {
        console.log('密码不匹配！')
        return
      }
      this.registerFunc(currentUsername, currentPassword, currentRePassword, (responseJson) => {
        //console.log('status:'+responseJson.status+'::::'+'result:'+responseJson.result)
        console.log('注册返回的数据为：'+responseJson.status)
        if(responseJson.status === 404) {
          console.log('用户已经存在')
          return
        }
        // 写入信息
        this.onNameChange()
        this.onPasswordChange()
      })
    } else {
      console.log('注册的用户名或密码未输入')
    }
  }

  registerFunc = (username, password, repassword, callback) => {
    let data = 'username='+username+'&password='+password+'&repassword='+repassword
    new Client().postData('register', data, (responseJson) => {
      callback(responseJson)
    })
/*      fetch('http://172.16.7.218:3000/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'username='+username+'&password='+password+'&repassword='+repassword
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

  render() {
    //const {username, password} = this.props
    return (
      <View style={styles.container}>
        <Title> 注册 </Title>
        <View style={styles.loginArea}>
          <View style={styles.childContainer}>
            <Text style={styles.itemname}>注册用户名</Text>
            <TextInput
              style={styles.itemInput}
              placeholder={'请输入注册的用户名'}
              numberOfLines={1}
              onChangeText={this.changeName}
              onSubmitEditing={this.onNameChange}
              autoFocus={true}
            />
          </View>
          <View style={styles.childContainer}>
            <Text style={styles.itemname}>注册密码</Text>
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

          <View style={styles.childContainer}>
            <Text style={styles.itemname}>再次输入密码</Text>
            <TextInput
              style={styles.itemInput}
              placeholder={'请再次输入密码'}
              secureTextEntry={true}
              numberOfLines={1}
              onChangeText={this.changeRePassword}
              onSubmitEditing={this.onRePasswordChange}
              KeyboardType={'numbers-and-punctuation'}
              password={true}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={this.register}>
            <Text style={styles.btnText}>注册</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={this.back}>
            <Text style={styles.btnText}>返回</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps)(Register)
