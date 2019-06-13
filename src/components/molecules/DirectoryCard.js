// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';
import LeftChevronIcon from 'Intramuros/src/assets/LeftChevronIcon.png';

type PropsType = {
  directory: DirectoryType,
  navigateToDetails: () => void,
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: 'white',
    ...globalStyle.shadow,
    elevation: 5,
    marginBottom: 8,
    padding: 16,
    paddingBottom: 9,
    zIndex: 999,
  },
  titleText: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'black',
  },
  separator: {
    marginTop: 9,
    marginBottom: 6,
    height: 2,
    width: '100%',
    backgroundColor: globalStyle.colors.yellow,
  },
  contactNameText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: globalStyle.colors.darkerGrey,
    lineHeight: 24,
  },
  chevronIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    height: 24,
    width: 24,
  },
});

export default class DirectoryCard extends PureComponent<PropsType> {
  showContacts = (contacts: ContactType[]) => {
    const textList = contacts.map(contact => (
      <Text key={contact.id} style={styles.contactNameText}>
        {contact.name}
      </Text>
    ));
    if (contacts.length <= 4) {
      return textList;
    }
    const nextTextList = textList.slice(0, 4);
    nextTextList.push(
      <Text key={-1} style={styles.contactNameText}>
        ...
      </Text>
    );
    return nextTextList;
  };

  render() {
    const directory = this.props.directory;
    if (directory.contacts.length === 0) {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={this.props.navigateToDetails}
      >
        <Text style={styles.titleText}>{directory.title}</Text>
        <View style={styles.separator} />
        {this.showContacts(directory.contacts)}
        <Image source={LeftChevronIcon} style={styles.chevronIcon} />
      </TouchableOpacity>
    );
  }
}
