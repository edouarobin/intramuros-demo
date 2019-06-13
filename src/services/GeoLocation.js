// @flow

export function requestAuthorisationPosition() {
  // $FlowFixMe
  return navigator.geolocation.requestAuthorization();
}

export const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
  });

export const distanceMaxForDisplay = 40000; // 40km max to be displayed

export const fastDistanceConverter = (
  {
    latitude: latitudeFromInDegree,
    longitude: longitudeFromInDegree,
  }: { latitude: number, longitude: number },
  {
    latitude: latitudeToInDegree,
    longitude: longitudeToInDegree,
  }: { latitude: number, longitude: number }
) => {
  /*
   * A simpler conversion based on the Pythagorean theorem
   * assuming the small angle approximation
   */
  const R = 6371e3;
  const latitudeFrom = latitudeFromInDegree * 0.0174533;
  const latitudeTo = latitudeToInDegree * 0.0174533;
  const longitudeFrom = longitudeFromInDegree * 0.0174533;
  const longitudeTo = longitudeToInDegree * 0.0174533;

  const deltaPhi = latitudeTo - latitudeFrom;
  const deltaPsi = longitudeTo - longitudeFrom;
  // Do not use Math.pow or the ** operator because it breaks either the linter or the tests
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(latitudeFrom) *
      Math.cos(latitudeTo) *
      Math.sin(deltaPsi / 2) *
      Math.sin(deltaPsi / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const getClosestCityId = (
  coord: { latitude: number, longitude: number },
  citiesList: { [number]: CityType }
): number => {
  const { id } = Object.keys(citiesList).reduce(
    (reducedValue, cityId) => {
      const city = citiesList[parseInt(cityId, 10)];
      const distanceFromCity = fastDistanceConverter(coord, city);
      if (reducedValue.distance > distanceFromCity) {
        return {
          id: cityId,
          distance: distanceFromCity,
        };
      }
      return reducedValue;
    },
    { id: null, distance: 9999999 }
  );
  return parseInt(id, 10);
};

export const getClosestCity = (
  coord: { latitude: number, longitude: number },
  citiesList: { [number]: CityType }
): number => {
  const { city } = Object.keys(citiesList).reduce(
    (reducedValue, cityId) => {
      const city = citiesList[parseInt(cityId, 10)];
      const distanceFromCity = fastDistanceConverter(coord, city);
      if (reducedValue.distance > distanceFromCity) {
        return {
          city: city,
          distance: distanceFromCity,
        };
      }
      return reducedValue;
    },
    { city: null, distance: 9999999 }
  );
  return city;
};
