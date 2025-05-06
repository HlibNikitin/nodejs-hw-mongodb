const parseType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) {
        return;
    }
    const isType = (contactType) => ['work', 'home', 'personal']
        .includes(contactType);

        if (isType(contactType)) {
            return contactType;
        }
};

  export const parseFilterParams = (query) => {
    const { contactType } = query;
    const parsedType = parseType(contactType);
    return {
        contactType: parsedType,
    };
  };