import { SORT_ORDER } from '../constants/index.js';
import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASС,
  sortBy = '_id',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactQuery = ContactCollection.find({ userId });
  const contactsCount = await ContactCollection.find({ userId })
    .merge(contactQuery)
    .countDocuments();

  const contacts = await contactQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactsById = (id, userId) => {
  return ContactCollection.findOne({ _id: id, userId });
};

export const postContact = (payload, userId) => {
  return ContactCollection.create({ ...payload, userId });
};

export const patchContact = async (id, payload, userId, options = {}) => {
  const result = await ContactCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!result || !result.value) return null;
  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

export const deleteContact = (id, userId) =>
  ContactCollection.findOneAndDelete({ _id: id, userId });
