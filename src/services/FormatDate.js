// @flow

import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import { isSameWeek, isSameMonth } from 'date-fns';
import { toUpper, upperFirst } from 'lodash';

// Date will look like this: Ven. 18/11
export const formatDateVeryShort = (date: string) => {
  const formatedDate = format(date, 'ddd DD/MM', { locale: frLocale });
  //const dateWithoutDot = formatedDate.substring(0, formatedDate.length - 1);
  return upperFirst(formatedDate);
};

// Date will look like this: Vendredi 18 novembre
export const formatDateLong = (date: string, capitalFirstLetter: boolean) => {
  const formatedDate = format(date, 'dddd D MMMM', { locale: frLocale });
  return capitalFirstLetter ? upperFirst(formatedDate) : formatedDate;
};

// Date will look like this: Vendredi 18 nov.
export const formatDateShort = (date: string) => {
  const formatedDate = format(date, 'dddd D MMM', { locale: frLocale });
  return upperFirst(formatedDate);
};

// Date will look like this: 18 novembre
export const formatDateWOweekday = (date: string) => {
  return format(date, 'D MMMM', { locale: frLocale });
};

//Only day
export const formatDateDay = (date: string) => {
  const formatedDate = format(date, 'dddd', { locale: frLocale });
  return upperFirst(formatedDate);
};

//Only number
export const formatDateDayNumber = (date: string) => {
  const formatedDate = format(date, 'D', { locale: frLocale });
  return formatedDate;
};

//Only month
export const formatDateMonth = (date: string, capitalize?: boolean) => {
  const formatedDate = format(date, 'MMMM', { locale: frLocale });
  if (capitalize) {
    return upperFirst(formatedDate);
  }
  return formatedDate;
};

//Only year
export const formatDateYear = (date: string) => {
  const formatedDate = format(date, 'YYYY', { locale: frLocale });
  return formatedDate;
};

export const startDateCalendarFormat = (date: string) => {
  const formatedDate = format(date, 'YYYY-MM-DDTHH:mm:ss.SSS');
  return formatedDate;
};

export const formatDate3 = date => {
  const formatedDate = format(date, 'ddd D MMM', { locale: frLocale });
  return formatedDate;
};

export const formatDateAll = date => {
  const formatedDate = format(date, 'dddd D MMMM YYYY', { locale: frLocale });
  return formatedDate;
};

export const onlyDayShort = (date: string, capitalize?: boolean) => {
  const formatedDate = format(date, 'ddd', { locale: frLocale });
  if (capitalize) {
    return toUpper(formatedDate);
  }
  return formatedDate;
};

export const numberOfDate = (date: string) => {
  return format(date, 'D', { locale: frLocale });
};

export const isThisWeek = date => {
  if (date) {
    return isSameWeek(date, new Date(), { weekStartsOn: 1 });
  }
  return false;
};

export const calculateEndDateLabel = (date: string) => {
  if (date) {
    return "Jusqu'au " + format(date, 'D MMMM', { locale: frLocale });
  }
  return null;
};

export const isThisMonth = date => {
  if (date) {
    return isSameMonth(date, new Date());
  }
  return false;
};
