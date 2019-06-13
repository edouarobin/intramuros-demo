// @flow

export const modelizeCategory = (
  apiCategory: ApiCategoryType
): CategoryType => ({
  name: apiCategory.name,
  description: apiCategory.description,
  id: apiCategory.id,
  image: apiCategory.image,
  default: apiCategory.default,
  picto: apiCategory.picto,
  themeId: apiCategory.theme_id,
  themeName: apiCategory.theme_name,
  themeOrder: apiCategory.theme_order,
  numberOfEvents: 0,
});
