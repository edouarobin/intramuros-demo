// @flow

import React, { PureComponent } from 'react';
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import globalStyle, {
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import SurveyPicto from 'Intramuros/src/assets/elections.png';
import AnnuairePicto from 'Intramuros/src/assets/mobile-phone.png';
import SignalProblemPicto from 'Intramuros/src/assets/picto_plot.png';
import MenuPicto from 'Intramuros/src/assets/lunch-box.png';
import AssoPicto from 'Intramuros/src/assets/association.png';
import CommercePicto from 'Intramuros/src/assets/commerce.png';
import Toast from 'react-native-root-toast';

type PropsType = {
  _goToPage: any,
  counterSurveyInProgress: number,
  showAnnuaire: boolean,
  signalProblems: boolean,
  showSurveyBlock: boolean,
  showSchools: boolean,
  showAssos: boolean,
  showCommerces: boolean,
};

export default class ServicesBlocks extends PureComponent<PropsType> {
  _showToaster = (message: string) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  _onPressAnnuaire = () => {
    if (this.props.showAnnuaire) {
      this.props._goToPage('DirectoryList');
    } else {
      this._showToaster('Aucun annuaire pour cette commune.');
    }
  };

  _onPressReport = () => {
    if (!this.props.signalProblems) {
      this._showToaster("Ce service n'est pas activé pour cette commune.");
    } else {
      this.props._goToPage('ReportPage');
    }
  };

  _onPressSurvey = () => {
    if (!this.props.showSurveyBlock) {
      this._showToaster('Aucun sondage pour le moment.');
    } else {
      this.props._goToPage('SurveyPage');
    }
  };

  _getSurveyBlockSubtitle = () => {
    if (this.props.showSurveyBlock && this.props.counterSurveyInProgress > 0) {
      return ' (' + this.props.counterSurveyInProgress + ' en cours)';
    }
    return null;
  };

  _onPressMenu = () => {
    if (!this.props.showSchools) {
      this._showToaster('Aucun menu cantine pour le moment.');
    } else {
      this.props._goToPage('SchoolsPage');
    }
  };

  _onPressAssos = () => {
    if (!this.props.showAssos) {
      this._showToaster('Aucune association pour le moment.');
    } else {
      this.props._goToPage('AssosPage');
    }
  };

  _onPressCommerces = () => {
    if (!this.props.showCommerces) {
      this._showToaster('Aucun commerce pour le moment.');
    } else {
      this.props._goToPage('CommercesPage');
    }
  };

  _generateDataSource = () => {
    let dataSource = [];

    if (this.props.showAnnuaire) {
      dataSource.push({
        title: 'Annuaire',
        logo: AnnuairePicto,
        subtitle: null,
        onPress: this._onPressAnnuaire,
      });
    }
    if (this.props.signalProblems) {
      dataSource.push({
        title: 'Alerter ma mairie',
        logo: SignalProblemPicto,
        subtitle: null,
        onPress: this._onPressReport,
      });
    }
    if (this.props.showSurveyBlock) {
      dataSource.push({
        title: 'Sondages',
        logo: SurveyPicto,
        subtitle: this._getSurveyBlockSubtitle(),
        onPress: this._onPressSurvey,
      });
    }
    if (this.props.showSchools) {
      dataSource.push({
        title: 'Menu cantine',
        logo: MenuPicto,
        subtitle: null,
        onPress: this._onPressMenu,
      });
    }
    if (this.props.showAssos) {
      dataSource.push({
        title: 'Associations',
        logo: AssoPicto,
        subtitle: null,
        onPress: this._onPressAssos,
      });
    }
    if (this.props.showCommerces) {
      dataSource.push({
        title: 'Commerces',
        logo: CommercePicto,
        subtitle: null,
        onPress: this._onPressCommerces,
      });
    }

    //Permet de ne pas avoir des blocs qui prennent toute la largeur.
    if (dataSource.length > 0 && dataSource.length % 2 === 1) {
      dataSource.push({ title: null });
    }
    return dataSource;
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this._generateDataSource()}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
              {item.title ? (
                <TouchableHighlight
                  style={[{ borderRadius: BORDER_RADIUS }]}
                  onPress={item.onPress}
                  activeOpacity={0.2}
                  underlayColor={'white'}
                >
                  <View style={[styles.block]}>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        height: BLOCK_HEIGHT * 0.3,
                      }}
                    >
                      <View style={styles.titleBlock}>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: 'black',
                            fontSize: 15,
                            fontFamily: 'Lato-Bold',
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                      {item.subtitle ? (
                        <View style={styles.subtitleBlock}>
                          <Text
                            style={{
                              color: '#3d3d3d',
                              fontSize: 15,
                              fontFamily: 'Lato',
                            }}
                          >
                            {item.subtitle}
                          </Text>
                        </View>
                      ) : null}
                    </View>

                    <View
                      style={{
                        height: BLOCK_HEIGHT * 0.7,
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <Image source={item.logo} style={styles.pictoIcon} />
                    </View>
                  </View>
                </TouchableHighlight>
              ) : null}
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={() => (
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
              {"Aucun service n'est disponible pour cette commune ..."}
            </Text>
          )}
        />
      </View>
    );
  }
}

const BORDER_RADIUS = 8;
const BLOCK_HEIGHT = 140;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 10 + BIG_SCREEN_PADDING_OFFSET,
    paddingVertical: 20,
  },
  block: {
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
    height: BLOCK_HEIGHT,
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    zIndex: 999,
    elevation: 3,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleBlock: {
    height: BLOCK_HEIGHT * 0.15,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  subtitleBlock: {
    height: BLOCK_HEIGHT * 0.15,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    paddingRight: 0,
    justifyContent: 'center',
  },
  pictoIcon: {
    height: (BLOCK_HEIGHT * 0.7 * 3) / 4,
    width: (BLOCK_HEIGHT * 0.7 * 3) / 4,
  },
});
