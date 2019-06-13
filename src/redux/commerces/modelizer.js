// @flow

export const modelizeCommerce = (apiCommerce: ApiCommerceType): SchoolsType => {
  return {
    id: apiCommerce.id,
    code: apiCommerce.code,
    published: apiCommerce.published,
    city: apiCommerce.city,
    name: apiCommerce.name,
    logo: apiCommerce.logo,
    cover: apiCommerce.cover,
    description: apiCommerce.description,
    email: apiCommerce.email,
    website: apiCommerce.website,
    number: apiCommerce.number,
    number2: apiCommerce.number2,
    number3: apiCommerce.number3,
    fax: apiCommerce.fax,
    schedule: apiCommerce.schedule,
    price: apiCommerce.price,
    twitter: apiCommerce.twitter,
    facebook: apiCommerce.facebook,
    address_label: apiCommerce.address_label,
    latitude: apiCommerce.latitude,
    longitude: apiCommerce.longitude,
    category_name: apiCommerce.category_name,
    category_picto: apiCommerce.category_picto,
    category_image: apiCommerce.category_image,
  };
};
