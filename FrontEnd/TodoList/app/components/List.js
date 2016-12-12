import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

import Checkbox from './Checkbox'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default class List extends Component {

  render() {
    return (
      <ScrollView style={styles.container} />
    )
  }
}
