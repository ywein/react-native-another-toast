import { Component, ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ToastProps {
  content?: ReactNode; // - (React.Component) null - Component inside the toast. Replaces the text.
  text?: string; // - (String) Toast - text that will be shown in the toast, if content is null.
  textStyle?: StyleProp<TextStyle>; // - (Object) - Styles for the text element.
  toastStyle?: StyleProp<ViewStyle>; // - (Object) - Styles for the toast element.
  rippleColor?: string; // - (String) #ffffff - Color of the ripple for TouchableNativeFeedback element. (Android)
  underlayColor?: string; // - (String) #515151 - Color of the underlay for TouchableHighlight element of the toast. Recommended to be slightly lighter or darker than main background. (iOS)
  onToastTap?(): void; // - (Function) null - Will be called on the tap on the toast element. By default (if null) will call internal function that will close the toast. If provided - internal function will not be called.
  autoClose?: boolean; // - (Boolean) true - Decides if we should close the toast automatically after timeout.
  autoCloseTimeout?: number; // - (Number) 2000 - Timeout for autoClose.
  onClose?(): void; // - (Function) - Will be called after the toast close animation.
  showToast?: boolean; // - (Boolean) false - If true - toast will be shown. Please note, that you should revert this to false if you want to show the toast again(You probably want to use onClose event for this).
  slide?: 'vertical' | 'horizontal'; // - (String: [vertical, horizontal]) vertical - Decides how animation will occur for slide animation type.
  position?: 'top' | 'bottom'; // - (String: [top, bottom]) bottom - Position of the toast on screen.
  topBottomDistance?: number; // - (Number) 10 - Gap between the edge of the screen and the toast(either from the bottom, or from the top, depend on the position).
  animationType?: 'slide' | 'fade'; // - (String: [slide, fade]) slide - Decides on the animation type.
  animationDuration?: number; // - (Number) 350 - Animation duration.
}

export default class Toast extends Component<ToastProps> {
  public showToast(): void;
  public closeToast(): void;
}