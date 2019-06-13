// @flow

import React, { PureComponent } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Button,
  Dimensions,
  Platform,
  Linking,
  FlatList,
} from 'react-native';
import { GoBackButtonWithTitleBlock, Loader } from 'Intramuros/src/components';
import globalStyle, {
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import request from 'superagent';
import ENV from 'Intramuros/src/environment';
import { size, indexOf } from 'lodash';
import { GenerateMenuLinkListDataSource } from 'Intramuros/src/services/ListsToolsDataSource';
import Icon from 'react-native-vector-icons/FontAwesome';
import { logFavoriteSchool } from '../../redux/utils';

type PropsType = {
  navigation: NavigationPropsType<>,
  school: SchoolsType,
  favoriteSchools: number[],
  saveFavoriteSchoolId: (id: number) => void,
  removeFavoriteSchoolId: (id: number) => void,
};

const menuKeyExtractor = (item): string => `${item.id}`;

export default class SchoolDetail extends PureComponent<PropsType> {
  state = {
    menusRetrived: false,
    menus: null,
    isRetry: false,
  };

  _fetchMenus = (id: number) => {
    request
      .get(`${ENV.API_URL}/services/menus/?school-id=` + id)
      .then(response => response.body)
      .then(menus => {
        this.setState({
          menusRetrived: true,
          menus: menus,
          isRetry: false,
        });
      })
      .catch(error => {
        console.log('ERROR during fetch menu cantine : ' + error);
        this.setState({
          menusRetrived: true,
          fetchError: true,
          isRetry: false,
        });
      });
  };

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

  render() {
    const { school } = this.props;

    if (!this.state.menusRetrived || this.state.isRetry) {
      this._fetchMenus(school.id);
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
            title="Menu cantine"
          />
          <Loader
            isLoading
            message="Chargement des menus cantine ..."
            fullpage
          />
        </View>
      );
    } else if (size(this.state.menus) < 1) {
      if (this.state.fetchError) {
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
              title="Menu cantine"
            />

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: 'Lato-Regular' }}>
                {'Impossible de récupérer les menus cantines.'}
              </Text>
              <View style={{ marginTop: 15 }}>
                <Button
                  title="Réessayer"
                  onPress={() => {
                    this.setState({ isRetry: true });
                    this._fetchMenus(school.id);
                  }}
                />
              </View>
            </View>
          </View>
        );
      } else {
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
              title="Menu cantine"
            />
            <Text
              style={{
                marginTop: 16,
                marginBottom: 16,
                height: 20,
                fontSize: 12,
                fontFamily: 'Lato-Regular',
                color: globalStyle.colors.darkerGrey,
                textAlign: 'center',
              }}
            >
              {'Aucun menu cantine pour le moment ...'}
            </Text>
          </View>
        );
      }
    }

    return (
      <View style={{ flex: 1, backgroundColor: globalStyle.colors.lightGrey }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
          animated={true}
        />

        <GoBackButtonWithTitleBlock
          navigation={this.props.navigation}
          color="black"
          title="Menu cantine"
        />

        <ScrollView
          showsVerticalScrollIndicator={true}
          removeClippedSubviews={Platform.OS === 'ios' ? false : true}
        >
          <View style={styles.container}>
            <ImageBackground
              style={{}}
              source={{ uri: school.image }}
              resizeMode="cover"
            >
              <View
                style={{
                  position: 'absolute',
                  flex: 1,
                  zIndex: 1,
                  width: '100%',
                  height: 80,
                }}
              >
                <View style={styles.pictoContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      if (indexOf(this.props.favoriteSchools, school.id) > -1) {
                        this.props.removeFavoriteSchoolId(school.id);
                      } else {
                        this.props.saveFavoriteSchoolId(school.id);
                        this._logAddingSchool(
                          school.id,
                          school.name,
                          school.city,
                          school.cityName
                        );
                      }
                    }}
                  >
                    {indexOf(this.props.favoriteSchools, school.id) > -1 ? (
                      <Icon
                        style={{ color: 'white' }}
                        name={'heart'}
                        size={30}
                      />
                    ) : (
                      <Icon
                        style={{ color: 'white' }}
                        name={'heart-o'}
                        size={30}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontFamily: 'Lato-Regular',
                      fontSize: 28,
                    }}
                  >
                    {school.name}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.container}>
            <FlatList
              style={{
                marginBottom: 40,
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
              data={GenerateMenuLinkListDataSource(this.state.menus)}
              keyExtractor={menuKeyExtractor}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      marginTop: 10,
                      paddingHorizontal: 16 + BIG_SCREEN_PADDING_OFFSET,
                    }}
                  >
                    <TouchableOpacity
                      style={[{ borderRadius: 8 }]}
                      onPress={() => {
                        Linking.openURL(
                          item.pdf ? item.pdf : item.url ? item.url : ''
                        );
                      }}
                    >
                      <View style={[styles.button]}>
                        <Text style={styles.text} numberOfLines={3}>
                          {item.title ? item.title : 'N/A'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
              removeClippedSubviews={Platform.OS === 'ios' ? false : true}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.colors.lightGrey,
  },
  headerContainer: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
    height: screenHeight * 0.3,
    paddingHorizontal: 24,
  },
  titleContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  pictoContainer: {
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    zIndex: 1,
    width: '100%',
  },
  pictoButton: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#ECECF1',
  },
  text: {
    color: 'black',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: globalStyle.sizes.medium,
    paddingHorizontal: 15,
    paddingVertical: 20,
    textAlign: 'center',
  },
});
