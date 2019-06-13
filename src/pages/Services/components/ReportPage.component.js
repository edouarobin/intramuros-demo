// @flow
import KeyboardSpacer from 'react-native-keyboard-spacer';
import React, { PureComponent } from 'react';
import { CheckBox } from 'react-native-elements';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  ActivityIndicator,
  Alert,
  StatusBar,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { showImagePicker } from 'react-native-image-picker';
import request from 'superagent';
import ENV from 'Intramuros/src/environment';
import { web } from 'react-native-communications';
import { GoBackButtonWithTitleBlock, Loader } from 'Intramuros/src/components';
import globalStyle from 'Intramuros/src/style/globalStyle';

import styles, { formStyles } from './ReportPage.style';
import {
  forEach,
  lowerCase,
  deburr,
  orderBy,
  size,
  trim,
  isEqual,
  isEmpty,
} from 'lodash';
import Toast from 'react-native-root-toast';
import {
  Dialog,
  DialogDefaultActions,
  RadioButton,
} from 'react-native-material-ui';
import memoizeOne from 'memoize-one';

type PropsType = {
  selectedCity: CityType,
};

type StateType = {
  imageSource: { uri: string | null },
  reportIsSending: boolean,
  cguChecked: boolean,
  topicsReport: any,
  topicsCalled: boolean,
};

const ImageInput = ({ onPhotoPress, imageSource }) => (
  <TouchableOpacity style={styles.imageInput} onPress={onPhotoPress}>
    <View style={styles.imageContainer}>
      {imageSource.uri && <Image style={styles.image} source={imageSource} />}
    </View>
    <Text style={styles.imageText}>
      {imageSource.uri ? 'Modifier la photo' : 'Ajouter une photo (facultatif)'}
    </Text>
  </TouchableOpacity>
);

export default class ReportPage extends PureComponent<PropsType, StateType> {
  state = {
    imageSource: { uri: null },
    reportIsSending: false,
    cguChecked: false,
    topicsReport: null,
    topicsCalled: false,
    modalVisible: false,
    address: '',
    description: '',
    email: '',
    category: -1,
  };

  componentDidMount = () => {
    request
      .get(`${ENV.API_URL}/services/reports/categories/`)
      .query({ 'city-id': this.props.selectedCity.id })
      .timeout(5000)
      .then(res => res.body)
      .then(topics => {
        this.setState({ topicsReport: topics, topicsCalled: true });
      })
      .catch(error => {
        this.setState({ topicsCalled: true });
        console.log('ERROR during fetch topics report : ' + error);
      });
  };

  onPhotoPress = () => {
    const photoOptions = {
      title: '',
      cancelButtonTitle: 'Annuler',
      takePhotoButtonTitle: 'Prendre une photo...',
      chooseFromLibraryButtonTitle: 'Choisir une photo...',
      customButtons: [{ name: 'delete', title: 'Supprimer la photo' }],
      maxWidth: 650, //for performance (low speed network)
      maxHeight: 650,
      noData: true,
    };
    showImagePicker(photoOptions, response => {
      if (!response.didCancel && !response.error && !response.customButton) {
        const imageSource = {
          uri: response.uri,
          name: 'image.JPG',
          type: 'image/jpg',
        };

        this.setState({ imageSource });
      } else if (response.customButton && response.customButton === 'delete') {
        this.setState({ imageSource: { uri: null } });
        console.log('User tapped custom button: ', response.customButton);
      }
    });
  };

  success = () => {
    this.props.navigation.goBack();
  };

  error = () => {
    this.setState({ reportIsSending: false });
  };

  _formValidator = () => {
    //Topic
    if (size(this.state.topicsReport) > 0 && this.state.category < 0) {
      this._showToaster('Veuillez renseigner la catégorie de signalement');
      return false;
    }
    //Address
    if (isEmpty(this.state.address)) {
      this._showToaster('Le champ Adresse est obligatoire');
      return false;
    }
    //Description
    if (isEmpty(this.state.description)) {
      this._showToaster('Le champ Description est obligatoire');
      return false;
    }
    //email
    if (isEmpty(this.state.email)) {
      this._showToaster('Le champ Email est obligatoire');
      return false;
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      this._showToaster('Le champ Email est invalide');
      return false;
    }

    return true;
  };

