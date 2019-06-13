// @flow

import React, { PureComponent } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';

import { ContactCard, GoBackButton } from 'Intramuros/src/components';
import globalStyle, {
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: BIG_SCREEN_PADDING_OFFSET,
  },
  titleContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'black',
  },
  separator: {
    backgroundColor: globalStyle.colors.yellow,
    height: 2,
    width: '30%',
    alignSelf: 'center',
  },
});

declare type PropsType = {
  navigation: NavigationPropsType<{
    directory: DirectoryType,
  }>,
};

export default class DirectoryDetail extends PureComponent<PropsType> {
  render() {
    const directory = this.props.navigation.state.params.directory;
    return (
      <ScrollView
        style={{ backgroundColor: 'white' }}
        showsVerticalScrollIndicator={false}
      >
        <GoBackButton
          navigation={this.props.navigation}
          color={globalStyle.colors.mainBlue}
        />
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
          animated={true}
        />
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{directory.title}</Text>
          </View>
          <View style={styles.separator} />
          <FlatList
            data={directory.contacts}
            renderItem={({ item }) => <ContactCard contact={item} />}
          />
        </View>
      </ScrollView>
    );
  }
}
