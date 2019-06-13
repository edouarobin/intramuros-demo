import React, { PureComponent } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Button,
  SectionList,
} from 'react-native';
import { LeftImageCardEventList, MyFastImage } from 'Intramuros/src/components';
import globalStyle, {
  STATUS_BAR_HEIGHT,
  heightCard,
  NUM_EVENT_THRESHOLD,
  SECTION_EVENT_HEIGHT,
  NUMBER_OF_LINES,
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { slice, size, isEqual, filter, cloneDeep } from 'lodash';
import { logEvent } from './../../redux/utils';
import { GenerateEventsListDataSource } from 'Intramuros/src/services/ListsToolsDataSource';
import memoizeOne from 'memoize-one';
import SectionHeader from '../EventList/components/SectionHeader';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

type PropsType = {
  item: any,
  index: number,
  listSize: number,
  navigation: any,
  eventsList: any,
  _carousel: any,
  selectCityFromID: number => string,
  selectAggloFromID: number => string,
  mappingFilterEvents: any,
};

type StateType = {
  numOfLines: number,
};

const screenHeight = Dimensions.get('window').height;
const headerHeight = screenHeight * 0.2;
const eventKeyExtractor = (item): string => `${item.id}`;
const computeEventsDatasourceMemoization = memoizeOne(
  GenerateEventsListDataSource,
  isEqual
);

export default class PureItemCarousel extends PureComponent<
  PropsType,
  StateType
> {
  constructor(props) {
    super(props);

    this.getItemLayout = sectionListGetItemLayout({
      // The height of the row with rowData at the given sectionIndex and rowIndex
      getItemHeight: (rowData, sectionIndex, rowIndex) => heightCard + 12,

      // These four properties are optional
      getSeparatorHeight: () => 0, // The height of your separators
      getSectionHeaderHeight: () => SECTION_EVENT_HEIGHT, // The height of your section headers
      getSectionFooterHeight: () => 50, // The height of your section footers
      listHeaderHeight: headerHeight, // The height of your list header. Attention: on dirait qu'il faut que ça soit plus grand que la valeur réelle ?!
    });
  }

  state = {
    numOfLines: NUMBER_OF_LINES,
  };

  navigateOnPress = (item: EventType) => {
    let eventID = item.id;
    this.props.navigation.navigate('EventDetail', { eventID });

    let eventTitle = item.title;
    if (item.agglo) {
      let aggloId = item.agglo;
      let aggloName = this.props.selectAggloFromID(item.agglo);
      logEvent(eventID, eventTitle, aggloName, aggloId, true);
    } else {
      let cityId = item.city;
      let cityName = this.props.selectCityFromID(cityId);
      logEvent(eventID, eventTitle, cityName, cityId, false);
    }
  };

  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          zIndex: 0,
          paddingLeft: 9 + BIG_SCREEN_PADDING_OFFSET,
          paddingRight: 16 + BIG_SCREEN_PADDING_OFFSET,
        }}
      >
        <LeftImageCardEventList
          title={item.title}
          subtitle={item.city ? this.props.selectCityFromID(item.city) : null}
          subtitle2={
            item.agglo > 0 ? null : item.displayedDistanceToPositionOrCity
          }
          image={item.image}
          onPress={this.navigateOnPress}
          startDate={item.startDate}
          endDate={item.endDate}
          isAgglo={item.agglo > 0}
          item={item}
        />
      </View>
    );
  };

  _renderSectionHeader = ({ section }) => {
    if (section) {
      return <SectionHeader sectionName={section.key} />;
    } else {
      return <View />;
    }
  };

  render() {
    const {
      listSize,
      navigation,
      index,
      item,
      eventsList,
      _carousel,
      selectCityFromID,
      mappingFilterEvents,
    } = this.props;
    let eventsListFiltered = mappingFilterEvents[item.id];
    let numberOfEvents = size(eventsListFiltered);

    let dataSource = computeEventsDatasourceMemoization(
      slice(eventsListFiltered, 0, this.state.numOfLines)
    );

    let isLast = listSize - 1 == index;
    let isFirst = index == 0;

    let styleLeft = isFirst ? { display: 'none' } : null;
    let styleRight = isLast ? { display: 'none' } : null;

    return (
      <View style={{ backgroundColor: '#EEEEF9', flex: 1 }}>
        <View style={styles.container}>
          <MyFastImage
            style={styles.image}
            source={{
              uri: item.image,
              priority: 'normal',
            }}
            resizeMode={'cover'}
          />
          <View style={styles.headerContainer}>
            <View style={styles.closeContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="md-close" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={isFirst}
                onPress={() => {
                  _carousel.snapToPrev();
                }}
              >
                <View
                  style={{
                    width: 50,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}
                >
                  <FontAwesome
                    style={[styles.icon, styleLeft]}
                    name="angle-left"
                    size={36}
                  />
                </View>
              </TouchableOpacity>

              <View>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'Lato-Regular',
                    fontSize: 24,
                  }}
                >
                  {item.name}
                </Text>
              </View>
              <TouchableOpacity
                disabled={isLast}
                onPress={() => {
                  _carousel.snapToNext();
                }}
              >
                <View
                  style={{
                    width: 50,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <FontAwesome
                    style={[styles.icon, styleRight]}
                    name="angle-right"
                    size={36}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <SectionList
          style={{
            flex: 1,
          }}
          sections={dataSource}
          keyExtractor={eventKeyExtractor}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          getItemLayout={this.getItemLayout}
          initialNumToRender={10}
          onEndReached={({ distanceFromEnd }) => {
            if (numberOfEvents > this.state.numOfLines) {
              console.log('augmentation du numOfLines');
              this.setState({
                numOfLines: this.state.numOfLines + NUMBER_OF_LINES,
              });
            }
          }}
          onEndReachedThreshold={0.5}
          stickySectionHeadersEnabled={true}
          ListEmptyComponent={() => {
            return (
              <Text
                style={{
                  marginTop: 16,
                  marginBottom: 16,
                  height: 20,
                  fontSize: 14,
                  fontFamily: 'Lato-Regular',
                  color: globalStyle.colors.darkerGrey,
                  textAlign: 'center',
                }}
              >
                {'Aucun événement pour le moment ...'}
              </Text>
            );
          }}
          ListFooterComponent={() => {
            return <View style={{ height: 50 }} />;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 3,
  },
  image: {
    height: headerHeight,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },
  headerContainer: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    height: headerHeight,
    paddingHorizontal: 24,
    paddingTop: 8 + STATUS_BAR_HEIGHT,
    zIndex: 2,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: headerHeight * 0.07,
  },
  icon: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
  },
  closeContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  closeButton: {
    width: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
