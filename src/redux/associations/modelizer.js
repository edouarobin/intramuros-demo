// @flow

export const modelizeAssos = (apiAssos: ApiAssosType): AssosType => {
  return {
    id: apiAssos.id,
    code: apiAssos.code,
    published: apiAssos.published,
    city: apiAssos.city,
    name: apiAssos.name,
    logo: apiAssos.logo,
    cover: apiAssos.cover,
    description: apiAssos.description,
    email: apiAssos.email,
    website: apiAssos.website,
    number: apiAssos.number,
    number2: apiAssos.number2,
    number3: apiAssos.number3,
    fax: apiAssos.fax,
    schedule: apiAssos.schedule,
    price: apiAssos.price,
    twitter: apiAssos.twitter,
    facebook: apiAssos.facebook,
    address_label: apiAssos.address_label,
    category_name: apiAssos.category_name,
    category_picto: apiAssos.category_picto,
    category_image: apiAssos.category_image,
  };
};
