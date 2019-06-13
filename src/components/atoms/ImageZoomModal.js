// @flow

import React, { PureComponent } from 'react';
import { Modal, Dimensions, StatusBar, View } from 'react-native';

import { MyFastImage } from 'Intramuros/src/components';
import ImageZoom from 'react-native-image-pan-zoom';
import { CloseCrossButton } from 'Intramuros/src/components';
import Icon from 'react-native-vector-icons/FontAwesome';

type PropsType = {
  modalVisible: boolean,
  closeImageModal: () => void,
  image: string,
};

export default class ImageZoomModal extends PureComponent<PropsType> {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Modal
          animationType="fade"
          visible={this.props.modalVisible}
          transparent={true}
          onRequestClose={this.props.closeImageModal}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="black"
            translucent
            animated={true}
          />
          <CloseCrossButton
            color={'white'}
            closeImageModal={this.props.closeImageModal}
          />
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Dimensions.get('window').height}
            style={{ backgroundColor: 'black' }}
          >
            <MyFastImage
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              }}
              source={{
                uri: this.props.image,
                priority: 'normal',
              }}
              resizeMode={'contain'}
            />
          </ImageZoom>
        </Modal>
      </View>
    );
  }
}