  onSubmitForm = () => {
    if (this._formValidator()) {
      this.setState({ reportIsSending: true });

      const postForm = request.post(`${ENV.API_URL}/services/reports/`);

      if (this.state.imageSource.uri) {
        postForm.attach('image', this.state.imageSource);
      }

      postForm
        .field('title', this.state.address ? this.state.address : '')
        .field(
          'description',
          this.state.description ? this.state.description : ''
        )
        .field('email', this.state.email ? this.state.email : '')
        .field('city', this.props.selectedCity.id);
      if (this.state.category && this.state.category > 0) {
        postForm.field('topic', this.state.category);
      }
      postForm
        .then(() =>
          Alert.alert(
            'Merci !',
            'Votre message a été envoyé. Les services de la mairie vont faire tout leur possible pour résoudre ce problème dans les plus brefs délais.',
            [{ text: 'OK', onPress: () => this.success() }],
            { cancelable: false }
          )
        )
        .catch(error => {
          let response = error ? error.response : null;
          if (response && response.statusCode) {
            console.log(response);
            if (response.statusCode === 429) {
              Alert.alert(
                'Envoi bloqué !',
                'Pour des raisons de sécurité vous ne pouvez pas envoyer plus de 10 signalements par heure. Nous vous invitons a réessayer dans 1h maximum.',
                [{ text: 'OK', onPress: () => this.error() }],
                { cancelable: false }
              );
            } else {
              Alert.alert(
                "Echec d'envoi (erreur " + response.statusCode + ')',
                "Veuillez essayer à nouveau. Si le problème persiste, vérifiez votre connexion internet ou contactez le support IntraMuros (assistance@appli-intramuros.fr) en précisant le code d'erreur.",
                [{ text: 'OK', onPress: () => this.error() }],
                { cancelable: false }
              );
            }
          } else {
            Alert.alert(
              "Impossible d'envoyer votre signalement",
              'Veuillez essayer à nouveau. Si le problème persiste, vérifiez votre connexion internet ou contactez le support IntraMuros (assistance@appli-intramuros.fr).',
              [{ text: 'OK', onPress: () => this.error() }],
              { cancelable: false }
            );
          }
        });
    }
  };

  _generateTopicsDataSource = (topicsReport: any) => {
    if (size(topicsReport) > 0) {
      let topicsDataSource = [];
      forEach(this.state.topicsReport, topic => {
        topicsDataSource.push({
          label: topic.name,
          value: topic.id,
          color: globalStyle.colors.black,
        });
      });
      topicsDataSource = orderBy(
        topicsDataSource,
        [item => lowerCase(deburr(item.label))],
        'asc'
      );

      //Add the default
      topicsDataSource.push({
        label: 'Autre ...',
        value: 0,
        color: globalStyle.colors.black,
      });
      return topicsDataSource;
    }
    return null;
  };

  _getTopicsDataSource = memoizeOne(this._generateTopicsDataSource, isEqual);

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

