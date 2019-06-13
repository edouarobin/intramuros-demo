// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

import globalStyle, { screenWidth } from 'Intramuros/src/style/globalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

type PropsType = {
  searchChanged: string => void,
  placeHolder?: string,
  searchText: string,
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 44,
    marginTop: 10,
    paddingHorizontal: 16,
    backgroundColor: globalStyle.colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#CED0D4',
  },
  iconContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: 250,
    height: 44,
    marginLeft: 10,
    marginRight: 15,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Lato-Italic',
    lineHeight: 20,
    height: 44,
    borderWidth: 0,
    flexWrap: 'wrap',
    paddingLeft: 0,
  },
});

export default class FilterInput extends PureComponent<PropsType> {
  render() {
    return (
      <View style={styles.inputContainer}>
        {this.props.searchText ? (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => this.props.searchChanged(null)}
          >
            <IconFontAwesome name="times-circle" size={25} color="#B4B4B4" />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconContainer}>
            <Icon name="md-search" size={30} color="#B4B4B4" />
          </View>
        )}

        <View style={styles.textContainer}>
          <TextInput
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={text => {
              this.props.searchChanged(text);
            }}
            value={this.props.searchText}
            placeholder={
              this.props.placeHolder
                ? this.props.placeHolder
                : 'Trouvez votre commune'
            }
          />
        </View>
      </View>
    );
  }
}
