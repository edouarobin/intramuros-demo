import {
  orderBy,
  groupBy,
  reduce,
  camelCase,
  deburr,
  filter,
  indexOf,
  cloneDeep,
  forEach,
} from 'lodash';
import {
  formatDateMonth,
  formatDateYear,
  formatDateAll,
  isThisWeek,
  isThisMonth,
} from 'Intramuros/src/services/FormatDate';
import {
  isAfter,
  isToday,
  startOfMonth,
  startOfWeek,
  isBefore,
} from 'date-fns';

export const GenerateCitiesListDataSource = (
  citiesList: any,
  filterText: string
) => {
  let dataSource = citiesList ? citiesList : [];
  if (filterText) {
    const safe = String(camelCase(deburr(filterText)) || '').replace(
      /([.*^$+?!(){}\[\]\/\\])/g,
      '\\$1'
    );
    const regex = new RegExp(safe, 'i');
    dataSource = filter(dataSource, obj =>
      regex.test(camelCase(deburr(obj.name)))
    );
  }

  dataSource = orderBy(dataSource, ['departmentNumber'], ['asc']);
  dataSource = groupBy(dataSource, d => {
    return d ? d.departmentNumber + ' - ' + d.departmentName : null;
  });
  dataSource = reduce(
    dataSource,
    (acc, next, index) => {
      acc.push({
        key: index,
        data: next,
      });
      return acc;
    },
    []
  );

  return dataSource;
};

export const GenerateEventsListDataSource = (eventsList: any) => {
  console.log('GenerateEventsListDataSource');
  let dataSource = eventsList ? eventsList : [];
  let now = new Date();
  let startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 });
  let startOfCurrentMonth = startOfMonth(now);
  dataSource = orderBy(dataSource, ['startDate'], ['asc']);
  dataSource = groupBy(dataSource, d => {
    if (d) {
      if (
        isThisWeek(d.startDate) ||
        isBefore(d.startDate, startOfCurrentWeek)
      ) {
        return 'Cette semaine';
      } else if (
        isThisMonth(d.startDate) ||
        isBefore(d.startDate, startOfCurrentMonth)
      ) {
        return 'Ce mois-ci';
      } else {
        return (
          formatDateMonth(d.startDate, true) +
          ' - ' +
          formatDateYear(d.startDate)
        );
      }
    } else {
      return null;
    }
  });
  dataSource = reduce(
    dataSource,
    (acc, next, index) => {
      acc.push({
        key: index,
        title: index,
        data: next,
      });
      return acc;
    },
    []
  );

  return dataSource;
};

export const GenerateFiltersListDataSource = (filtersList: CategoryType[]) => {
  let dataSource = filtersList ? filtersList : [];
  dataSource = orderBy(dataSource, ['themeOrder'], ['asc']);
  dataSource = groupBy(dataSource, d => {
    return d ? d.themeName : null;
  });
  dataSource = reduce(
    dataSource,
    (acc, next, index) => {
      acc.push({
        key: index,
        data: next,
      });
      return acc;
    },
    []
  );
  // console.log(dataSource);
  return dataSource;
};

export const GenerateItemListDataSource = (
  itemsList: any,
  filterText: string,
  favoriteItems: number[]
) => {
  console.log('GenerateItemListDataSource');
  let dataSource = itemsList ? itemsList : [];
  if (filterText) {
    const safe = String(camelCase(deburr(filterText)) || '').replace(
      /([.*^$+?!(){}\[\]\/\\])/g,
      '\\$1'
    );
    const regex = new RegExp(safe, 'i');
    dataSource = filter(dataSource, obj =>
      regex.test(camelCase(deburr(obj.name + obj.cityName)))
    ); //On recherche sur le nom et la commune
  } else {
    dataSource = filter(
      dataSource,
      item => indexOf(favoriteItems, item.id) == -1
    ); //On n'affiche pas les écoles favorites dans la liste des écoles.(doublon)
  }
  dataSource = orderBy(dataSource, ['distanceToSelectedCity'], ['asc']); //tri des sections par distance entre commune
  dataSource = groupBy(dataSource, d => {
    return d ? d.cityName + d.distanceDisplay : null;
  });
  dataSource = reduce(
    dataSource,
    (acc, next, index) => {
      acc.push({
        key: index,
        data: next,
      });
      return acc;
    },
    []
  );

  return dataSource;
};

export const GenerateFavoriteItemListDataSource = (
  itemsList: any,
  favoriteItems: number[]
) => {
  console.log('GenerateFavoriteItemListDataSource');
  let dataSource = itemsList ? itemsList : [];
  dataSource = filter(dataSource, item => indexOf(favoriteItems, item.id) > -1);
  dataSource = orderBy(
    dataSource,
    ['distanceToSelectedCity', 'name'],
    ['asc', 'asc']
  );
  return dataSource;
};

export const GenerateMenuLinkListDataSource = (menusList: any) => {
  console.log('GenerateMenuLinkListDataSource');
  let dataSource = menusList ? menusList : [];
  dataSource = orderBy(dataSource, ['updated_at'], ['desc']); //Affichage des plus récents en premier.
  return dataSource;
};

export const generateMappingFilterEvent = eventsList => {
  let filterEventTab = {};
  console.log('generate mapping events and filters');
  forEach(eventsList, event => {
    if (event.category) {
      let category = event.category;
      if (!filterEventTab[category]) {
        let newArray = [];
        newArray.push(event);
        filterEventTab[category] = newArray;
      } else {
        let newArray = [];
        newArray = filterEventTab[category];
        newArray.push(event);
        filterEventTab[category] = newArray;
      }
    }
  });

  return filterEventTab;
};

export const GenerateAssosListDataSource = (
  assosList: any,
  filterText: string
) => {
  console.log('GenerateAssosListDataSource');
  let dataSource = assosList ? assosList : [];
  if (filterText) {
    const safe = String(camelCase(deburr(filterText)) || '').replace(
      /([.*^$+?!(){}\[\]\/\\])/g,
      '\\$1'
    );
    const regex = new RegExp(safe, 'i');
    dataSource = filter(dataSource, obj =>
      regex.test(camelCase(deburr(obj.name + obj.category_name)))
    ); //On recherche sur le nom et la catégorie d'association
  }
  dataSource = orderBy(dataSource, ['category_name'], ['asc']); //tri sections par name
  dataSource = groupBy(dataSource, d => {
    return d ? d.category_name : null;
  });
  dataSource = reduce(
    dataSource,
    (acc, next, index) => {
      acc.push({
        key: index,
        data: next,
      });
      return acc;
    },
    []
  );

  return dataSource;
};
