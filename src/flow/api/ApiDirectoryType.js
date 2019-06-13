// @flow
/* eslint-disable no-undef */

declare type ApiDirectoryType = {
  title: string,
  city: number,
  id: number,
  contacts: ApiContactType[],
  created_at: string,
  order_index: number,
};

declare type ApiContactType = {
  name: string,
  description?: string,
  address_label?: string,
  email?: string,
  website?: string,
  number?: string,
  number2?: string,
  number3?: string,
  fax?: string,
  id: number,
};