  render() {
    if (!this.state.topicsCalled) {
      //Waiting call finish
      return (
        <View style={{ flex: 1, backgroundColor: globalStyle.colors.white }}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
            animated={true}
          />
          <GoBackButtonWithTitleBlock
            navigation={this.props.navigation}
            color="black"
            title="Alerter ma mairie"
          />
          <Loader
            isLoading={true}
            message="Chargement en cours"
            fullpage={true}
          />
        </View>
      );
    }

    const topicDataSource = this._getTopicsDataSource(this.state.topicsReport);

    if (this.props.selectedCity.signalProblems === false) {
      return (
        <View style={{ flex: 1, backgroundColor: globalStyle.colors.white }}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
            animated={true}
          />
          <GoBackButtonWithTitleBlock
            navigation={this.props.navigation}
            color="black"
            title="Alerter ma mairie"
          />
          <Text
            style={styles.messageIfNoInfo}
          >{`Ce service n'est pas disponible pour cette commune`}</Text>
        </View>
      );
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
          title="Alerter ma mairie"
        />
        <ScrollView
          style={{
            backgroundColor: globalStyle.colors.lightGrey,
          }}
        >
          <View style={styles.form}>
            <Text
              numberOfLines={2}
              style={{
                textAlign: 'left',
                width: '100%',
                marginBottom: 16,
                fontSize: 14,
                fontFamily: 'Lato-Regular',
                color: globalStyle.colors.darkerGrey,
              }}
            >
              <Text>{'Le signalement sera envoyé à '}</Text>
              <Text style={{ fontFamily: 'Lato-Bold' }}>
                {this.props.selectedCity.name}
              </Text>
            </Text>
            <ImageInput
              onPhotoPress={this.onPhotoPress}
              imageSource={this.state.imageSource}
            />

            {size(topicDataSource) > 0 ? (
              <View>
                <Text style={styles.inputLabel}>
                  {'Mon signalement concerne'}
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({ modalVisible: true })}
                >
                  <View pointerEvents="none">
                    <TextInput
                      placeholder="Choisissez une catégorie"
                      style={formStyles.fieldText}
                      editable={false}
                      value={this.state.categoryLabel}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}

            <Text style={styles.inputLabel}>Lieu du problème</Text>
            <TextInput
              placeholder="Adresse ou lieu-dit"
              maxLength={100}
              style={formStyles.fieldText}
              onChangeText={text => this.setState({ address: trim(text) })}
            />
            <Text style={styles.inputLabel}>Description du problème</Text>
            <TextInput
              displayName="Description"
              placeholder="Exemple : décharge sauvage, voirie abîmée, panneau de signalisation manquant, mobilier urbain dégradé, graffiti, etc."
              maxLength={1000}
              multiline
              style={[formStyles.fieldText, { height: 150 }]}
              onChangeText={text => this.setState({ description: trim(text) })}
            />
            <Text style={styles.inputLabel}>Votre adresse Email</Text>
            <TextInput
              autoCorrect={false}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              placeholder="Email"
              maxLength={80}
              style={formStyles.fieldText}
              onChangeText={text => this.setState({ email: trim(text) })}
            />
            <TouchableOpacity
              onPress={() => web('https://appli-intramuros.fr/cgu')}
            >
              <Text style={styles.linkStyle} numberOfLines={1}>
                {"Lire les conditions générales d'utilisation"}
              </Text>
            </TouchableOpacity>

            <CheckBox
              title="J'ai lu et j'accepte les CGU."
              containerStyle={{ marginLeft: 0, marginRight: 0 }}
              textStyle={{ fontSize: 12 }}
              fontFamily={'Lato-Light'}
              checked={this.state.cguChecked}
              onPress={() =>
                this.setState({
                  cguChecked: !this.state.cguChecked,
                })
              }
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                this.onSubmitForm();
              }}
              disabled={this.state.reportIsSending || !this.state.cguChecked}
            >
              {this.state.reportIsSending ? (
                <ActivityIndicator animating size="small" color="white" />
              ) : (
                <Text style={styles.submitText}>Envoyer</Text>
              )}
            </TouchableOpacity>
            <KeyboardSpacer />
          </View>
        </ScrollView>

        <Modal
          animationType="fade"
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
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
                <Text>{'Choisissez une catégorie'}</Text>
              </Dialog.Title>
              <FlatList
                data={topicDataSource}
                keyExtractor={item => `${item.value}`}
                style={{ paddingHorizontal: 16 }}
                keyboardShouldPersistTaps="always"
                renderItem={({ item }) => (
                  <RadioButton
                    label={item.label}
                    checked={this.state.category === item.value}
                    value={item.value}
                    onSelect={() => null}
                    onCheck={checked =>
                      this.setState({
                        category: item.value,
                        categoryLabel: item.label,
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
                    this.setState({ modalVisible: false });
                  }}
                />
              </Dialog.Actions>
            </Dialog>
          </View>
        </Modal>
      </View>
    );
  }
}
