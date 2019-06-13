// @flow

export const modelizeCity = (apiCity: ApiCityType): CityType => ({
  id: apiCity.id,
  name: apiCity.name,
  latitude: apiCity.latitude,
  longitude: apiCity.longitude,
  description: apiCity.description,
  website: apiCity.website,
  mayorName: apiCity.mayor_name,
  population: apiCity.population,
  signalProblems: apiCity.signal_problems,
  logo: apiCity.logo,
  cover: apiCity.cover,
  addressLabel: apiCity.address_label,
  agglo_id: apiCity.agglo_id,
  agglo_name: apiCity.agglo_name,
  agglo_description: apiCity.agglo_description,
  departmentNumber: apiCity.departmentNumber,
  departmentName: apiCity.departmentName,
});
