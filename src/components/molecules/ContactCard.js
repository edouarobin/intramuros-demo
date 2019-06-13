// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import globalStyle from 'Intramuros/src/style/globalStyle';
import {
  ContactNumber,
  ContactEmail,
  ContactWeb,
  ContactFax,
  ContactMap,
} from 'Intramuros/src/components';

type PropsType = {
  contact: ContactType,
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    margin: 24,
  },
  separator: {
    height: 1,
    backgroundColor: globalStyle.colors.grey,
  },
  name: {
    fontFamily: 'Lato-Regular',
    paddingVertical: 5,
    fontSize: 16,
    color: 'black',
  },
  description: {
    fontFamily: 'Lato-Italic',
    paddingVertical: 10,
    fontSize: 14,
    // fontStyle: 'italic',
    color: globalStyle.colors.darkerGrey,
  },
});

export default class ContactCard extends PureComponent<PropsType> {
  render() {
    const contact = this.props.contact;

    return (
      <View style={styles.cardContainer}>
        <Text style={styles.name}>{contact.name}</Text>
        <View style={styles.separator} />
        {contact.description ? (
          <Text selectable={true} style={styles.description}>
            {contact.description}
          </Text>
        ) : null}
        {contact.addressLabel ? (
          <ContactMap address={contact.addressLabel} />
        ) : null}
        {contact.number ? <ContactNumber number={contact.number} /> : null}
        {contact.number2 ? <ContactNumber number={contact.number2} /> : null}
        {contact.number3 ? <ContactNumber number={contact.number3} /> : null}
        {contact.fax ? <ContactFax fax={contact.fax} /> : null}
        {contact.email ? <ContactEmail email={contact.email} /> : null}
        {contact.website ? (
          <ContactWeb
            website={contact.website}
            icon={true}
            fisrtElement={true}
          />
        ) : null}
      </View>
    );
  }
}
