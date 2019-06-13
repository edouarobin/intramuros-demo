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
  SchoolCard,
} from 'Intramuros/src/components';
import globalStyle from 'Intramuros/src/style/globalStyle';
import memoize from 'memoize-one';
import { indexOf, size } from 'lodash';
import { logFavoriteSchool } from '../redux/utils';
import KeyboardSpacer from 'react-native-keyboard-spacer';

type PropsType = {
  navigation: any,
  schoolsList: SchoolsDisplayableType,
  selectedCity?: CityType,
  favoriteSchools?: number[],
  saveFavoriteSchoolId: (id: number) => void,
  removeFavoriteSchoolId: (id: number) => void,
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

const schoolKeyExtractor = (item): string => `${item.id}`;
const favoriteSchoolKeyExtractor = (item): string => `favorite-${item.id}`;

export default class SchoolsFlatlist extends PureComponent<PropsType> {
  state = {
    filterText: null,
  };

  searchChanged = text => {
    this.setState({ filterText: text });
  };

  _calculateDatasource = memoize(
    (schoolsList, filterText, favoriteSchools) =>
      GenerateItemListDataSource(schoolsList, filterText, favoriteSchools),
    isEqual
  );

  _calculateFavoriteSchoolDataSource = memoize(
    (schoolsList, favoriteSchools) =>
      GenerateFavoriteItemListDataSource(schoolsList, favoriteSchools),
    isEqual
  );

  _logAddingSchool = (
    schoolId: number,
    schoolName: string,
    cityId: number,
    cityName: string
  ) => {
    try {
      logFavoriteSchool(schoolId, schoolName, cityName, cityId);
    } catch (e) {
      console.log(e);
    }
  };

  _goToSchoolDetail = (school: SchoolsType) => {
    this.props.navigation.navigate('SchoolDetail', { school: school });
  };

  render() {
    const dataSource = this._calculateDatasource(
      this.props.schoolsList,
      this.state.filterText,
      this.props.favoriteSchools
    );
    const favoriteSchoolsDataSource = this._calculateFavoriteSchoolDataSource(
      this.props.schoolsList,
      this.props.favoriteSchools
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
            placeHolder={'Trouver une école'}
            searchText={this.state.filterText}
          />
          {size(this.props.favoriteSchools) > 0 && !this.state.filterText ? (
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
                {'Mes écoles'}
              </Text>
              <FlatList
                data={favoriteSchoolsDataSource}
                keyExtractor={favoriteSchoolKeyExtractor}
                style={{ paddingHorizontal: 16, paddingTop: 12 }}
                keyboardShouldPersistTaps="always"
                renderItem={({ item }) => (
                  <SchoolCard
                    school={item}
                    removeFavoriteSchool={() =>
                      this.props.removeFavoriteSchoolId(item.id)
                    }
                    onPress={() => this._goToSchoolDetail(item)}
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
                  onPress={() => this._goToSchoolDetail(item)}
                  notificationDisable={false}
                  onNotificationPress={() => {
                    if (indexOf(this.props.favoriteSchools, item.id) > -1) {
                      this.props.removeFavoriteSchoolId(item.id);
                    } else {
                      this.props.saveFavoriteSchoolId(item.id);
                      this._logAddingSchool(
                        item.id,
                        item.name,
                        item.city,
                        item.cityName
                      );
                    }
                  }}
                  pictoName="heart"
                  isCityNotificationSelected={
                    indexOf(this.props.favoriteSchools, item.id) > -1
                  }
                  numberOfLines={2}
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
            keyExtractor={schoolKeyExtractor}
            ItemSeparatorComponent={() => <Separator />}
            stickySectionHeadersEnabled={false}
            keyboardShouldPersistTaps="always"
            style={{ marginBottom: 40 }}
          />
        </View>
        <KeyboardSpacer />
      </ScrollView>
    );
  }
}
