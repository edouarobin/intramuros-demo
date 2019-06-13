// @flow

import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
  ImageEditor,
  ImageCropData,
  ImageStore,
  Text,
} from 'react-native';

import { CardText, YellowLabelDistance } from 'Intramuros/src/components';
import globalStyle from 'Intramuros/src/style/globalStyle';

type PropsType = {
  onPress: () => void,
  title: string,
  subtitle?: string,
  subtitle2?: string,
  image: string,
  style?: {},
  distance?: number | null,
  isAnecdote?: boolean,
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 2,
    ...globalStyle.shadow,
  },
  imageContainer: {
    flex: 1,
  },
  textContainer: {
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default class TopImageCard extends PureComponent<PropsType> {
  state = {
    croppedImageURI: this.props.croppedActivated ? '' : this.props.image,
  };

  successCropping = (uri: string) => {
    //Delete old image from memory
    if (this.state.croppedImageURI && this.props.croppedActivated) {
      ImageStore.removeImageForTag(this.state.croppedImageURI);
    }
    //Diplay the new image
    this.setState({ croppedImageURI: uri });
  };

  errorCropping = (error: Object) => {
    console.log('erreur lors du crop :');
    console.log(error);
    //backup: on met l'image non croppée
    this.setState({ croppedImageURI: this.props.image });
  };

  static generateImageCropOptions = (croppedData: string) => {
    var data = null;
    try {
      if (croppedData && croppedData.split(';').length == 4) {
        data = {
          size: {
            width: parseFloat(croppedData.split(';')[2]),
            height: parseFloat(croppedData.split(';')[3]),
          },
          offset: {
            x: parseFloat(croppedData.split(';')[0]),
            y: parseFloat(croppedData.split(';')[1]),
          },
        };

        if (
          data.size.width >= 0 &&
          data.size.height >= 0 &&
          data.offset.x >= 0 &&
          data.offset.y >= 0
        ) {
          return data;
        } else {
          return null;
        }
      }
    } catch (err) {
      console.log('exception while calculating crop data');
      return null;
    }
  };

  cropImage = (cropOptions: ImageCropData) => {
    ImageEditor.cropImage(
      this.props.image,
      cropOptions,
      this.successCropping,
      this.errorCropping
    );
  };

  setImageAndCrop = () => {
    var cropOptions = TopImageCard.generateImageCropOptions(
      this.props.croppedData
    );
    if (cropOptions) {
      this.cropImage(cropOptions);
    } else {
      this.setState({ croppedImageURI: this.props.image });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    //Si l'image et/ou le croppedData a changé on met à jour.
    if (
      this.props.croppedActivated &&
      (prevProps.croppedData !== this.props.croppedData ||
        prevProps.image !== this.props.image)
    ) {
      console.log(
        "l'image ou les données de crop du POI ont changés. Mise à jour du crop."
      );
      this.setImageAndCrop();
    }
  }

  componentDidMount() {
    if (this.props.croppedActivated) {
      this.setImageAndCrop();
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.cardContainer, this.props.style]}
        onPress={this.props.onPress}
      >
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.image}
            source={{ uri: this.state.croppedImageURI }}
            resizeMethod="resize"
          >
            {this.props.distance ? (
              <YellowLabelDistance distance={this.props.distance} />
            ) : null}
          </ImageBackground>
        </View>
        <View style={styles.textContainer}>
          <CardText
            title={this.props.title}
            subtitle={this.props.subtitle}
            subtitle2={this.props.subtitle2}
            cardType={'horizontal'}
            titleNumberOfLines={this.props.isAnecdote ? 2 : 1}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
