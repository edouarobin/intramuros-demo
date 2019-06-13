// @flow

import React, { PureComponent } from 'react';
import { FlatList, View, StyleSheet, Platform } from 'react-native';
import globalStyle from 'Intramuros/src/style/globalStyle';
import memoizeOne from 'memoize-one';
import {
  getFiltersCounterFromEvents,
  calculateMyFilters,
} from 'Intramuros/src/services/ComputeFilters';
import {
  EventCategory,
  LeftImageBoostEventCard,
  FilterCard,
  OtherFilterCard,
  ServiceTab,
  FiltersModal,
} from 'Intramuros/src/components';
import { size, isEqual } from 'lodash';
import { logSubscribeEventFilter } from './../../../redux/utils';

type PropsType = {
  navigateOnPress: EventType => void,
  allEventsFiltered: any,
  currentFilters: CategoriesDisplayableType,
  selectedFilters: number[],
  selectCityFromID: number => string,
  navigation: any,
  filtersList: CategoriesDisplayableType,
  selectFilter: (id: number, isDelete: boolean) => void,
  selectTab: string => void,
  selectedTab: string,
};

type StateType = {
  filerModalVisible: boolean,
};

const TAB_HEADER_HEIGHT = 35 + 15;
const getCountersMemoization = memoizeOne(getFiltersCounterFromEvents, isEqual);
const getMyFiltersMemoization = memoizeOne(calculateMyFilters, isEqual);

const eventKeyExtractor = (item): string => `${item.id}`;
const filterKeyExtractor = (item): string => `${item.id}`;

export default class HeaderEventList extends PureComponent<
  PropsType,
  StateType
> {
  state = {
    filerModalVisible: false,
  };

  filterSelector = (filter: CategoryType, isDelete: boolean) => {
    this.props.selectFilter(filter.id, isDelete);
    logSubscribeEventFilter(filter.id, filter.name, isDelete);
  };

  render() {
    let myCounters = getCountersMemoization(this.props.allEventsFiltered.all);
    let myFilters = getMyFiltersMemoization(
      this.props.currentFilters,
      myCounters
    );
    let boostEventsDataSource = this.props.allEventsFiltered.boostEvents;

    return (
      <View
        style={{
          backgroundColor: globalStyle.colors.greyMegaLight,
          zIndex: 999,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginBottom: 5,
        }}
      >
        <FlatList
          style={{
            paddingHorizontal: 16,
          }}
          ref={ref => {
            this.filtersScrollList = ref;
          }}
          data={myFilters}
          keyExtractor={filterKeyExtractor}
          horizontal
          renderItem={({ item }) => (
            <FilterCard
              id={item.id}
              title={item.name}
              picto={item.picto}
              counter={item.counter}
              onPress={() => {
                /* 1. Navigate to the FilterDetail route with params */
                this.props.navigation.navigate('FilterDetail', {
                  filterId: item.id,
                  filters: myFilters,
                });
              }}
            />
          )}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={
            this.props.selectedFilters.length > 0 ? (
              <OtherFilterCard
                title={'AUTRES FILTRES'}
                onPress={() => this.setState({ filerModalVisible: true })}
              />
            ) : null
          }
          ListEmptyComponent={
            this.props.selectedFilters.length < 1 ? (
              <OtherFilterCard
                title={'FILTRES'}
                onPress={() => this.setState({ filerModalVisible: true })}
              />
            ) : null
          }
        />
        {size(boostEventsDataSource) > 0 ? (
          <View>
            <EventCategory
              style={{
                marginTop: 15,
                fontFamily: 'Lato-Bold',
                fontSize: 14,
                color: '#000',
              }}
            >
              {'À la une'}
            </EventCategory>

            <FlatList
              style={{
                paddingHorizontal: 16,
              }}
              data={boostEventsDataSource}
              keyExtractor={eventKeyExtractor}
              ref={ref => {
                this.scrollListHorizontal = ref;
              }}
              horizontal
              renderItem={({ item }) => (
                <LeftImageBoostEventCard
                  title={item.title}
                  subtitle={
                    item.city ? this.props.selectCityFromID(item.city) : null
                  }
                  subtitle2={
                    item.agglo > 0
                      ? null
                      : item.displayedDistanceToPositionOrCity
                  }
                  image={item.image}
                  onPress={() => this.props.navigateOnPress(item)}
                  isAgglo={item.agglo > 0}
                />
              )}
              showsHorizontalScrollIndicator={false}
              removeClippedSubviews={Platform.OS === 'ios' ? false : true}
              ListFooterComponent={<View style={{ marginRight: 30 }} />}
            />
          </View>
        ) : null}
        <View style={styles.tabContainer}>
          <ServiceTab
            tabName="Ma commune"
            isSelected={this.props.selectedTab === 'Ma commune'}
            selectTab={this.props.selectTab}
          />
          <ServiceTab
            tabName="Aux alentours"
            isSelected={this.props.selectedTab === 'Aux alentours'}
            selectTab={this.props.selectTab}
          />
        </View>
        <FiltersModal
          modalVisible={this.state.filerModalVisible}
          closeModal={() => {
            this.setState({ filerModalVisible: false });
          }}
          filtersList={this.props.filtersList}
          filterSelector={this.filterSelector}
          selectedFilters={this.props.selectedFilters}
          counters={myCounters}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: TAB_HEADER_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: globalStyle.colors.greyMegaLight,
    paddingTop: 5,
  },
});
