import React from 'react'

import { Text, View, Animated, TouchableHighlight, TouchableNativeFeedback, StyleSheet, Dimensions, Platform } from 'react-native'

const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toast: {
    width: Dimensions.get('window').width * 0.9,
    height: 50,
    backgroundColor: '#3B3B3B',
  },
  toastText: {
    color: '#ffffff',
    textAlign: 'center',
    alignSelf: 'center',
  },
})

class Toast extends React.PureComponent {

  constructor(props) {
    super(props)
    this.animatedPositionY = new Animated.Value(-70)
    this.animatedPositionX = new Animated.Value(Dimensions.get('window').width)
    this.animatedOpacity = new Animated.Value(0)

    this.closeToast = this.closeToast.bind(this)
    this.showToast = this.showToast.bind(this)
    this.autoCloseToast = this.autoCloseToast.bind(this)
  }

  componentDidMount() {
    if (this.props.showToast === true) {
      this.showToast()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showToast === false && nextProps.showToast === true) {
      this.showToast()
    }
  }

  closeToast() {
    const { animationType, animationDuration, slide, onClose } = this.props
    if (animationType === 'slide') {
      if (slide === 'vertical') {
        Animated.timing(
          this.animatedPositionY,
          {
            toValue: -70,
            duration: animationDuration * 0.7,
          }).start(onClose)
      } else if (slide === 'horizontal') {
        Animated.timing(
          this.animatedPositionX,
          {
            toValue: Dimensions.get('window').width,
            duration: animationDuration * 0.7,
          }).start(onClose)
      }
    } else if (animationType === 'fade') {
      Animated.timing(
        this.animatedOpacity,
        {
          toValue: 0,
          duration: animationDuration * 0.7,
        }).start(onClose)
    }
  }

  autoCloseToast() {
    const { autoClose, autoCloseTimeout } = this.props

    if (autoClose) {
      this.timeoutHandle = setTimeout(() => {
        this.closeToast()
      }, autoCloseTimeout)
    }
  }

  showToast() {
    const { animationType, animationDuration, slide, topBottomDistance } = this.props

    if (typeof this.timeoutHandle !== 'undefined') {
      clearTimeout(this.timeoutHandle)
    }

    if (animationType === 'slide') {
      if (slide === 'vertical') {
        Animated.timing(
          this.animatedPositionY,
          {
            toValue: topBottomDistance,
            duration: animationDuration,
          }).start(this.autoCloseToast)
      } else if (slide === 'horizontal') {
        Animated.timing(
          this.animatedPositionX,
          {
            toValue: 0,
            duration: animationDuration,
          }).start(this.autoCloseToast)
      }
    } else if (animationType === 'fade') {
      Animated.timing(
        this.animatedOpacity,
        {
          toValue: 1,
          duration: animationDuration,
        }).start(this.autoCloseToast)
    }
  }

  render() {
    const { content, text, textStyle, toastStyle, onToastTap, position, slide, animationType, underlayColor, activeOpacity, rippleColor, topBottomDistance } = this.props

    const additionStyles = {}

    if (position === 'top') {
      additionStyles.top = topBottomDistance
    } else if (position === 'bottom') {
      additionStyles.bottom = topBottomDistance
    }

    if (animationType === 'slide') {
      if (slide === 'horizontal') {
        additionStyles.left = this.animatedPositionX
      } else if (slide === 'vertical') {
        if (position === 'top') {
          additionStyles.top = this.animatedPositionY
        } else if (position === 'bottom') {
          additionStyles.bottom = this.animatedPositionY
        }
      }
    } else if (animationType === 'fade') {
      additionStyles.opacity = this.animatedOpacity
    }

    let inner
    if (content) {
      inner = content
    } else {
      inner =
        (<View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={[styles.toastText, textStyle]}>{text}</Text>
        </View>)
    }

    let Component
    if (Platform.OS === 'android') {
      Component = TouchableNativeFeedback
    } else {
      Component = TouchableHighlight
    }

    return (
      <Animated.View style={[styles.toastWrapper, additionStyles]}>
        <View style={[styles.toast, toastStyle]}>
          <Component
            background={(Platform.OS === 'android' ? TouchableNativeFeedback.Ripple(rippleColor) : null)}
            activeOpacity={activeOpacity}
            underlayColor={underlayColor}
            style={[{ flex: 1 }]}
            onPress={(onToastTap || this.closeToast)}
          >
            {inner}
          </Component>
        </View>
      </Animated.View>

    )
  }
}

Toast.propTypes = {
  content: React.PropTypes.object,
  text: React.PropTypes.string,
  textStyle: React.PropTypes.object,
  toastStyle: React.PropTypes.object,
  rippleColor: React.PropTypes.string,
  activeOpacity: React.PropTypes.number,
  underlayColor: React.PropTypes.string,
  onToastTap: React.PropTypes.func,
  autoClose: React.PropTypes.bool,
  autoCloseTimeout: React.PropTypes.number,
  onClose: React.PropTypes.func,
  showToast: React.PropTypes.bool,
  slide: React.PropTypes.oneOf(['vertical', 'horizontal']),
  position: React.PropTypes.oneOf(['top', 'bottom']),
  topBottomDistance: React.PropTypes.number,
  animationType: React.PropTypes.oneOf(['slide', 'fade']),
  animationDuration: React.PropTypes.number,
}

Toast.defaultProps = {
  content: null,
  text: 'Toast',
  textStyle: {},
  toastStyle: {},
  rippleColor: '#ffffff',
  underlayColor: '#515151',
  activeOpacity: 0.8,
  onToastTap: null,
  autoClose: true,
  autoCloseTimeout: 2000,
  showToast: false,
  slide: 'vertical', // [vertical, horizontal]
  position: 'bottom', // [top, bottom]
  topBottomDistance: 10,
  animationType: 'slide', // [slide, fade]
  animationDuration: 350,
  onClose: () => { },
}

export default Toast
