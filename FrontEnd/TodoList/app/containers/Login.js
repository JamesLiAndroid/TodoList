import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

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

  toRegister() {

  }

  onNameChange = (content) => {
    console.log('用户名：'+content)  
    const {dispatch} = this.props
    dispatch(loginActionCreators.addUserName(content))
    console.log('写入用户名完成！')  
    //this.setState({username: content})
  }

  onPasswordChange = (content) => {
    console.log('密码：'+content)  
    const {dispatch} = this.props
    dispatch(loginActionCreators.addPassword(content))
    console.log('写入密码完成！')  
    //this.setState({password: content})
  }

  login = () => {
    const {username, password} = this.props
    console.log(username+'::'+password)

    if(username && password) {
      console.log(username+'::'+password) 
    } else {
      console.log('用户名和密码未输入')
    }
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
              onSubmitEditing={this.onNameChange.bind(this)}
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
              onSubmitEditing={this.onPasswordChange.bind(this)}
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