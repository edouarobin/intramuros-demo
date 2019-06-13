// @flow

import React, { PureComponent } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Share,
  Alert,
  TouchableOpacity,
  Image,
  Text,
  Linking,
  StatusBar,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { HeaderBasicTitle } from 'Intramuros/src/components';
import {
  requestAuthorisationPosition,
  getCurrentPosition,
} from 'Intramuros/src/services/GeoLocation';
import { myFirebase } from '../redux/utils';
import HTMLText from 'Intramuros/src/utils/HTMLText';
import { Button } from 'react-native-material-ui';
import globalStyle, {
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import DistanceSettings from 'Intramuros/src/assets/distance-settings.png';
import ShareSettings from 'Intramuros/src/assets/share-green.png';
import MentionsLegales from 'Intramuros/src/assets/mentions-legales.png';
import settingsActionCreators from 'Intramuros/src/redux/settings/actionCreators';
import { selectors as settingsSelector } from 'Intramuros/src/redux/settings';
import {
  Dialog,
  DialogDefaultActions,
  RadioButton,
} from 'react-native-material-ui';

type PropsType = {
  modalVisible: boolean,
  closeModal: () => void,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 0,
  },
  itemContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'white',
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#CED0D4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pictoIcon: {
    height: 34,
    width: 34,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {},
  text: {
    color: '#1D2129',
    fontFamily: 'Lato-Regular',
    fontSize: 17,
  },
});

const distanceDatasource = [
  { label: '10 km', value: 10000, color: globalStyle.colors.black },
  { label: '20 km', value: 20000, color: globalStyle.colors.black },
  { label: '30 km', value: 30000, color: globalStyle.colors.black },
  { label: '40 km', value: 40000, color: globalStyle.colors.black },
  { label: '50 km', value: 50000, color: globalStyle.colors.black },
  { label: '70 km', value: 70000, color: globalStyle.colors.black },
  { label: '100 km', value: 100000, color: globalStyle.colors.black },
];

class SettingsModal extends PureComponent<PropsType, StateType> {
  state = {
    eventSettingsModalVisible: false,
    distanceEvent: this.props.distanceEvent,
    distanceLabel: this.props.distanceLabel,
  };

  _shareLink = async () => {
    Share.share(
      {
        message:
          "L'appli de votre commune est disponible ici: https://intramuros.page.link/bienvenue",
        title: "IntraMuros, l'essentiel de ma commune",
      },
      {
        // Android only:
        dialogTitle: 'Partager IntraMuros',
        // iOS only:
        subject: "IntraMuros, l'essentiel de ma commune",
      }
    );
    // const link =
    //   new myFirebase.links.DynamicLink('https://www.intramuros.org/', 'intramuros.page.link')
    //     .android.setPackageName('com.intramuros.Intramuros.production')
    //     .ios.setBundleId('com.intramuros.Intramuros.production')
    //     .ios.setAppStoreId('1312850573');

    // console.log(link)

    // myFirebase.links()
    //   .createShortDynamicLink(link, 'SHORT')
    //   // .createDynamicLink(link)
    //   .then((url) => {
    //     console.log("URL generated: " + url)
    //     Share.share({
    //       message: "Télécharge l'appli IntraMuros, c'est génial. " + url,
    //       title: "J'ai découvert l'application qu'il te faut."
    //     }, {
    //         // Android only:
    //         dialogTitle: 'Partager IntraMuros',
    //         // iOS only:
    //         subject: "Venez découvrir IntraMuros !",
    //         excludedActivityTypes: [
    //           'com.apple.UIKit.activity.PostToTwitter'
    //         ]
    //       })
    //   })
    //   .catch((error) => {
    //     Alert.alert(
    //       'Oups',
    //       "Une erreur est survenue. Merci de réessayer.",
    //       [
    //         { text: 'Ok', onPress: () => { } }
    //       ],
    //       {
    //         cancelable: false,
    //       }
    //     );
    //   });
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={this.props.closeModal}
      >
        <HeaderBasicTitle
          text="IntraMuros"
          onCrossPress={this.props.closeModal}
          info={false}
        />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => this.setState({ eventSettingsModalVisible: true })}
          >
            <View style={styles.leftContainer}>
              <Image source={DistanceSettings} style={styles.pictoIcon} />
              <Text
                numberOfLines={2}
                style={[styles.text, { paddingLeft: 18 }]}
              >
                {'Portée des événements'}
              </Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={[styles.text, { color: '#565656' }]}>
                {this.state.distanceLabel}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => this._shareLink()}
          >
            <View style={styles.leftContainer}>
              <Image source={ShareSettings} style={styles.pictoIcon} />
              <Text
                numberOfLines={2}
                style={[styles.text, { paddingLeft: 18 }]}
              >
                {"Partager l'application"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => Linking.openURL('http://appli-intramuros.fr/infos/')}
          >
            <View style={styles.leftContainer}>
              <Image source={MentionsLegales} style={styles.pictoIcon} />
              <Text
                numberOfLines={2}
                style={[styles.text, { paddingLeft: 18 }]}
              >
                {'Mentions légales'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          visible={this.state.eventSettingsModalVisible}
          transparent={true}
          onRequestClose={() => {
            this.setState({ eventSettingsModalVisible: false });
          }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,0.6)"
            translucent
            animated={true}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}
          >
            <Dialog style={{ container: { marginVertical: 100 } }}>
              <Dialog.Title
                style={{
                  titleText: {
                    fontFamily: 'Lato-Regular',
                    fontWeight: '400',
                    fontSize: 20,
                  },
                  titleContainer: {
                    paddingBottom: 10,
                  },
                }}
              >
                <Text>{'Portée des événements'}</Text>
              </Dialog.Title>
              <Dialog.Title
                style={{
                  titleText: {
                    fontSize: 12,
                    fontFamily: 'Lato-Regular',
                    color: globalStyle.colors.darkerGrey,
                    fontWeight: 'normal',
                  },
                  titleContainer: {
                    paddingBottom: 0,
                  },
                }}
              >
                <Text>
                  {
                    'Ce paramètre est pris en compte dans les sections "À la une", "Aux alentours" et dans les filtres d\'événements'
                  }
                </Text>
              </Dialog.Title>
              <FlatList
                data={distanceDatasource}
                keyExtractor={item => `${item.value}`}
                style={{ paddingHorizontal: 16 }}
                keyboardShouldPersistTaps="always"
                renderItem={({ item }) => (
                  <RadioButton
                    label={item.label}
                    checked={this.state.distanceEvent === item.value}
                    value={item.value}
                    onSelect={() => null}
                    onCheck={checked =>
                      this.setState({
                        distanceEvent: item.value,
                        distanceLabel: item.label,
                      })
                    }
                  />
                )}
              />
              <Dialog.Actions
                style={{
                  actionsContainer: {
                    paddingRight: 20,
                  },
                }}
              >
                <DialogDefaultActions
                  actions={['ok']}
                  onActionPress={action => {
                    this.setState({ eventSettingsModalVisible: false });
                    this.props.changeEventDistance(this.state.distanceEvent);
                  }}
                />
              </Dialog.Actions>
            </Dialog>
          </View>
        </Modal>
      </Modal>
    );
  }
}

const mapStateToProps = (rootState: RootStateType, ownProps: any) => ({
  distanceEvent: settingsSelector.selectedEventDistanceValue(rootState),
  distanceLabel: settingsSelector.selectedEventDistanceLabel(rootState),
});

const mapDispatchToProps = {
  changeEventDistance: (distance: number) =>
    settingsActionCreators.changeEventDistance(distance),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsModal);
