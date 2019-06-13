// @flow

import React, { PureComponent } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';

import { DirectoryCard } from 'Intramuros/src/components';

import globalStyle, {
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import { GoBackButtonWithTitleBlock } from 'Intramuros/src/components';

type PropsType = {
  navigation: any,
  directories: DirectoryType[],
};

export default class DirectoriesPage extends PureComponent<PropsType> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
          animated={true}
        />

        <GoBackButtonWithTitleBlock
          navigation={this.props.navigation}
          color="black"
          title="Annuaire"
        />
        <ScrollView style={{ backgroundColor: globalStyle.colors.lightGrey }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              alignItems: 'center',
              padding: 16,
              paddingHorizontal: 16 + BIG_SCREEN_PADDING_OFFSET,
            }}
          >
            {this.props.directories ? (
              this.props.directories.map(directory => (
                <DirectoryCard
                  key={directory.id}
                  directory={directory}
                  navigateToDetails={() =>
                    this.props.navigation.navigate('DirectoryDetail', {
                      directory,
                    })
                  }
                />
              ))
            ) : (
              <Text style={{ fontFamily: 'Lato-Regular', height: 50 }}>
                Pas de contact pour cette commune
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
