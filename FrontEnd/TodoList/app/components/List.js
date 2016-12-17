import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Checkbox from './Checkbox'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remove: {
    marginLeft: 10,
    marginBottom: 2,
    color: '#CD5C5C',
    fontSize: 26,
  },
  completed: {
    backgroundColor: 'whitesmoke',
  },
})

export default class List extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onToggleItemCompleted: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired
  }

  renderItem = (item, i) => {
    const {onToggleItemCompleted, onRemoveItem, onItemPress} = this.props
    const itemStyle = item.isComplete ? [styles.item, styles.completed] : styles.item

    return (
      <View key={i} style={itemStyle}>
        <Text onPress={() => onItemPress(i)}> {item.content} </Text>
        <View style={styles.rightSection}>
          <Checkbox
            isChecked={item.isComplete}
            onToggle={() => onToggleItemCompleted(i)}
          />
          <TouchableOpacity onPress={() => onRemoveItem(i)}>
            <Text style={styles.remove}> &times; </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const {items} = this.props

    return (
      <ScrollView style={styles.container}>
        {items.map(this.renderItem)}
      </ScrollView>
    )
  }
}
