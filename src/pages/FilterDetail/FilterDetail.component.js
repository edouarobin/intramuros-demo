// @flow

import React, { PureComponent } from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Dimensions, StatusBar, Platform } from 'react-native';
import globalStyle from 'Intramuros/src/style/globalStyle';
import { findIndex } from 'lodash';
import PureItemCarousel from './PureItemCarousel';
import { size, isEqual } from 'lodash';
import { generateMappingFilterEvent } from 'Intramuros/src/services/ListsToolsDataSource';
import memoizeOne from 'memoize-one';

const screenWidth = Dimensions.get('window').width;
const generateEventFilterListMemoize = memoizeOne(
  generateMappingFilterEvent,
  isEqual
);

type PropsType = {
  navigation: NavigationPropsType<>,
  filters: CategoriesDisplayableType,
  eventsList: EventsDisplayableType,
  filterId: number,
  selectCityFromID: number => string,
  selectAggloFromID: number => string,
};

type StateType = {};

export default class FilterDetail extends PureComponent<PropsType> {
  _getIndex(id: number, filterList: CategoriesDisplayableType) {
    return findIndex(filterList, function(filter) {
      return filter.id == id;
    });
  }

  state = {};

  _renderItem = (item, index, mappingFilterEvents) => {
    if (item) {
      return (
        <PureItemCarousel
          item={item}
          index={index}
          listSize={size(this.props.filters)}
          navigation={this.props.navigation}
          eventsList={this.props.eventsList}
          _carousel={this._carousel}
          selectCityFromID={this.props.selectCityFromID}
          selectAggloFromID={this.props.selectAggloFromID}
          mappingFilterEvents={mappingFilterEvents}
        />
      );
    } else {
      return <View />;
    }
  };

  render() {
    let mappingFilterEvents = generateEventFilterListMemoize(
      this.props.eventsList
    );
    return (
      <View style={{ flex: 1, backgroundColor: globalStyle.colors.lightGrey }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.35)"
          translucent
          animated={true}
        />
        {this.props.filters ? (
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.props.filters}
            renderItem={({ item, index }) =>
              this._renderItem(item, index, mappingFilterEvents)
            }
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            firstItem={this._getIndex(this.props.filterId, this.props.filters)}
            shouldOptimizeUpdates
            showsHorizontalScrollIndicator
            //If we use flatlist the firsItem is KO if it is > than initialNumToRender
            useScrollView
            initialNumToRender={3}
            removeClippedSubviews={Platform.OS === 'ios' ? false : true}
            layout={'default'}
          />
        ) : null}
      </View>
    );
  }
}
