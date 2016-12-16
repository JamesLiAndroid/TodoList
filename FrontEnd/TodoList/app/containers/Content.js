import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import Client from '../network/Client'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  image: {
    width: 400,
    height: 300
  },

  seperator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },

  content: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },

  heading: {
    backgroundColor: '#F8F8F8'
  },


  centerText: {
    alignItems: 'center',
    justifyContent: 'center'
  }

})

export default class Content extends Component {
  state =  {
    userId: '',
    itemId: '',
    itemContent: null
  }

  componentWillMount() {
    // TODO:待传入userId,itemId
    this.setState({
      userId: '584a25bffdce28247af5af5b',
      itemId: '5851f90f3d1fe01bced1c5e4'
    })
  }

  componentDidMount() {
    let data = 'userId='+this.state.userId+'&itemId='+this.state.itemId
    new Client().postData('/searchOne', data, (responseJson) => {
      console.log('当前条目内容为：'+JSON.stringify(responseJson))
      this.setState({
        itemContent: responseJson
      })
    })
  }

  render() {
    var itemContent = this.state.itemContent
   // console.log('......dsfd.'+itemContent)
    if(!itemContent) {
      return (
      <View style={styles.container}>
        <Text style={styles.centerText}>Loading...</Text>
      </View>
      )
    } else {

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'}} />
        <View >
          <Text style={styles.content}>{itemContent.content}</Text>
          <View style={styles.seperator}/>
          <Text style={styles.content}>{itemContent.time}</Text>
          <View style={styles.seperator}/>
        </View>
      </View>
    )
    }
  }
}
