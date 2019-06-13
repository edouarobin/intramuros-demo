// @flow

export const modelizeSchool = (apiSchool: ApiSchoolType): SchoolsType => {
  return {
    name: apiSchool.name,
    city: apiSchool.city,
    id: apiSchool.id,
    addressLabel: apiSchool.address_label,
    latitude: apiSchool.latitude,
    longitude: apiSchool.longitude,
    image: apiSchool.image,
  };
};
