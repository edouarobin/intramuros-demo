// @flow
/* eslint-disable no-undef */

declare type NormalizedAssosType = {
  entities: { assosList: { [number]: AssosType } },
  result: number[],
};

declare type AssosStoreType = {
  // Format: [idCity] : { [idAsso] : assos }
  assosList: { [number]: AssosType[] },
  // assosIDs: number[],
  // mapAssosToCities: { [number]: number[] },
  assosNotification: number[],
};

declare type AssosDisplayableType = AssosType[];
