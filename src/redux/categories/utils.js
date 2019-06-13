// @flow

export const calculateDefaultCategories = (categories: CategoriesListType) => {
  const defaultCategoryIDs = [];
  // So categoryIDs are integers and not strings
  const categoryIDs = Object.keys(categories).map(item => parseInt(item, 10));
  categoryIDs.forEach(id => {
    if (categories[id] && categories[id].default) {
      defaultCategoryIDs.push(categories[id].id);
    }
  });
  return { defaultCategoryIDs, categoryIDs };
};
