// @flow
/* eslint-disable no-undef */

declare type DirectoryType = {
  title: string,
  city: number,
  id: number,
  contacts: ContactType[],
  createdAt: string,
  orderIndex: number,
};

declare type ContactType = {
  name: string,
  description?: string,
  addressLabel?: string,
  email?: string,
  website?: string,
  number?: string,
  number2?: string,
  number3?: string,
  fax?: string,
  id: number,
};
