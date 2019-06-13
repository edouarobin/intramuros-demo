import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyle, {
  SECTION_EVENT_HEIGHT,
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import { split } from 'lodash';

type PropsType = {
  sectionName: string,
};

export default class SectionHeader extends PureComponent<PropsType> {
  render() {
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            height: SECTION_EVENT_HEIGHT,
          }}
        >
          <View
            style={{
              borderRadius: 10,
              marginLeft: 8 + BIG_SCREEN_PADDING_OFFSET,
              padding: 10,
              marginTop: 4,
              borderWidth: 0.5,
              borderColor: '#D7D7D7',
              backgroundColor: '#EEEEF9',
            }}
          >
            <Text style={styles.textSectionHeader}>
              {split(this.props.sectionName, '- ', 1)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textSectionHeader: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Lato-Bold',
  },
});
