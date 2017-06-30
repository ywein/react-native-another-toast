# react-native-another-toast
<img width="220px" align="right" src="https://raw.githubusercontent.com/ywein/react-native-another-toast/master/examples/toast.gif" />
React Native Toast done in JS for better compatibility and customizability.

[![npm version](https://badge.fury.io/js/react-native-another-toast.svg)](https://badge.fury.io/js/react-native-another-toast)

### Installation
`npm install --save react-native-another-toast`

### Usage
```javascript
import Toast from 'react-native-another-toast'

class Example extends Component {
  
  render () {
    return (
      <Toast
          text='Toast text'
          showToast={true]
      />
    )
  }
}
```


### Examples
```js
//Simple toast that fades at the top via the state change
class Example extends Component {

  constructor(props) {
    super(props)
    this.onClose = this.onClose.bind(this)
    this.showToast = this.showToast.bind(this)
  }

  state = {
    showToast: false,
  }

  onClose() {
    this.setState({
      showToast: false,
    })
  }

  showToast() {
    this.setState({
      showToast: true,
    })
  }

  render() {
    return (
      <View style={{ flex: 1, width: Dimensions.get('window').width, justifyContent: 'center' }}>
        <TouchableHighlight onPress={this.showToast}>
          <View style={{ paddingVertical: 8, paddingHorizontal: 15, backgroundColor: '#3b3b3b' }}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Press Me</Text>
          </View>
        </TouchableHighlight>
        <Toast
          text='Toast text'
          position='top'
          animationType='fade'
          onClose={this.onClose}
          showToast={this.state.showToast}
        />
      </View>
    )
  }
}
```


<img width="220px" align="right" src="https://raw.githubusercontent.com/ywein/react-native-another-toast/master/examples/toast_complex.gif" />


```js
//Toast with image that slides from the side via refs
class Example extends Component {

  constructor(props) {
    super(props)
    this.showToast = this.showToast.bind(this)
  }

  showToast() {
    this.toast.showToast()
  }

  render() {
    return (
      <View style={{ flex: 1, width: Dimensions.get('window').width, justifyContent: 'center' }}>
        <TouchableHighlight onPress={this.showToast}>
          <View style={{ paddingVertical: 8, paddingHorizontal: 15, backgroundColor: '#3b3b3b' }}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Press Me</Text>
          </View>
        </TouchableHighlight>
        <Toast
          content={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
              />
              <Text style={{ color: '#fff', paddingHorizontal: 10 }}>Complex toast</Text>
            </View>
          }
          slide='horizontal'
          ref={(c) => { this.toast = c }}
        />
      </View>
    )
  }
}
```

### Props

- `content` - (React.Component) `null` - Component inside the toast. Replaces the `text`.
- `text` - (String) `Toast` - text that will be shown in the toast, if `content` is null.
- `textStyle` - (Object) - Styles for the text element. 
- `toastStyle` - (Object) - Styles for the toast element.
- `underlayColor` - (String) `#515151` - Color of the underlay for TouchableHighlight element of the toast. Recommended to be slightly lighter or darker than main background.
- `onToastTap` - (Function) `null` - Will be called on the tap on the toast element. By default (if null) will call internal function that will close the toast. If provided - internal function will not be called.
- `autoClose` - (Boolean) `true` - Decides if we should close the toast automatically after timeout.
- `autoCloseTimeout` - (Number) `2000` - Timeout for autoClose.
- `onClose` - (Function) - Will be called after the toast close animation.
- `showToast` - (Boolean) `false` - If true - toast will be shown. Please note, that you should revert this to false if you want to show the toast again(You probably want to use onClose event for this).
- `slide` - (String: [vertical, horizontal]) `vertical` - Decides how animation will occur for `slide` animation type.
- `position` - (String: [top, bottom]) `bottom` - Position of the toast on screen.
- `topBottomDistance` - (Number) `10` - Gap between the edge of the screen and the toast(either from the bottom, or from the top, depend on the `position`).
- `animationType` - (String: [slide, fade]) `slide` - Decides on the animation type.
- `animationDuration` - (Number) `350` - Animation duration.

### Methods

- `showToast` - Will show the toast. 
```js
this.toast.showToast()
```
- `closeToast` - Will close the toast. 
```js
this.toast.closeToast()
```

### Demo
* `git clone https://github.com/ywein/react-native-another-toast.git`
* `cd react-native-another-toast/examples/toast && npm install`
* **iOS**
	* Open `./examples/toast/ios/toast.xcodeproject` in xcode
	* `command+r` (in xcode)
* **Android**
	* Run android simulator / plug in your android device
	* Run `react-native run-android` in terminal
	
### TODO

The following is left to be done:

- [ ] Different Touchable components per platform.
- [ ] Customizable animation function. 
