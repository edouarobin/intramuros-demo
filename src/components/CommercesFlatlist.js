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
import {
  GenerateItemListDataSource,
  GenerateFavoriteItemListDataSource,
} from 'Intramuros/src/services/ListsToolsDataSource';
import {
  LineButton,
  Separator,
  FilterInput,
  CommerceCard,
} from 'Intramuros/src/components';
import globalStyle from 'Intramuros/src/style/globalStyle';
import memoize from 'memoize-one';
import { indexOf, size } from 'lodash';
import { logFavoriteCommerce } from '../redux/utils';
import KeyboardSpacer from 'react-native-keyboard-spacer';

type PropsType = {
  navigation: any,
  commercesList: CommercesDisplayableType,
  selectedCity?: CityType,
  favoriteCommerces?: number[],
  saveFavoriteCommerceId: (id: number) => void,
  removeFavoriteCommerceId: (id: number) => void,
};

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

const commerceKeyExtractor = (item): string => `${item.id}`;
const favoriteCommerceKeyExtractor = (item): string => `favorite-${item.id}`;

export default class CommercesFlatlist extends PureComponent<PropsType> {
  state = {
    filterText: null,
  };

  searchChanged = text => {
    this.setState({ filterText: text });
  };

  _calculateDatasource = memoize(
    (commercesList, filterText, favoriteCommerces) =>
      GenerateItemListDataSource(commercesList, filterText, favoriteCommerces),
    isEqual
  );

  _calculateFavoriteCommerceDataSource = memoize(
    (commercesList, favoriteCommerces) =>
      GenerateFavoriteItemListDataSource(commercesList, favoriteCommerces),
    isEqual
  );

  _logAddingCommerce = (
    commerceId: number,
    commerceName: string,
    cityId: number,
    cityName: string
  ) => {
    try {
      logFavoriteCommerce(commerceId, commerceName, cityName, cityId);
    } catch (e) {
      console.log(e);
    }
  };

  _goToCommerceDetail = (commerce: CommercesType) => {
    this.props.navigation.navigate('CommerceDetail', { commerce: commerce });
  };

  render() {
    const dataSource = this._calculateDatasource(
      this.props.commercesList,
      this.state.filterText,
      this.props.favoriteCommerces
    );
    const favoriteCommercesDataSource = this._calculateFavoriteCommerceDataSource(
      this.props.commercesList,
      this.props.favoriteCommerces
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
            placeHolder={'Trouver un commerce'}
            searchText={this.state.filterText}
          />
          {size(this.props.favoriteCommerces) > 0 && !this.state.filterText ? (
            <View>
              <Text
                style={{
                  marginTop: 16,
                  marginLeft: 16,
                  fontFamily: 'Lato-Regular',
                  fontSize: 15,
                  color: '#000',
                }}
              >
                {'Mes commerces'}
              </Text>
              <FlatList
                data={favoriteCommercesDataSource}
                keyExtractor={favoriteCommerceKeyExtractor}
                style={{ paddingHorizontal: 16, paddingTop: 12 }}
                keyboardShouldPersistTaps="always"
                renderItem={({ item }) => (
                  <CommerceCard
                    commerce={item}
                    removeFavoriteCommerce={() =>
                      this.props.removeFavoriteCommerceId(item.id)
                    }
                    onPress={() => this._goToCommerceDetail(item)}
                  />
                )}
              />
            </View>
          ) : null}
          <SectionList
            renderItem={({ item }) => {
              return (
                <LineButton
                  label={item.name}
                  onPress={() => this._goToCommerceDetail(item)}
                  notificationDisable={false}
                  onNotificationPress={() => {
                    if (indexOf(this.props.favoriteCommerces, item.id) > -1) {
                      this.props.removeFavoriteCommerceId(item.id);
                    } else {
                      this.props.saveFavoriteCommerceId(item.id);
                      this._logAddingCommerce(
                        item.id,
                        item.name,
                        item.city,
                        item.cityName
                      );
                    }
                  }}
                  pictoName="heart"
                  isCityNotificationSelected={
                    indexOf(this.props.favoriteCommerces, item.id) > -1
                  }
                  numberOfLines={2}
                  logo={item.category_picto}
                />
              );
            }}
            renderSectionHeader={({ section }) => (
              <View
                style={{
                  backgroundColor: globalStyle.colors.greyUltraLight,
                  height: 65,
                  paddingBottom: 10,
                  justifyContent: 'flex-end',
                  flexDirection: 'column',
                }}
              >
                <Text style={styles.textSectionHeader}>{section.key} </Text>
              </View>
            )}
            ListEmptyComponent={() => {
              if (this.state.filterText)
                return (
                  <Text
                    style={{
                      marginTop: 16,
                      marginBottom: 16,
                      height: 20,
                      fontSize: 18,
                      fontFamily: 'Lato-Regular',
                      color: globalStyle.colors.darkerGrey,
                      textAlign: 'center',
                    }}
                  >
                    {'Aucun résultat.'}
                  </Text>
                );
              return null;
            }}
            sections={dataSource}
            keyExtractor={commerceKeyExtractor}
            ItemSeparatorComponent={() => <Separator />}
            stickySectionHeadersEnabled={false}
            keyboardShouldPersistTaps="always"
            style={{ marginBottom: 40 }}
            initialNumToRender={30}
          />
        </View>
        <KeyboardSpacer />
      </ScrollView>
    );
  }
}
