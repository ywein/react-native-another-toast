import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  Picker,
  TextInput,
  Switch,
} from 'react-native'

import Toast from 'react-native-another-toast'

export default class Example extends Component {

  constructor(props) {
    super(props)
    this.showToast = this.showToast.bind(this)
    this.closeToast = this.closeToast.bind(this)
  }

  state = {
    text: 'Toast text',
    autoClose: true,
    autoCloseTimeout: 2000,
    slide: 'vertical',
    position: 'bottom',
    animationType: 'slide',
    topBottomDistance: 10,
    animationDuration: 350,
  }

  showToast() {
    this.toast.showToast()
  }

  closeToast() {
    this.toast.closeToast()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'flex-start', padding: 10, marginBottom: 20 }}>
          <View style={styles.inputBlock}>
            <Text>Text</Text>
            <TextInput
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
          </View>
          <View style={styles.inputBlock}>
            <Text>AutoClose</Text>
            <Switch
              style={{ alignSelf: 'flex-start' }}
              onValueChange={autoClose => this.setState({ autoClose })}
              value={this.state.autoClose}
            />
          </View>
          <View style={styles.inputBlock}>
            <Text>AutoCloseTimeout</Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={(autoCloseTimeout) => {
                let value = parseInt(autoCloseTimeout, 10)
                if (value < 0 || isNaN(value)) {
                  value = 0
                }
                this.setState({ autoCloseTimeout: value })
              }}
              value={String(this.state.autoCloseTimeout)}
            />
          </View>
          <View style={styles.inputBlock}>
            <Text>Slide</Text>
            <Picker style={{ width: 120 }} selectedValue={this.state.slide} onValueChange={slide => this.setState({ slide })}>
              <Picker.Item label='Vertical' value='vertical' />
              <Picker.Item label='Horizontal' value='horizontal' />
            </Picker>
          </View>
          <View style={styles.inputBlock}>
            <Text>Position</Text>
            <Picker style={{ width: 120 }} selectedValue={this.state.position} onValueChange={position => this.setState({ position })}>
              <Picker.Item label='Top' value='top' />
              <Picker.Item label='Bottom' value='bottom' />
            </Picker>
          </View>
          <View style={styles.inputBlock}>
            <Text>AnimationType</Text>
            <Picker style={{ width: 120 }} selectedValue={this.state.animationType} onValueChange={animationType => this.setState({ animationType })}>
              <Picker.Item label='Slide' value='slide' />
              <Picker.Item label='Fade' value='fade' />
            </Picker>
          </View>
          <View style={styles.inputBlock}>
            <Text>AnimationDuration</Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={(animationDuration) => {
                let value = parseInt(animationDuration, 10)
                if (value < 0 || isNaN(value)) {
                  value = 0
                }
                this.setState({ animationDuration: value })
              }}
              value={String(this.state.animationDuration)}
            />
          </View>
          <View style={styles.inputBlock}>
            <Text>TopBottomDistance</Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={(topBottomDistance) => {
                let value = parseInt(topBottomDistance, 10)
                if (value < 0 || isNaN(value)) {
                  value = 0
                }
                this.setState({ topBottomDistance: value })
              }}
              value={String(this.state.topBottomDistance)}
            />
          </View>
        </View>

        <TouchableHighlight onPress={this.showToast}>
          <View style={{ paddingVertical: 8, paddingHorizontal: 15, backgroundColor: '#3b3b3b' }}>
            <Text style={{ color: '#fff' }}>Press Me</Text>
          </View>
        </TouchableHighlight>
        <Toast
          text={this.state.text}
          textStyle={{ color: '#cccccc', fontSize: 21 }}
          toastStyle={{ backgroundColor: '#3b3b3b' }}
          underlayColor='#515151'
          onToastTap={this.closeToast}
          autoClose={this.state.autoClose}
          autoCloseTimeout={this.state.autoCloseTimeout}
          slide={this.state.slide}
          position={this.state.position}
          topBottomDistance={this.state.topBottomDistance}
          animationType={this.state.animationType}
          animationDuration={this.state.animationDuration}
          ref={(c) => { this.toast = c }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputBlock: {
    padding: 10,
    width: (Dimensions.get('window').width / 2) - 20,
    justifyContent: 'flex-start',
  },
})
