import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native'

import Example from './example'

export default class toast extends Component {
  showToast() {
    this.toast.showToast()
  }

  testClick() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Example />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

AppRegistry.registerComponent('toast', () => toast)
