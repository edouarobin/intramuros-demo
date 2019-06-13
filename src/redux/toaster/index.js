// @flow

export const actionTypes = {
  SHOW: 'SHOW',
  HIDE: 'HIDE',
};

export const actionCreators = {
  show: (text: string): * => ({
    type: actionTypes.SHOW,
    payload: {
      text,
    },
  }),
  hide: (): * => ({ type: actionTypes.HIDE }),
};

const defaultState = {
  show: false,
  text: '',
};

export const reducer = (
  state: ToasterStoreType = defaultState,
  action: Object
): ToasterStoreType => {
  switch (action.type) {
    case actionTypes.SHOW:
      return {
        ...state,
        ...action.payload,
        show: true,
      };
    case actionTypes.HIDE:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

export const selectors = {
  show: (state: RootStateType) => ({ ...state.toaster }),
};
