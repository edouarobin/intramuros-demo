// @flow

import React, { PureComponent } from 'react';
import { Modal, Platform, Alert, StatusBar } from 'react-native';
import { isEqual } from 'lodash';
import memoize from 'memoize-one';

import { HeaderBasicTitle, FiltersFlatlist } from 'Intramuros/src/components';
import { GenerateFiltersListDataSource } from 'Intramuros/src/services/ListsToolsDataSource';

type PropsType = {
  modalVisible: boolean,
  closeModal: () => void,
  filtersList: CategoriesDisplayableType,
  selectedFilters: number[],
  filterSelector: (filter: CategoryType, isDelete: boolean) => void,
  counters: {},
};

export default class FiltersModal extends PureComponent<PropsType, StateType> {
  filterSelector = (filter: CategoryType) => {
    this.props.filterSelector(
      filter,
      this.props.selectedFilters.indexOf(filter.id) > -1 ? true : false
    );
  };

  _calculateDatasource = memoize(
    filtersList => GenerateFiltersListDataSource(filtersList),
    isEqual
  );

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={this.props.closeModal}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="#009688"
          translucent
          animated={true}
        />
        <HeaderBasicTitle
          text="Filtres"
          onCrossPress={this.props.closeModal}
          style={{ backgroundColor: '#009688' }}
          info={false}
        />
        <FiltersFlatlist
          onFilterPress={this.filterSelector}
          selectedFilters={this.props.selectedFilters}
          dataSource={this._calculateDatasource(this.props.filtersList)}
          counters={this.props.counters}
        />
      </Modal>
    );
  }
}
