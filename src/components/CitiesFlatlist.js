// @flow

import React, { PureComponent } from 'react';
import {
  FlatList,
  Text,
  View,
  SectionList,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  Button,
} from 'react-native';
import { isEqual } from 'lodash';
import { GenerateCitiesListDataSource } from 'Intramuros/src/services/ListsToolsDataSource';
import {
  LineButton,
  Separator,
  AroundMeButton,
  FilterInput,
} from 'Intramuros/src/components';
import globalStyle from 'Intramuros/src/style/globalStyle';
import memoize from 'memoize-one';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

type PropsType = {
  citiesList: CitiesDisplayableType,
  selectedCity?: CityType,
  selectedCitiesNotification?: number[],
  notificationDisable?: boolean,
  onCityPress: CityType => void,
  onNotificationPress?: CityType => void,
  findLocation: any,
  refresh?: any,
  isLoading: boolean,
};

const sectionHeader = 65;

const styles = StyleSheet.create({
  textSectionHeader: {
    color: '#1355B7',
    fontFamily: 'Lato-BoldItalic',
    fontSize: 14,
    marginLeft: 16,
    marginRight: 16,
    lineHeight: globalStyle.sizes.medium,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: globalStyle.colors.greyUltraLight,
  },
});

const cityKeyExtractor = (item): string => `${item.id}`;

export default class CitiesFlatlist extends PureComponent<PropsType> {
  state = {
    filterText: null,
    citiesList: this.props.citiesList,
  };

  constructor(props) {
    super(props);

    this.getItemLayout = sectionListGetItemLayout({
      // The height of the row with rowData at the given sectionIndex and rowIndex
      getItemHeight: (rowData, sectionIndex, rowIndex) => 44,

      // These four properties are optional
      getSeparatorHeight: () => 1, // The height of your separators
      getSectionHeaderHeight: () => sectionHeader, // The height of your section headers
      getSectionFooterHeight: () => 0, // The height of your section footers
      listHeaderHeight: 0, // The height of your list header.
    });
  }

  searchChanged = text => {
    this.setState({ filterText: text });
  };

  _isCityNotificationSelected = cityId => {
    let selectedCitiesNotif = this.props.selectedCitiesNotification;
    if (selectedCitiesNotif) {
      return selectedCitiesNotif.indexOf(cityId) > -1;
    }
    return false;
  };

  _calculateDatasource = memoize(
    (citiesList, filterText) =>
      GenerateCitiesListDataSource(citiesList, filterText),
    isEqual
  );

  _renderSectionHeader = ({ section }) => {
    return (
      <View
        style={{
          backgroundColor: globalStyle.colors.greyUltraLight,
          height: sectionHeader,
          paddingBottom: 10,
          justifyContent: 'flex-end',
          flexDirection: 'column',
        }}
      >
        <Text style={styles.textSectionHeader}>{section.key} </Text>
      </View>
    );
  };

  _itemSeparator = () => {
    return <Separator />;
  };

  render() {
    if (!this.props.citiesList && !this.props.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontFamily: 'Lato-Regular' }}>
            Impossible d'afficher les communes pour le moment.
          </Text>
          <View style={{ marginTop: 15 }}>
            <Button title="Réessayer" onPress={this.props.refresh} />
          </View>
        </View>
      );
    }

    const dataSource = this._calculateDatasource(
      this.props.citiesList,
      this.state.filterText
    );

    return (
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        removeClippedSubviews={Platform.OS === 'ios' ? false : true}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.containerStyle}>
          <FilterInput
            searchChanged={this.searchChanged}
            searchText={this.state.filterText}
          />
          <AroundMeButton onPress={this.props.findLocation} />
          <SectionList
            renderItem={({ item }) => {
              //Pas de Arrow function ici car on veut mettre à jour la ligne quand on clique sur la cloche. Or l'item ne change pas donc n'est pas mis à jour dans une arrow fonction.
              let isCityAlreadySubscribed = this._isCityNotificationSelected(
                item.id
              );
              return (
                <LineButton
                  label={item.name}
                  onPress={() =>
                    this.props.onCityPress(item, isCityAlreadySubscribed)
                  }
                  isSelected={
                    !!this.props.selectedCity &&
                    this.props.selectedCity.id === item.id
                  }
                  notificationDisable={this.props.notificationDisable}
                  isCityNotificationSelected={isCityAlreadySubscribed}
                  onNotificationPress={() =>
                    this.props.onNotificationPress
                      ? this.props.onNotificationPress(item)
                      : null
                  }
                />
              );
            }}
            renderSectionHeader={this._renderSectionHeader}
            sections={dataSource}
            keyExtractor={cityKeyExtractor}
            ItemSeparatorComponent={this._itemSeparator}
            stickySectionHeadersEnabled={false}
            keyboardShouldPersistTaps="always"
            getItemLayout={this.getItemLayout}
            initialNumToRender={20}
          />
        </View>
      </ScrollView>
    );
  }
}
