import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import HTMLView from 'react-native-htmlview';
import { formattingTextToHTML } from 'Intramuros/src/utils/renderingTools';

type PropsType = {
  value: string,
  styleContainer?: any,
};

class HTMLText extends PureComponent<PropsType> {
  render() {
    const text = formattingTextToHTML(this.props.value);
    if (!text) return null;

    return (
      <View style={this.props.styleContainer}>
        <HTMLView
          textComponentProps={{ selectable: true }}
          nodeComponentProps={{ selectable: true }}
          value={text}
          stylesheet={{ div: this.props.style }}
        />
      </View>
    );
  }
}

HTMLText.propTypes = {
  value: PropTypes.string,
  style: PropTypes.object,
};

export default HTMLText;
