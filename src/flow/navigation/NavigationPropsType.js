// @flow
/* eslint-disable no-undef */

declare type NavigationPropsType<ParamsType> = {
  navigate: (string, ?Object) => void,
  dispatch: (action: *) => void,
  goBack: (?string) => void,
  state: {
    key: string,
    params: ParamsType,
  },
};
