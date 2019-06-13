// @flow

export const modelizePointOfInterest = (
  apiPointOfInterest: ApiPointOfInterestType
): PointOfInterestType => {
  const images = [apiPointOfInterest.image1];
  for (let i = 2; i < 11; i += 1) {
    if (apiPointOfInterest[`image${i}`]) {
      images.push(apiPointOfInterest[`image${i}`]);
    }
  }
  return {
    title: apiPointOfInterest.title,
    description: apiPointOfInterest.description,
    category: apiPointOfInterest.category,
    createdAt: apiPointOfInterest.created_at,
    updatedAt: apiPointOfInterest.updated_at,
    city: parseInt(apiPointOfInterest.city, 10),
    images,
    addressLabel: apiPointOfInterest.address_label,
    latitude: apiPointOfInterest.latitude,
    longitude: apiPointOfInterest.longitude,
    id: apiPointOfInterest.id,
    url1: apiPointOfInterest.url1,
    url2: apiPointOfInterest.url2,
    url3: apiPointOfInterest.url3,
    schedule: apiPointOfInterest.schedule,
    price: apiPointOfInterest.price,
    croppedData: apiPointOfInterest.croppedData,
  };
};
