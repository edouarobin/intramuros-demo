// @flow

import { StyleSheet } from 'react-native';

import globalStyle, {
  BIG_SCREEN_PADDING_OFFSET,
} from 'Intramuros/src/style/globalStyle';

export default StyleSheet.create({
  form: {
    padding: 16,
    paddingHorizontal: 16 + BIG_SCREEN_PADDING_OFFSET,
    backgroundColor: globalStyle.colors.lightGrey,
  },
  inputLabel: {
    fontFamily: 'Lato-Regular',
    color: globalStyle.colors.darkerGrey,
    fontSize: 13,
    marginBottom: 5,
  },
  imageInput: {
    borderColor: globalStyle.colors.greyish,
    backgroundColor: globalStyle.colors.white,
    borderRadius: 2,
    borderWidth: 1,
    flexDirection: 'row',
    height: 80,
    padding: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    width: 65,
    height: 65,
    borderColor: globalStyle.colors.greyish,
    backgroundColor: globalStyle.colors.lightGrey,
    borderRadius: 2,
    borderWidth: 0.5,
    marginRight: 8,
  },
  image: {
    height: 65,
    width: '100%',
    resizeMode: 'cover',
  },
  imageText: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    color: globalStyle.colors.darkerGrey,
  },
  submitButton: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: globalStyle.colors.mainBlue,
    borderColor: globalStyle.colors.mainBlue,
    borderWidth: 1,
    borderRadius: 2,
    width: 130,
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 0.5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 5,
  },
  submitText: {
    fontFamily: 'Lato-Bold',
    color: globalStyle.colors.white,
    //fontWeight: '600',
  },
  messageIfNoInfo: {
    fontFamily: 'Lato-Regular',
    alignSelf: 'center',
    fontSize: 14,
    lineHeight: 24,
    color: globalStyle.colors.greyishBrown,
    marginTop: 20,
    height: 50,
  },
  linkStyle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: globalStyle.colors.mainBlue,
    lineHeight: 20,
  },
});

export const formStyles = {
  fieldText: {
    minHeight: 36,
    maxHeight: 96,
    padding: 6,
    paddingLeft: 15,
    borderColor: globalStyle.colors.greyish,
    backgroundColor: globalStyle.colors.lightGrey,
    borderRadius: 2,
    borderWidth: 1,
    color: globalStyle.colors.black,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    marginBottom: 16,
  },
};
