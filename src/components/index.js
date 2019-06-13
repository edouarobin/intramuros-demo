// @flow
/* eslint-disable global-require */

/**
 * This syntax prevents circular import,
 * prevents some breaks in hot reaload
 * and optimizes the number of files imported
 */

module.exports = {
  get Toaster() {
    return require('./Toaster').default;
  },
  get CitiesModal() {
    return require('./CitiesModal').default;
  },
  get FiltersModal() {
    return require('./FiltersModal').default;
  },
  get SettingsModal() {
    return require('./SettingsModal').default;
  },
  get CityInfoModal() {
    return require('./CityInfoModal').default;
  },
  get CitySelectorButton() {
    return require('./CitySelectorButton/CitySelectorButton.container').default;
  },
  get CitiesFlatlist() {
    return require('./CitiesFlatlist').default;
  },
  get SchoolsFlatlist() {
    return require('./SchoolsFlatlist').default;
  },
  get CommercesFlatlist() {
    return require('./CommercesFlatlist').default;
  },
  get AssosFlatlist() {
    return require('./AssosFlatlist').default;
  },
  get FiltersFlatlist() {
    return require('./FiltersFlatlist').default;
  },
  get Header() {
    return require('./Header').default;
  },
  get Page() {
    return require('./Page').default;
  },
  get AddressLabel() {
    return require('./atoms/AddressLabel').default;
  },
  get TabBarIcon() {
    return require('./atoms/TabBarIcon').default;
  },
  get ContactNumber() {
    return require('./atoms/ContactNumber').default;
  },
  get ContactMap() {
    return require('./atoms/ContactMap').default;
  },
  get ContactEmail() {
    return require('./atoms/ContactEmail').default;
  },
  get ContactWeb() {
    return require('./atoms/ContactWeb').default;
  },
  get ContactFax() {
    return require('./atoms/ContactFax').default;
  },
  get Schedule() {
    return require('./atoms/Schedule').default;
  },
  get Price() {
    return require('./atoms/Price').default;
  },
  get AroundMeButton() {
    return require('./atoms/AroundMeButton').default;
  },
  get FilterInput() {
    return require('./atoms/FilterInput').default;
  },
  get LineButton() {
    return require('./atoms/LineButton').default;
  },
  get AssosLineButton() {
    return require('./atoms/AssosLineButton').default;
  },
  get LineFilterButton() {
    return require('./atoms/LineFilterButton').default;
  },
  get Separator() {
    return require('./atoms/Separator').default;
  },
  get EventCategory() {
    return require('./atoms/EventCategory').default;
  },
  get HeaderLogoLeft() {
    return require('./atoms/HeaderLogoLeft').default;
  },
  get Subtitle() {
    return require('./atoms/Subtitle').default;
  },
  get Title() {
    return require('./atoms/Title').default;
  },
  get HeaderBasicTitle() {
    return require('./atoms/HeaderBasicTitle').default;
  },
  get HeaderFilterTitle() {
    return require('./atoms/HeaderFilterTitle').default;
  },
  get HeaderCustom() {
    return require('./atoms/HeaderCustom').default;
  },
  get Loader() {
    return require('./atoms/Loader').default;
  },
  get MessageLabel() {
    return require('./atoms/MessageLabel').default;
  },
  get CalendarDate() {
    return require('./atoms/CalendarDate').default;
  },
  get ImageZoomModal() {
    return require('./atoms/ImageZoomModal').default;
  },
  get GoBackButtonWithGradient() {
    return require('./atoms/GoBackButtonWithGradient').default;
  },
  get EventDetailHeader() {
    return require('./atoms/EventDetailHeader').default;
  },
  get GoBackButton() {
    return require('./atoms/GoBackButton').default;
  },
  get GoBackButtonWithTitleBlock() {
    return require('./atoms/GoBackButtonWithTitleBlock').default;
  },
  get CloseCrossButton() {
    return require('./atoms/CloseCrossButton').default;
  },
  get YellowLabelDistance() {
    return require('./atoms/YellowLabelDistance').default;
  },
  get ServiceTab() {
    return require('./atoms/ServiceTab').default;
  },
  get CardText() {
    return require('./molecules/CardText').default;
  },
  get CardIntercoText() {
    return require('./molecules/CardIntercoText').default;
  },
  get TabContainer() {
    return require('./molecules/TabContainer').default;
  },
  get DirectoryCard() {
    return require('./molecules/DirectoryCard').default;
  },
  get SurveyCard() {
    return require('./molecules/SurveyCard').default;
  },
  get CityInfoBlock() {
    return require('./molecules/CityInfoBlock').default;
  },
  get ContactCard() {
    return require('./molecules/ContactCard').default;
  },
  get TopImageCard() {
    return require('./organisms/TopImageCard').default;
  },
  get LeftImageCard() {
    return require('./organisms/LeftImageCard').default;
  },
  get LeftImageCardEventList() {
    return require('./organisms/LeftImageCardEventList').default;
  },
  get SchoolCard() {
    return require('./organisms/SchoolCard').default;
  },
  get CommerceCard() {
    return require('./organisms/CommerceCard').default;
  },
  get LeftImageBoostEventCard() {
    return require('./organisms/LeftImageBoostEventCard').default;
  },
  get FilterCard() {
    return require('./organisms/FilterCard').default;
  },
  get OtherFilterCard() {
    return require('./organisms/OtherFilterCard').default;
  },
  get OrganizerCard() {
    return require('./organisms/OrganizerCard').default;
  },
  get MyFastImage() {
    return require('./atoms/MyFastImage').default;
  },
};
