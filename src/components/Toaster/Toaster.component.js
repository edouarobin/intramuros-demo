// @flow

import React, { Component } from 'react';
import { Animated, View, Text } from 'react-native';
import { Header } from 'react-navigation';

import globalStyle, {
  screenHeight,
  toasterHeight,
} from 'Intramuros/src/style/globalStyle';
import { TAB_NAVIGATOR_HEIGHT } from 'Intramuros/src/navigation/AppNavigator.component.js';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styles from './Toaster.style';

const ANIMATION_DURATION = 1000;
const TIME_TOASTER_IS_SHOWING = 3000;

type PropsType = {
  show: boolean,
  closeToaster: () => void,
  text: string,
};
type StateType = {
  animatedValue: Object,
  timeoutReference: number | null,
};

export default class Toast extends Component<PropsType, StateType> {
  static defaultProps = {
    show: false,
    height: Header.HEIGHT,
  };

  state: StateType = {
    animatedValue: new Animated.Value(0),
    timeoutReference: null,
  };

  componentDidMount() {
    if (this.props.show) this.showToast();
  }

  componentWillReceiveProps(nextProps: PropsType) {
    if (nextProps.show) this.showToast();
    if (!nextProps.show) this.hideToast();
  }

  showToast() {
    const animatedValue = new Animated.Value(0);
    this.setState({ animatedValue });
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: ANIMATION_DURATION,
    }).start();
    const timeoutReference = setTimeout(
      () => this.props.closeToaster(),
      TIME_TOASTER_IS_SHOWING + ANIMATION_DURATION // 3500: ms before taoster closes
    );
    this.setState({ timeoutReference });
  }

  hideToast() {
    clearTimeout(this.state.timeoutReference);
    Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration: ANIMATION_DURATION,
    }).start();
  }

  render() {
    const translateY = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        screenHeight,
        screenHeight - TAB_NAVIGATOR_HEIGHT - toasterHeight - getBottomSpace(),
      ],
    });

    return (
      <Animated.View
        style={[styles.animatedView, { transform: [{ translateY }] }]}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </Animated.View>
    );
  }
}
