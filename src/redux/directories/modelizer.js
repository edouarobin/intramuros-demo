// @flow

export const modelizeDirectory = (
  apiDirectory: ApiDirectoryType
): DirectoryType => {
  const contacts = [];
  for (let i = 0; i < apiDirectory.contacts.length; i += 1) {
    contacts.push({
      name: apiDirectory.contacts[i].name,
      description: apiDirectory.contacts[i].description,
      addressLabel: apiDirectory.contacts[i].address_label,
      email: apiDirectory.contacts[i].email,
      website: apiDirectory.contacts[i].website,
      number: apiDirectory.contacts[i].number,
      number2: apiDirectory.contacts[i].number2,
      number3: apiDirectory.contacts[i].number3,
      fax: apiDirectory.contacts[i].fax,
      id: apiDirectory.contacts[i].id,
    });
  }
  return {
    title: apiDirectory.title,
    city: apiDirectory.city,
    id: apiDirectory.id,
    contacts,
    createdAt: apiDirectory.created_at,
    orderIndex: apiDirectory.order_index,
  };
};
