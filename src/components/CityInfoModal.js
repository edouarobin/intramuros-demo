// @flow

import React, { PureComponent } from 'react';
import { Modal, Text, StyleSheet, View, ScrollView } from 'react-native';

import { HeaderBasicTitle, CityInfoBlock } from 'Intramuros/src/components';
import {
  requestAuthorisationPosition,
  getCurrentPosition,
} from 'Intramuros/src/services/GeoLocation';
import HTMLText from 'Intramuros/src/utils/HTMLText';

type PropsType = {
  modalVisible: boolean,
  closeModal: () => void,
  cityDetails: CityType,
};

const styles = StyleSheet.create({
  descriptionContainer: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 16,
    paddingBottom: 30,
    paddingRight: 30,
    paddingLeft: 30,
  },
  decriptionStyle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: 'black',
    textAlign: 'left',
    lineHeight: 24,
  },
});

export default class CityInfoModal extends PureComponent<PropsType, StateType> {
  render() {
    const { cityDetails, closeModal, modalVisible } = this.props;
    const spaceAgglo = cityDetails.description ? '\n\n' : '\n';
    const descriptionAgglo = cityDetails.agglo_description
      ? cityDetails.agglo_description + spaceAgglo
      : '';
    const descriptionCity = cityDetails.description
      ? cityDetails.description + '\n'
      : '';

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <HeaderBasicTitle
          text={cityDetails.name}
          onCrossPress={closeModal}
          info={false}
        />
        <ScrollView>
          <CityInfoBlock
            cityDetails={this.props.cityDetails}
            disableMoreInfoLink
          />
          <View style={styles.descriptionContainer}>
            {descriptionAgglo ? (
              <Text
                style={[
                  styles.decriptionStyle,
                  { fontFamily: 'Lato-BoldItalic', fontSize: 14 },
                ]}
              >
                Mon interco
              </Text>
            ) : null}
            <HTMLText style={styles.decriptionStyle} value={descriptionAgglo} />

            {descriptionCity && descriptionAgglo ? (
              <Text
                style={[
                  styles.decriptionStyle,
                  { fontFamily: 'Lato-BoldItalic' },
                ]}
              >
                Ma commune
              </Text>
            ) : null}
            <HTMLText style={styles.decriptionStyle} value={descriptionCity} />
          </View>
        </ScrollView>
      </Modal>
    );
  }
}
