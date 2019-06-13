// @flow

import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  headerContainer,
  headerTitle,
  IOS_STATUS_BAR_HEIGHT,
  HEADER_HEIGHT_MODAL,
} from 'Intramuros/src/style/globalStyle';

type PropsType = {
  text: string,
  onCrossPress: () => void,
};

const screenWidth = Dimensions.get('window').width;

export default class HeaderFilterTitle extends PureComponent<PropsType> {
  render() {
    return (
      <View
        style={[
          headerContainer,
          {
            flexDirection: 'row',
            paddingTop: IOS_STATUS_BAR_HEIGHT,
            height: HEADER_HEIGHT_MODAL,
            justifyContent: 'space-between',
            backgroundColor: '#009688',
          },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginLeft: 15,
          }}
        >
          <FontAwesome name="filter" size={30} color="white" />
          <Text
            style={[
              headerTitle,
              {
                width: screenWidth * 0.6,
                textAlign: 'left',
                marginLeft: 15,
                fontSize: 18,
              },
            ]}
            numberOfLines={1}
          >
            {this.props.text}
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              height: 40,
              paddingHorizontal: 15,
              marginRight: 10,
              justifyContent: 'flex-end',
              alignSelf: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
            onPress={this.props.onCrossPress}
          >
            <Ionicons name="md-close" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
